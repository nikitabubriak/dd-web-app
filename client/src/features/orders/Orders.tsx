import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { router } from "../../app/router/Routes";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { fetchOrdersAsync, orderSelectors } from "./orderSlice";

export default function Orders() {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(orderSelectors.selectAll);
    const { ordersLoaded } = useAppSelector(state => state.orders);

    useEffect(() => {
        if (!ordersLoaded) dispatch(fetchOrdersAsync());
    }, [dispatch, ordersLoaded])

    if (!ordersLoaded) return <LoadingComponent message="Loading orders..." />

    return (
        <>
            <Typography component="h1" variant="h4" align="center" gutterBottom>
                My orders
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                    <TableHead>
                        <TableRow>
                            <TableCell>Order Number</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">Order Date</TableCell>
                            <TableCell align="right">Order Status</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {orders?.map((order) => (
                            <TableRow
                                key={order.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {order.id}
                                </TableCell>
                                <TableCell align="right">{currencyFormat(order.total)}</TableCell>
                                <TableCell align="right">{order.orderDate.split('T')[0]}</TableCell>
                                <TableCell align="right">{order.orderStatus}</TableCell>
                                <TableCell align="right">
                                    <Button variant='contained'
                                        onClick={() => router.navigate(`/orders/${order.id}`)}>
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </>
    )
}
