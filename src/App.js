import logo from './logo.svg';
import './App.scss';
import Store from './Components/Store/Store';
import { Route, Switch } from 'react-router-dom';
import WhatsappIcon from './Components/Others/WhatsappIcon/WhatsappIcon';
import NavBar from './Components/NavBar/NavBar';
import Banner from './Components/Others/Banner/Banner'
import Container from '@material-ui/core/Container';
import { Divider, Grid } from '@material-ui/core';
import Footer from './Components/Others/Footer/Footer'
import DefaultContainer from './Components/Others/Router/DefaultContainer';
import LoginContainer from './Components/Others/Router/LoginContainer';
import SignUp from './Components/Authentication/SignUp';
import { useSelector } from 'react-redux';
import Cart from './Components/Store/Cart/Cart';
import Checkout from './Components/Store/Checkout/Checkout';
import { SnackbarProvider } from 'notistack';
import CheckoutSuccess from './Components/Store/Checkout/Result/CheckOutSuccess'
import Profile from './Components/Profile/Profile';

function App() {
  const isAuthenticated = useSelector(state => state.AuthenticationReducer.isAuthenticated)
  console.log("isAuthenticated: ", isAuthenticated);

  return (
    <Switch>

      <Route exact path="/user/settings" render={props => <Profile {...props} />} />
      <Route exact path="/checkout" render={props => <Checkout {...props} />} />
      <Route exact path="/checkout/success" render={props => <CheckoutSuccess {...props} />} />
      <Route exact path="/auth/signup" render={props => <SignUp {...props} />} />
      <Route exact path="/cart" render={props => <Cart {...props} />} />
      <Route exact path="/auth/signin" render={props => <LoginContainer {...props} />} />
      <Route>
        <Grid container
          direction="row"
          justify="center"
          alignItems="center"

        >
          <NavBar isAuthenticated={isAuthenticated} />
          <Banner />
          <Route exact path="/" render={props => (
            <SnackbarProvider maxSnack={6}>
              <Store  {...props} />
            </SnackbarProvider>
          )
          } />

          <Footer />
          <WhatsappIcon />
        </Grid>
      </Route>


    </Switch>
  );
}

export default App;
