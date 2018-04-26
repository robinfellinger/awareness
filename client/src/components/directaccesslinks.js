import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AccessLinks extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    render(){
        return (
            <div className={"pos-absolute accesslinks_pos"}>
                <Link to='/aktiv' className={"accesslinks_link text-sm t-transform-lowercase a-sm a-startAnim"}>werde aktiv</Link>
                <Link to='/glossar' className={"accesslinks_link text-sm t-transform-lowercase a-sm a-startAnim"} >glossar</Link>
            </div>
        );
    }
}

export default AccessLinks;