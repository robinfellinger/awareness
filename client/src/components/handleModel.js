import React, { Component } from 'react';

class AccessLinks extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    render(){
        return (
            <div className={"pos-absolute accesslinks_pos"}>
                <a className={"accesslinks_link text-sm t-transform-lowercase a-sm a-startAnim"} href="">werde aktiv</a>
                <a className={"accesslinks_link text-sm t-transform-lowercase a-sm a-startAnim"} href="">glossar</a>
            </div>
        );
    }
}

export default AccessLinks;