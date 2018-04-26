import React, { Component } from 'react';
import data from "./text.json";
import Type from "./type.js"

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
    }



    render() {
        //const question = data.passages.map(function(data){data});
        return (
            <div className={"pos-centerText"}>{
                data.passages.map((rowdata, i) =>
                    <div className={"interaction-question t-italic"} key={rowdata.pid}>
                      
                        {rowdata.name === this.state.IDTest && <Type strings={[rowdata.name]}/>}
                        {rowdata.tag !== null && rowdata.tag}
                        {
                            (typeof(rowdata.links)=='object')?

                            rowdata.links.map((subrowdata)=>

                            <div className={"interaction-flex"} key={subrowdata.pid*Math.random()}>
                                {rowdata.name === this.state.IDTest &&
                                <button  className={"interaction-button text-sm col-sm-8"}
                                         onClick={() => this.updateID(subrowdata.link)}>{subrowdata.name}</button>
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