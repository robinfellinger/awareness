import React, { Component } from 'react';
import data from "./text.json";


class Interaction extends Component {

    constructor(props){
        super(props);
        this.state = {
            IDTest: "Start",
        }
        this.updateID = this.updateID.bind(this);
    }

    updateID(id){
        this.setState({IDTest: id})
        //this.setState();
    }

// rowdata.name == start or rowdata.name == subrowdata.link
    render() {
        //const question = data.passages.map(function(data){data});
        return (
            <div>{
                data.passages.map((rowdata, i) =>
                    <div className={"headline-lg"} key={rowdata.pid}>
                        {rowdata.name === this.state.IDTest && rowdata.text}
                        {
                            (typeof(rowdata.links)=='object')?

                            rowdata.links.map((subrowdata)=>

                            <div key={subrowdata.pid*Math.random()}>
                                {rowdata.name === this.state.IDTest &&
                                <button  className={"button-basic text-sm t-transform-lowercase"} onClick={() => this.updateID(subrowdata.link)}>{subrowdata.name}</button>
                                }
                            </div>

                            )
                            :null
                        }

                    </div>)
            }</div>
        )
    };
}


//<button onClick={() => this.toggleExperience()}>Start Experience</button>

export default Interaction;