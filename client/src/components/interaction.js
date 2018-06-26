import React, { Component } from 'react';
import data from "./text.json";
import Type from "./type.js"

class Interaction extends Component {

    constructor(props){
        super(props);
        this.state = {
            IDTest: "Hallo, ich bin Leo",
            emotion: "neutral",
            chat: [],
            finished: false
        };
        this.update = this.update.bind(this);
    }

    myCallback = (dataFromChild) => {
            this.state.chat.push({'answer': null, 'question':dataFromChild});
            this.state.finished = true;
    }

    update(id, em,  answer, question){
        this.setState({IDTest: id});
        if(em) {
            this.setState({emotion: em[0]});
            console.log(this.state.emotion);
        }else{
            this.setState({emotion: "neutral"});
        }

        if(this.state.chat.length !== 0 && this.state.chat[this.state.chat.length-1].answer === null && this.state.chat[this.state.chat.length-1].question !== null){
            this.state.chat[this.state.chat.length-1].answer = answer;
            this.state.finished = true;
        }else{
            this.state.chat.push({'answer': answer, 'question':question});
            this.state.finished = true;
        }


    }

    componentDidUpdate(){
        if(this.state.finished) {
            let elem = document.getElementById("chatrunning");
            elem.scrollTop = elem.scrollHeight;
            this.state.finished = false;
        }
    }


    render(){
            return (
            <div className={"interaction-container"} >

                {data.passages
                    .filter(function(data){return data.name === this.state.IDTest ? data : null}, this)
                    .map((question) =>

                        <div className={"grid-container"} key={question.pid}>

                              {question.name === this.state.IDTest && <Type strings={[question.text.split("\n\n")[0]]} callbackFromParent={this.myCallback}/>}


                            <div id={"chatrunning"} className={"grid-item1 chatrunning"}>

                                {this.state.chat.map((said) =>
                                    <div className={"chat"}>
                                        {said.question !== null && <p className={"chat-q text-sm"}>{said.question}</p>}
                                        {said.answer !== null &&<p className={"chat-a text-sm"}>{said.answer}</p>}
                                    </div>)

                                }
                            </div>

                            <div className={"grid-item2"}>
                            {(typeof(question.links)==='object')?
                            question.links.map((subrowdata)=>

                            <p className={"interaction-answer"}>
                                {question.name === this.state.IDTest &&
                                <button  className={"interaction-button text-sm"}
                                         onClick={() => this.update(subrowdata.link, question.tags, subrowdata.name, question.text.split("\n\n")[0])}>{subrowdata.name}</button>
                                }
                            </p>

                            )
                            :null
                        }</div>
                        </div>
                    )
            }
            </div>
        )
    };

}


//<button onClick={() => this.toggleExperience()}>Start Experience</button>

export default Interaction;