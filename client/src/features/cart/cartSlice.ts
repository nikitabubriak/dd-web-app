import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Cart } from "../../app/models/cart";
import { getCookie } from "../../app/util/util";

interface CartState {
    cart: Cart | null;
    status: string
}

const initialState: CartState = {
    cart: null,
    status: 'idle'
}

export const fetchCartAsync = createAsyncThunk<Cart>(
    'cart/fetchCartAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Cart.get();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    },
    {
        condition: () => {
            if (!getCookie('customerId')) return false;
        }
    }
)

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
        resetCart: (state) => {
            state.cart = null;
        }
    },
    extraReducers: (builder => {
        builder.addCase(addItemToCartAsync.pending, (state, action) => {
            state.status = 'pendingAddItem' + action.meta.arg.productId;
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
            if (state.cart!.items.length === 0) state.cart = null;
            state.status = 'idle';
        })
        builder.addCase(removeItemFromCartAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });

        builder.addMatcher(isAnyOf(addItemToCartAsync.fulfilled, fetchCartAsync.fulfilled), (state, action) => {
            state.cart = action.payload;
            state.status = 'idle';
        });
        builder.addMatcher(isAnyOf(addItemToCartAsync.rejected, fetchCartAsync.rejected), (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    })
})

export const { setCart, resetCart } = cartSlice.actions;