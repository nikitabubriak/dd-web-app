import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import CartTable from "./CartTable";

export default function CartPage() {
    const { cart } = useAppSelector(state => state.cart);

    if (!cart) return <Typography variant="h4">Your cart is currently empty</Typography>

    return (
        <>
            <CartTable items={cart.items} />
            <Button fullWidth variant="contained" size="large" component={Link} to='/checkout'>Checkout</Button>
        </>
    )
}