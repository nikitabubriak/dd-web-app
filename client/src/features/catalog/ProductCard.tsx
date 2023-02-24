import { LoadingButton } from "@mui/lab";
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { addItemToCartAsync } from "../cart/cartSlice";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const dispatch = useAppDispatch();
    const { status } = useAppSelector(state => state.cart);

    return (
        <Card>
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.main' }}
                image={product.image}
                title={product.name}
            />
            <CardHeader
                title={product.name} disableTypography sx={{ fontWeight: 'bold', color: 'primary.main' }}
            />

            <CardContent>

                <Typography variant="body2" color="text.secondary">
                    {product.genre} / {product.theme}
                </Typography>
                <Typography gutterBottom color='success' variant="h5">
                    {currencyFormat(product.price)}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", mb: 1 }}>
                <LoadingButton
                    loading={status === 'pendingAddItem' + product.id} size="medium" variant="contained" color="success"
                    onClick={() => dispatch(addItemToCartAsync({ productId: product.id }))}  >
                    Add to cart
                </LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} size="medium" variant="contained" color="primary">
                    View
                </Button>
            </CardActions>
        </Card>
    )
}