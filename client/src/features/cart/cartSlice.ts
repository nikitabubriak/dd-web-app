import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Cart } from "../../app/models/cart";

interface CartState {
    cart: Cart | null;
    status: string
}

const initialState: CartState = {
    cart: null,
    status: 'idle'
}

export const addItemToCartAsync = createAsyncThunk<Cart, { productId: number, quantity?: number }>(
    'cart/addItemToCartAsync',
    async ({ productId, quantity = 1 }, thunkAPI) => {
        try {
            return await agent.Cart.addItem(productId, quantity);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const removeItemFromCartAsync = createAsyncThunk<void, { productId: number, quantity?: number, name?: string }>(
    'cart/removeItemFromCartAsync',
    async ({ productId, quantity = 1 }, thunkAPI) => {
        try {
            await agent.Cart.removeItem(productId, quantity);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
    },
    extraReducers: (builder => {
        builder.addCase(addItemToCartAsync.pending, (state, action) => {
            state.status = 'pendingAddItem' + action.meta.arg.productId;
        });
        builder.addCase(addItemToCartAsync.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.status = 'idle';
        });
        builder.addCase(addItemToCartAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });

        builder.addCase(removeItemFromCartAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.productId + action.meta.arg.name;
        });
        builder.addCase(removeItemFromCartAsync.fulfilled, (state, action) => {
            const { productId, quantity = 1 } = action.meta.arg;
            const itemIndex = state.cart?.items.findIndex(i => i.productId === productId);
            if (itemIndex === undefined || itemIndex === -1) return;

            state.cart!.items[itemIndex].quantity -= quantity!;
            if (state.cart!.items[itemIndex].quantity === 0) {
                state.cart?.items.splice(itemIndex, 1);
            }
            state.status = 'idle';
        })
        builder.addCase(removeItemFromCartAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    })
})

export const { setCart } = cartSlice.actions;