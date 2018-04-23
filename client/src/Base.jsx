////////////////////////////////////////////////
////// BASIC ROUTING

var React = require('react');


var Base = React = react.createClass({
    render : function() {

        return(
            <div>
                <h1>Header</h1>
                {this.props.children}{/*HERE GOES THE PAGE*/}
            </div>
            );
        }
});

module.exports = Base;