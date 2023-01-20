import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";

function App() {
  const theme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#dedede'
      }
    }
  })
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container >
          <Catalog />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
