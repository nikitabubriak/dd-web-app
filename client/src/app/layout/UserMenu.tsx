import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../features/account/accountSlice';
import { resetCart } from '../../features/cart/cartSlice';
import { unloadOrders } from '../../features/orders/orderSlice';

export default function UserMenu() {
    const { user } = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button onClick={handleClick} color='inherit' sx={{ typography: 'h6' }}>
                {user?.email}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleClose}
                    component={Link} to='/orders'>My orders</MenuItem>
                <MenuItem onClick={() => {
                    dispatch(logoutUser());
                    dispatch(resetCart());
                    dispatch(unloadOrders());
                }} component={Link} to='/'>Logout</MenuItem>
            </Menu>
        </>
    );
}