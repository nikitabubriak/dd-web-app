import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contacts/ContactPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import CartPage from "../../features/cart/CartPage";
import { useEffect, useState } from "react";
import { getCookie } from "../util/util";
import agent from "../../app/api/agent";
import LoadingComponent from "./LoadingComponent";
import Checkout from "../../features/checkout/Checkout";
import { useAppDispatch } from "../store/configureStore";
import { setCart } from "../../features/cart/cartSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const customerId = getCookie('customerId');
    if (customerId) {
      agent.Cart.get()
        .then(cart => dispatch(setCart(cart)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

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
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/catalog' component={Catalog} />
            <Route path='/catalog/:id' component={ProductDetails} />
            <Route path='/about' component={AboutPage} />
            <Route path='/contact' component={ContactPage} />
            <Route path='/server-error' component={ServerError} />
            <Route path='/cart' component={CartPage} />
            <Route path='/checkout' component={Checkout} />

            <Route component={NotFound} />
          </Switch>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
