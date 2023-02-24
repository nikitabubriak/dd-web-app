import { Box, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { CartItem } from "../../app/models/cart";
import { router } from "../../app/router/Routes";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import CartTable from "../cart/CartTable";
import { fetchOrderAsync, orderSelectors } from "./orderSlice";

export default function OrderDetails() {
    const { id } = useParams<{ id: string }>();

    const dispatch = useAppDispatch();
    const order = useAppSelector(state => orderSelectors.selectById(state, id!));
    const { status: orderLoadStatus } = useAppSelector(state => state.orders);

    useEffect(() => {
        if (!order) dispatch(fetchOrderAsync(parseInt(id!)));
    }, [dispatch, order, id])

    if (orderLoadStatus.includes('pending')) return <LoadingComponent message='Loading product...' />
    if (!order) return <NotFound />

    return (
        <>
            <Box display='flex' justifyContent='space-between'>

                <Typography gutterBottom variant='h4' sx={{ p: 2 }}>
                    Order #{order.id} - {order.orderStatus}
                </Typography>

                <Button size='large' variant='contained' sx={{ m: 2 }}
                    onClick={() => router.navigate('/orders')}
                >
                    Back to orders
                </Button>

            </Box>

            <CartTable items={order.orderItems as CartItem[]} isCart={false} />
        </>
    )
}