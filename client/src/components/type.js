import React, { Component } from 'react';
import Typed from 'typed.js';

class Type extends Component {


    componentDidMount() {
        const { strings } = this.props;

        const a = this.props.callbackFromParent;
        const options = {
            strings: strings,
            typeSpeed: 0.9,
            onComplete: function (self) {
                a(strings);
            }
        };
        this.typed = new Typed(this.el, options);
    }

    componentWillUnmount() {
        this.typed.destroy();
    }

    render() {
        return (
            <div className={"grid-item3 text"}><span
                ref={(el) => {this.el = el;}}
            /></div>

        );
    }
}

export default Type;