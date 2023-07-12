import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form/dist/types";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import { User } from "../../app/models/user";
import { router } from "../../app/router/Routes";
import { eraseCookie } from "../../app/util/util";
import { setCart } from "../cart/cartSlice";

interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: null
}

export const loginUser = createAsyncThunk<User, FieldValues>(
    'account/loginUser',
    async (data, thunkAPI) => {
        try {
            const userDTO = await agent.Account.login(data);
            const { cart, ...user } = userDTO;
            if (cart) thunkAPI.dispatch(setCart(cart));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)))
        try {
            const userDTO = await agent.Account.currentUser();
            const { cart, ...user } = userDTO;
            if (cart) thunkAPI.dispatch(setCart(cart));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            eraseCookie('customerId');
            router.navigate('/');
        },
        setUser: (state, action) => {
            let claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            let roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            state.user = { ...action.payload, roles: typeof (roles) === 'string' ? [roles] : roles };
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.error('Session token expired. You need to login again');
            router.navigate('/login');
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            throw action.payload;
        })
        builder.addMatcher(isAnyOf(loginUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            let claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            let roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            state.user = { ...action.payload, roles: typeof (roles) === 'string' ? [roles] : roles };
        });
    })
})

export const { logoutUser, setUser } = accountSlice.actions;