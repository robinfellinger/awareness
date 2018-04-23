var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Base = require('./Base.jsx');
var Page1 = require('./Page1.jsx');

var Routes = (
    <Router>
        <Route path="/" component={Base}>
            <Route path="/page1" component={"Page1"}></Route>
            <Route path="/page2" component={"Page2"}></Route>
        </Route>
    </Router>
);


module.exports = Routes;