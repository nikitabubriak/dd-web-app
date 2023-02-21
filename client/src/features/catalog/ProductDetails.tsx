import { LoadingButton } from "@mui/lab";
import { Container, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { addItemToCartAsync, removeItemFromCartAsync } from "../cart/cartSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();

    const dispatch = useAppDispatch();
    const product = useAppSelector(state => productSelectors.selectById(state, id!));
    const { cart, status: cartStatus } = useAppSelector(state => state.cart);
    const { status: productStatus } = useAppSelector(state => state.catalog);

    const [quantity, setQuantity] = useState(1);
    const item = cart?.items.find(i => i.productId === product?.id);

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        if (!product) dispatch(fetchProductAsync(parseInt(id!)));
    }, [dispatch, product, id, item])

    function changeQuantityInput(event: any) {
        if (event.target.value >= 0) setQuantity(parseInt(event.target.value));
    }

    function updateCartInput() {
        if (!item || quantity > item.quantity) {
            const newQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addItemToCartAsync({ productId: product?.id!, quantity: newQuantity }))
        } else {
            const newQuantity = item.quantity - quantity;
            dispatch(removeItemFromCartAsync({ productId: product?.id!, quantity: newQuantity }))
        }
    }

    if (productStatus.includes('pending')) return <LoadingComponent message='Loading product...' />
    if (!product) return <NotFound />

    return (
        <Container component={Paper} sx={{ pt: 5, pb: 5 }}>
            <Grid container spacing={6}>
                <Grid item xs={6}>
                    <img src={product.image} alt={product.name} style={{ width: '100%' }} />
                    {/* <Divider sx={{ mt: 6, mb: 6 }} /> */}
                    <Typography variant="h4" sx={{ fontWeight: 'bold', pt: 5, pb: 5 }}>{product.name}</Typography>


                </Grid>
                <Grid item xs={6}>

                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Developer</TableCell>
                                    <TableCell>{product.developer}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Release date</TableCell>
                                    <TableCell>{product.releaseDate.toString()}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Genre</TableCell>
                                    <TableCell>{product.genre}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Theme</TableCell>
                                    <TableCell>{product.theme}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Quantity in stock</TableCell>
                                    <TableCell>{product.quantityInStock}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ pt: 4 }}>
                <Grid item xs={6}>
                    <Typography variant="h4" color='success'>{currencyFormat(product.price)}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <TextField onChange={changeQuantityInput}
                        fullWidth variant="outlined" type="number" label="Quantity" value={quantity} />
                </Grid>
                <Grid item xs={3}>
                    <LoadingButton onClick={updateCartInput}
                        loading={cartStatus.includes('pending')}
                        disabled={item?.quantity === quantity || (!item && quantity === 0)}
                        fullWidth variant="contained" size='large' sx={{ height: '55px' }} color='success' >
                        {item ? 'Change quantity' : 'Add to cart'}
                    </LoadingButton>
                </Grid>
            </Grid>
        </Container>
    )
}