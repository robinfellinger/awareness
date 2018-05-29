import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './main.css';
import App from './App';
import {render} from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import threeEntryPoint from "./components/threejs/ThreeEntryPoint"

import Statistics from "./pages/page_statistics"
import Active from "./pages/page_active"
import Glossary from "./pages/page_glossary"
import $ from 'jquery';
//import './index.css'
import './scss/main.scss'
import './scss/main.css'



/* -----ROUTING-----*/
const Main = () =>  (
    <Router>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/statistics" component={Statistics}/>
            <Route path="/active" component={Active}/>
            <Route path="/glossary" component={Glossary}/>
        </Switch>
    </Router>
)

render((
    <Router>
        <Main />
    </Router>
  ), document.getElementById('root'));

registerServiceWorker();
