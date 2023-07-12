import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Box, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import UserMenu from "./UserMenu";

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'sign up', path: '/register' },
]

const navStyle = {
    typography: 'h6',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    color: 'inherit',
    '&:hover': { color: 'primary.light' },
    '&.active': { color: 'secondary.light' }
}

export default function Header() {
    const { cart } = useAppSelector(state => state.cart);
    const { user } = useAppSelector(state => state.account);
    const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AppBar position='static' sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'Space-between', alignItems: 'center', flexDirection: { xs: "column", sm: "row" } }}>

                <Typography variant='h6' component={NavLink} to={'/home'} sx={navStyle}>
                    DD WEB APP
                </Typography>

                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem component={NavLink} to={path} key={path} sx={navStyle}>
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                    {user && user.roles?.includes('Admin') &&
                        <ListItem component={NavLink} to={'/inventory'} sx={navStyle}>
                            INVENTORY
                        </ListItem>
                    }
                </List>

                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to='/cart' size='large' sx={{ color: 'inherit' }}>
                        <Badge badgeContent={itemCount} color='success'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    {user ? (
                        <UserMenu />
                    ) : (
                        <List sx={{ display: 'flex' }}>
                            {rightLinks.map(({ title, path }) => (
                                <ListItem component={NavLink} to={path} key={path} sx={navStyle}>
                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            </Toolbar>
        </AppBar >
    )
}