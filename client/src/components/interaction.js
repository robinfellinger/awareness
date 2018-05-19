import React, { Component } from 'react';
import data from "./text.json";
import Type from "./type.js"



class Interaction extends Component {

    constructor(props){
        super(props);
        this.state = {
            IDTest: "Start",
            emotion: "neutral"
        }
        this.updateID = this.updateID.bind(this);
    }

    updateID(id, em){
        this.setState({IDTest: id})
        if(em) {
            this.setState({emotion: em[0]})
            console.log(this.state.emotion);
        }else{
            this.setState({emotion: "neutral"});
        }
    }

    render(){
            return (
            <div className={"interaction"}>

                {data.passages
                    .filter(function(data){return data.name === this.state.IDTest ? data : null}, this)
                    .map((question) =>

                        <p className={"interaction-question t-italic"} key={question.pid}>

                                {question.name === this.state.IDTest && <Type strings={[question.text.split('\n')[0]]}/>}
                                <div className={"answers interaction-flex"}>{
                                    (typeof(question.links)==='object')?
                                    question.links.map((subrowdata)=>

                                    <p className={"interaction-answer"} key={subrowdata.pid*Math.random()}>
                                        {question.name === this.state.IDTest &&
                                        <button  className={"interaction-button text-sm col-sm-8"}
                                                 onClick={() => this.updateID(subrowdata.link, question.tags)}>{subrowdata.name}</button>
                                        }
                                    </p>

                                    )
                                    :null
                                }</div>

                        </p>
                    )

            }
            </div>
        )
    };

}


//<button onClick={() => this.toggleExperience()}>Start Experience</button>

export default Interaction;