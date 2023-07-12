import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { CartItem } from "../../app/models/cart";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { removeItemFromCartAsync, addItemToCartAsync } from "./cartSlice";

interface Props {
    items: CartItem[];
    isCart?: boolean;
}

export default function CartTable({ items, isCart = true }: Props) {
    const dispatch = useAppDispatch();
    const { status } = useAppSelector(state => state.cart);

    const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        {isCart &&
                            <TableCell align="right"></TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(item => (
                        <TableRow key={item.productId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                <Box display='flex' alignItems='center'>
                                    <img src={item.image} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                    <span>{item.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                            <TableCell align="center" sx={{ minWidth: 200 }}>
                                {isCart &&
                                    <LoadingButton
                                        loading={status === 'pendingRemoveItem' + item.productId + 'remove'}
                                        onClick={() => dispatch(removeItemFromCartAsync({
                                            productId: item.productId, name: 'remove'
                                        }))} color="error">
                                        <Remove />
                                    </LoadingButton>}
                                {item.quantity}
                                {isCart &&
                                    <LoadingButton
                                        loading={status === 'pendingAddItem' + item.productId}
                                        onClick={() => dispatch(addItemToCartAsync({
                                            productId: item.productId
                                        }))} color="primary">
                                        <Add />
                                    </LoadingButton>}
                            </TableCell>
                            <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
                            {isCart &&
                                <TableCell align="right">
                                    <LoadingButton
                                        loading={status === 'pendingRemoveItem' + item.productId + 'delete'}
                                        onClick={() => dispatch(removeItemFromCartAsync({
                                            productId: item.productId, quantity: item.quantity, name: 'delete'
                                        }))} color="error">
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>}
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell align="right" colSpan={2} sx={{ fontWeight: 'bold' }}>Total</TableCell>
                        <TableCell align="right" colSpan={2} sx={{ fontWeight: 'bold' }}>{currencyFormat(total)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}