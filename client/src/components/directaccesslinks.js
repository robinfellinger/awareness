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

            <div className={"pos-absolute"}>
                <svg className="margin-line" width="100%" height="5">
                    <line className={"button--animate__arrowline"} x1="0" y1="0" x2="90" y2="0"
                          strokeWidth="3px" stroke="white"/>
                </svg>
                <div className="accesslinks_pos">
                <Link to='/active' className={"accesslinks_link text-sm t-transform-lowercase a-sm a-startAnim"}>werde aktiv</Link>
                <Link to='/glossary' className={"accesslinks_link text-sm t-transform-lowercase a-sm a-startAnim"} >glossar</Link>
                </div>
            </div>
        );
    }
}

export default AccessLinks;