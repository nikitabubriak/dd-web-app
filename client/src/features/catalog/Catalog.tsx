import { Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import AppPagination from "../../components/AppPagination";
import CheckboxButtonGroup from "../../components/CheckboxButtonGroup";
import RadioButtonGroup from "../../components/RadioButtonGroup";
import { fetchFiltersAsync, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to low' },
    { value: 'priceAsc', label: 'Price - Low to high' }
]

export default function Catalog() {
    const dispatch = useAppDispatch();
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, filtersLoaded, genres, themes, productParams, metaData } = useAppSelector(state => state.catalog);

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [dispatch, productsLoaded])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFiltersAsync());
    }, [dispatch, filtersLoaded])

    if (!filtersLoaded) return <LoadingComponent message='Loading products...' />

    return (
        <Grid container columnSpacing={4}>
            <Grid item xs={3}>
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
            <Grid item xs={9}>
                <ProductList products={products} />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={9} sx={{ mt: 4, mb: 4 }}>
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