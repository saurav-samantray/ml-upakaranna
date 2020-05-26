import React  from 'react';
import { BrowserRouter , Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import Store from './configs/storeconfig'

import PrivateRoute from './helpers/privateRoute'

import Landing  from './pages/landing';
import Layout from './components/layouts/layouts';


function App() {
  return (
    <Provider store={Store}>
    <BrowserRouter>
    <Switch>
          <Route exact path="/" component={Landing}></Route>
          <PrivateRoute path="/project" component={Layout}></PrivateRoute>
          </Switch>
    </BrowserRouter>
    </Provider>

  );
}

export default App;
