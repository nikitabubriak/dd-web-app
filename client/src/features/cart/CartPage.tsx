import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { addItemToCartAsync, removeItemFromCartAsync } from "./cartSlice";

export default function CartPage() {
    const dispatch = useAppDispatch();
    const { cart, status } = useAppSelector(state => state.cart);

    const total = cart?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;

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
                                        <img src={item.image} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                        <span>{item.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton
                                        loading={status === 'pendingRemoveItem' + item.productId + 'remove'}
                                        onClick={() => dispatch(removeItemFromCartAsync({
                                            productId: item.productId, name: 'remove'
                                        }))} color="error">
                                        <Remove />
                                    </LoadingButton>
                                    {item.quantity}
                                    <LoadingButton
                                        loading={status === 'pendingAddItem' + item.productId}
                                        onClick={() => dispatch(addItemToCartAsync({
                                            productId: item.productId
                                        }))} color="primary">
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton
                                        loading={status === 'pendingRemoveItem' + item.productId + 'delete'}
                                        onClick={() => dispatch(removeItemFromCartAsync({
                                            productId: item.productId, quantity: item.quantity, name: 'delete'
                                        }))} color="error">
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