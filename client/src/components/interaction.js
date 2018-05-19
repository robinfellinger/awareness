import React, { Component } from 'react';
import data from "./text.json";
import Type from "./type.js"



class Interaction extends Component {

    constructor(props){
        super(props);
        this.state = {
            IDTest: "Start"
        }
        this.updateID = this.updateID.bind(this);
    }

    updateID(id){
        this.setState({IDTest: id})
    }

    render(){
            return (
            <div className={"interaction"}>

                {data.passages
                    .filter(function(data){return data.name === this.state.IDTest ? data : null}, this)
                    .map((question) =>

                        <div className={"interaction-question t-italic"} key={question.pid}>

                                {question.name === this.state.IDTest && <Type strings={[question.text]}/>}
                                {
                                    (typeof(question.links)=='object')?
                                    question.links.map((subrowdata)=>

                                    <div className={"interaction-flex"} key={subrowdata.pid*Math.random()}>
                                        {question.name === this.state.IDTest &&
                                        <button  className={"interaction-button text-sm col-sm-8"}
                                                 onClick={() => this.updateID(subrowdata.link)}>{subrowdata.name}</button>
                                        }
                                    </div>

                                    )
                                    :null
                                }

                        </div>
                    )

            }
            </div>
        )
    };

}


//<button onClick={() => this.toggleExperience()}>Start Experience</button>

export default Interaction;