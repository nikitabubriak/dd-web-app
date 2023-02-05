import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/util";

export default function CartPage() {
    const { cart, setCart, removeItem } = useStoreContext();
    const [status, setStatus] = useState({
        loading: false,
        name: ""
    });

    const total = cart?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;

    function AddItemToCart(productId: number, name: string) {
        setStatus({ loading: true, name });
        agent.Cart.addItem(productId)
            .then(cart => setCart(cart))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: "" }));
    }

    function RemoveItemFromCart(productId: number, name: string, quantity = 1) {
        setStatus({ loading: true, name });
        agent.Cart.removeItem(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: "" }));
    }

    if (!cart) return <Typography variant="h4">Your cart is currently empty</Typography>

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.items.map(item => (
                            <TableRow key={item.productId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <Box display='flex' alignItems='center'>
                                        <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                        <span>{item.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton
                                        loading={status.loading && status.name === 'remove' + item.productId}
                                        onClick={() => RemoveItemFromCart(item.productId, 'remove' + item.productId, 1)} color="error">
                                        <Remove />
                                    </LoadingButton>
                                    {item.quantity}
                                    <LoadingButton
                                        loading={status.loading && status.name === 'add' + item.productId}
                                        onClick={() => AddItemToCart(item.productId, 'add' + item.productId)} color="primary">
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton
                                        loading={status.loading && status.name === 'delete' + item.productId}
                                        onClick={() => RemoveItemFromCart(item.productId, 'delete' + item.productId, item.quantity)} color='error'>
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell align="right" colSpan={2} sx={{ fontWeight: 'bold' }}>Total</TableCell>
                            <TableCell align="right" colSpan={2} sx={{ fontWeight: 'bold' }}>{currencyFormat(total)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button fullWidth variant="contained" size="large" component={Link} to='/checkout'>Checkout</Button>
        </>
    )
}