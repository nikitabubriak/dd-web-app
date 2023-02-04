import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Box, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' },
]

const navStyle = {
    typography: 'h6',
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': { color: 'grey.500' },
    '&.active': { color: 'text.secondary' }
}

export default function Header() {
    return (
        <AppBar position='static' sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'Space-between', alignItems: 'center' }}>

                <Typography variant='h6' exact component={NavLink} to={'/'} sx={navStyle}>
                    DD WEB APP
                </Typography>

                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem component={NavLink} to={path} key={path} sx={navStyle}>
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>

                <Box display='flex' alignItems='center'>
                    <IconButton size='large' sx={{ color: 'inherit' }}>
                        <Badge badgeContent={3} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem component={NavLink} to={path} key={path} sx={navStyle}>
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar >
    )
}