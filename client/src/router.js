import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// internal imports
import {history} from './utils/history';
import {store} from './utils/store';
// axios interceptor 
import './utils/axios-interceptor';

// views import 
import LayoutPage from './components/layout/layout';
import HomePage from './components/pages/Home';
import ItemsPage from './components/pages/Items';
import OrdersPage from './components/pages/Orders';
import UsersPage from './components/pages/Users';
import LoginPage from './components/pages/Login';

export default (
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <LayoutPage>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/orders/:userid?" exact component={OrdersPage}/>
                        <Route path="/items" exact component={ItemsPage}/>
                        <Route path="/users" exact component={UsersPage}/>
                        <Route path="/login" exact component={LoginPage}/>                
                </LayoutPage>
            </Switch>
        </Router>
    </Provider>
);
