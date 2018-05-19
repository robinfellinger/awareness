import React, { Component } from 'react';
import Typed from 'typed.js';

class Type extends Component {
    componentDidMount() {
        const { strings } = this.props;

        const options = {
            strings: strings,
            typeSpeed: 10,
        };
        this.typed = new Typed(this.el, options);
    }

    componentWillUnmount() {
        this.typed.destroy();
    }

    render() {
        return (
            <div><span
                ref={(el) => { this.el = el; }}
            /></div>
        );
    }
}

export default Type;