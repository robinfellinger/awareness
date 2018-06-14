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

            <div className={"pos-absolute accesslinks__line-pos"}>
                <svg className="margin-line" width="100%" height="5">
                    <line  className={"accesslinks__line"} x1="0" y1="0" x2="100%" y2="0"
                          strokeWidth="3px" stroke="#8A8A8A"/>
                </svg>
                <div className="accesslinks_pos">
                <Link to='/active' style={{color: "#8A8A8A"}} className={"accesslinks_link text-sm t-transform-lowercase a-sm a-startAnim"}>werde aktiv</Link>
                <Link to='/glossary' style={{color: "#8A8A8A"}} className={"accesslinks_link text-sm t-transform-lowercase a-sm a-startAnim"} >glossar</Link>
                <Link to='/'  style={{color: "#8A8A8A"}} className={"accesslinks_link text-sm t-transform-lowercase a-sm a-startAnim"} >Homepage</Link>

                </div>
            </div>
        );
    }
}

export default AccessLinks;