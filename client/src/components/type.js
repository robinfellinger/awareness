import React, { Component } from 'react';
import Typed from 'typed.js';

class Type extends Component {
    componentDidMount() {
        const { strings } = this.props;

        const options = {
            strings: strings,
            typeSpeed: 0.7,
        };
        this.typed = new Typed(this.el, options);
    }

    componentWillUnmount() {
        this.typed.destroy();
    }

    render() {
        return (
            <div className={"question"}><span
                ref={(el) => { this.el = el; }}
            /></div>
        );
    }
}

export default Type;