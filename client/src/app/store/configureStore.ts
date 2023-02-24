import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountSlice } from "../../features/account/accountSlice";
import { cartSlice } from "../../features/cart/cartSlice";
import { catalogSlice } from "../../features/catalog/catalogSlice";
import { orderSlice } from "../../features/orders/orderSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        orders: orderSlice.reducer,
        catalog: catalogSlice.reducer,
        account: accountSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;