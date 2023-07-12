import { Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useForm } from "react-hook-form";
import ReactHookFormSelect from "../../components/ReactHookFormSelect";
import CartTable from "../cart/CartTable";
import { useState } from "react";
import agent from "../../app/api/agent";
import { resetCart } from "../cart/cartSlice";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { unloadOrders } from "./orderSlice";

interface IFormInput {
    paymentMethod: string;
}

const defaultValues = {
    paymentMethod: ""
};

const options = [
    {
        label: "PayPal",
        value: "1",
    },
    {
        label: "Visa",
        value: "2",
    },
    {
        label: "MasterCard",
        value: "3",
    },
];

export default function CheckoutPage() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.account);
    const { cart } = useAppSelector(state => state.cart);

    //TODO redux
    const [loading, setLoading] = useState(false);

    const { handleSubmit, control } = useForm<IFormInput>({ defaultValues: defaultValues });

    const [orderNumber, setOrderNumber] = useState(0);
    if (!cart && orderNumber === 0) return <Typography variant="h4">Your cart is currently empty</Typography>

    async function onSubmit(data: IFormInput) {
        setLoading(true);
        try {
            const paymentMethod = parseInt(data.paymentMethod) || 0;
            const orderNumber = await agent.Orders.create(paymentMethod);
            setOrderNumber(orderNumber);
            dispatch(unloadOrders());
            dispatch(resetCart());
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
                Checkout
            </Typography>

            {(orderNumber !== 0) ?
                <Box p={4}>

                    <Typography variant="h5" gutterBottom>
                        <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                        Thank you for your order!
                    </Typography>
                    <Typography variant="subtitle1">
                        Your order ID is #{orderNumber}. We have sent your ordered items to {user?.email}.
                    </Typography>
                </Box> :
                <>
                    <Typography variant="h6" gutterBottom>
                        Order summary
                    </Typography>

                    {cart &&
                        <CartTable items={cart.items} isCart={false} />}

                    <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                Payment details
                            </Typography>
                            <ReactHookFormSelect
                                control={control}
                                name="paymentMethod"
                                label="Payment method"
                                options={options}
                                helperText="Please select your payment method"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                Delivery
                            </Typography>
                            <Grid container>
                                <Grid item sm={12} md={6}>
                                    <Typography gutterBottom>Sending email with the products to: </Typography>
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <Typography gutterBottom>{user?.email}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <LoadingButton variant="contained" size="large" sx={{ mt: 2 }}
                        loading={loading}
                        onClick={handleSubmit(onSubmit)}>
                        Place order
                    </LoadingButton>
                </>}
        </Paper>
    );
}