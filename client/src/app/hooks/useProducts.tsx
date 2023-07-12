import { useEffect } from "react";
import { productSelectors, fetchProductsAsync, fetchFiltersAsync } from "../../features/catalog/catalogSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";

export default function useProducts() {
    const dispatch = useAppDispatch();
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, filtersLoaded, genres, themes, metaData } = useAppSelector(state => state.catalog);

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [dispatch, productsLoaded])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFiltersAsync());
    }, [dispatch, filtersLoaded])

    return {
        products,
        productsLoaded,
        filtersLoaded,
        genres,
        themes,
        metaData
    }
}