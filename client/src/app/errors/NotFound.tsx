import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Container component={Paper} sx={{ height: 400 }}>
            <Box sx={{ pt: 15, pb: 15 }}>
                <Typography variant='h3' gutterBottom align='center'>
                    404 Not found
                </Typography>
            </Box>

            <Button
                component={Link} to='/catalog'
                fullWidth variant="contained" size='large' color='primary' sx={{ height: '55px', mb: 3 }}
            >
                Go back to the store
            </Button>
        </Container>
    )
}