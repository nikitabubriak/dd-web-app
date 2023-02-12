import { Box, Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";

export default function ServerError() {
    const history = useHistory();
    const { state } = useLocation<any>();

    return (
        <Container component={Paper}>
            {state?.error ? (
                <>
                    <Box sx={{ pt: 5, pb: 5 }}>
                        <Typography variant="h4" color='error'>{state.error.title}</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ pt: 5, pb: 5 }}>
                        <Typography>{state.error.detail || 'Internal server error'}</Typography>
                    </Box>
                </>
            ) : (
                <Typography variant="h4" gutterBottom color='error'>Server error</Typography>
            )}
            <Button
                onClick={() => history.push('/catalog')}
                fullWidth variant="contained" size='large' color='primary' sx={{ height: '55px', mb: 3 }}
            >
                Go back to the store
            </Button>
        </Container>
    )
}