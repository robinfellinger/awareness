import React, { Component } from 'react';

class StartInfo extends Component {

    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {

    }



    render() {
        return (
            <div className={""}>
                <h2 className={"headline-xl t-transform-lowercase"}><span className={"t-italic"}>Hi, ich bin </span>Alex|</h2>
                <h3 className={"headline-lg"}>wollen wir miteinander chatten?</h3>
            </div>

        );
    }


}
export default StartInfo;