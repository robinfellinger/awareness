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
            <div className={"startInfo_pos"}>
                <h2 className={"headline-xl t-transform-lowercase t-italic"}>Hi, ich bin Alex|</h2>
                <h3 className={"headline-lg"}>wollen wir miteinander chatten?</h3>
            </div>

        );
    }


}
export default StartInfo;