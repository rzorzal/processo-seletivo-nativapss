import 'bootstrap/dist/css/bootstrap.min.css';

import React  from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import App from './App';
import Login from './pages/Login';


import registerServiceWorker from './registerServiceWorker';

import { Router, Route } from 'react-router';

import history from './history';

import './database';


ReactDOM.render((
    <div>
        <Router history={history}>
            <div>
                <Route strict exact path="/login" component={Login}/>
                <Route path='/' component={App}/>

            </div>
        </Router>

    </div>

), document.getElementById('root'));
registerServiceWorker();
