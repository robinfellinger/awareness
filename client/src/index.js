import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './main.css';
import App from './App';
import Statistics from './Statistics';
import {render} from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import threeEntryPoint from "./components/threejs/ThreeEntryPoint"
import Page_statistics from "./pages/page_statistics"
import Interaction from "./components/interaction";
import StartInfo from "./StartInfo";
import './index.css'
import './scss/main.scss'
import './scss/main.css'

const Main = () =>  (
    <Router>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/statistics" component={Statistics}/>
        </Switch>
    </Router>
)

render((
    <Router>
        <Main />
    </Router>
  ), document.getElementById('root'));
  
registerServiceWorker();
