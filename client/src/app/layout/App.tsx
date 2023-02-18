import Header from "./Header";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useEffect, useState } from "react";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchCartAsync } from "../../features/cart/cartSlice";
import { fetchCurrentUser } from "../../features/account/accountSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchCartAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false))
  }, [initApp]);

  if (loading) return <LoadingComponent message='Loading app...' />

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        light: '#62727b',
        main: '#37474f',
        dark: '#102027',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#ff5f52',
        main: '#c62828',
        dark: '#8e0000',
        contrastText: '#000000',
      },
      background: {
        default: '#dedede'
      }
    }
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer position='bottom-right' hideProgressBar />
        <CssBaseline />
        <Header />
        <Container >
          <Outlet />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
