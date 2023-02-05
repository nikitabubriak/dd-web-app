import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import { currencyFormat } from "../../app/util/util";

export default function ProductDetails() {
    const { cart, setCart, removeItem } = useStoreContext();
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    const [quantity, setQuantity] = useState(1);
    const [quantityLoading, setQuantityLoading] = useState(false);
    const item = cart?.items.find(i => i.productId === product?.id);

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        agent.Catalog.details(parseInt(id))
            .then(product => setProduct(product))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id, item])

    function changeQuantityInput(event: any) {
        if (event.target.value >= 0) setQuantity(parseInt(event.target.value));
    }

    function updateCartInput() {
        setQuantityLoading(true);
        if (!item || quantity > item.quantity) {
            const newQuantity = item ? quantity - item.quantity : quantity;
            agent.Cart.addItem(product?.id!, newQuantity)
                .then(cart => setCart(cart))
                .catch(error => console.log(error))
                .finally(() => setQuantityLoading(false));
        } else {
            const newQuantity = item.quantity - quantity;
            agent.Cart.removeItem(product?.id!, newQuantity)
                .then(() => removeItem(product?.id!, newQuantity))
                .catch(error => console.log(error))
                .finally(() => setQuantityLoading(false));
        }
    }

    if (loading) return <LoadingComponent message='Loading product...' />
    if (!product) return <NotFound />

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h4" color='secondary'>{currencyFormat(product.price)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField onChange={changeQuantityInput}
                            fullWidth variant="outlined" type="number" label="Quantity" value={quantity} />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton onClick={updateCartInput}
                            loading={quantityLoading} disabled={item?.quantity === quantity || (!item && quantity === 0)}
                            fullWidth variant="contained" size='large' sx={{ height: '55px' }} color='primary' >
                            {item ? 'Change quantity' : 'Add to cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}