import { Grid, Paper } from "@mui/material";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import AppPagination from "../../components/AppPagination";
import CheckboxButtonGroup from "../../components/CheckboxButtonGroup";
import RadioButtonGroup from "../../components/RadioButtonGroup";
import { setPageNumber, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";
import useProducts from "../../app/hooks/useProducts";

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceAsc', label: 'Price - Low to high' },
    { value: 'priceDesc', label: 'Price - High to low' }
]

export default function Catalog() {
    const { products, filtersLoaded, genres, themes, metaData } = useProducts();
    const { productParams } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    if (!filtersLoaded) return <LoadingComponent message='Loading products...' />

    return (
        <Grid container columnSpacing={4} >
            <Grid item xs={12} sm={4} md={3}>
                <Paper sx={{ mb: 2 }}>
                    <ProductSearch />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <RadioButtonGroup
                        selectedValue={productParams.orderBy}
                        options={sortOptions}
                        onChange={(event) => dispatch(setProductParams({ orderBy: event.target.value }))}
                    />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <CheckboxButtonGroup
                        items={genres}
                        checked={productParams.genres}
                        onChange={(items: string[]) => dispatch(setProductParams({ genres: items }))}
                    />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <CheckboxButtonGroup
                        items={themes}
                        checked={productParams.themes}
                        onChange={(items: string[]) => dispatch(setProductParams({ themes: items }))}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
                <ProductList products={products} />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={12} sm={9} sx={{ mt: 2, mb: 4 }}>
                {metaData &&
                    <AppPagination
                        metaData={metaData}
                        onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
                    />
                }
            </Grid>
        </Grid>
    )
}