import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Order } from "../../app/models/order";
import { RootState } from "../../app/store/configureStore";

interface OrderState {
    ordersLoaded: boolean;
    status: string
}

export const ordersAdapter = createEntityAdapter<Order>();

export const fetchOrdersAsync = createAsyncThunk<Order[], void>(
    'orders/fetchOrdersAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Orders.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchOrderAsync = createAsyncThunk<Order, number>(
    'orders/fetchOrderAsync',
    async (orderId, thunkAPI) => {
        try {
            return await agent.Orders.details(orderId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const orderSlice = createSlice({
    name: 'orders',
    initialState: ordersAdapter.getInitialState<OrderState>({
        ordersLoaded: false,
        status: 'idle'
    }),
    reducers: {
        unloadOrders: (state) => {
            state.ordersLoaded = false;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchOrdersAsync.pending, (state, action) => {
            state.status = 'pendingFetchOrders';
        });
        builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
            ordersAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.ordersLoaded = true;
        });
        builder.addCase(fetchOrdersAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });

        builder.addCase(fetchOrderAsync.pending, (state, action) => {
            state.status = 'pendingFetchOrder';
        });
        builder.addCase(fetchOrderAsync.fulfilled, (state, action) => {
            ordersAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchOrderAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    })
});

export const orderSelectors = ordersAdapter.getSelectors((state: RootState) => state.orders);
export const { unloadOrders } = orderSlice.actions;