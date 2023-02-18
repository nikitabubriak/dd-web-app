import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/store/configureStore';
import { loginUser } from './accountSlice';

export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'onTouched'
    });

    async function submitForm(data: FieldValues) {
        try {
            await dispatch(loginUser(data));
            navigate(location.state?.from?.pathname || '/catalog');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container component={Paper} maxWidth="sm" >
            <Box
                sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Username"
                        autoFocus
                        {...register('username', { required: 'Username is required' })}
                        error={!!errors.username}
                        helperText={errors?.username?.message as string}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        {...register('password', { required: 'Password is required' })}
                        error={!!errors.password}
                        helperText={errors?.password?.message as string}
                    />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        loading={isSubmitting}
                        disabled={!isValid}
                    >
                        Sign In
                    </LoadingButton>
                    <Grid container>
                        <Grid item>
                            <Link to='/register'>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}