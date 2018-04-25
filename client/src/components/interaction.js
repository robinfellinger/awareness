import React, { Component } from 'react';
import Message from "./message.js";
import Answers from "./answer.js";
import data from "./text.json";

class Interaction extends Component {
    constructor(props){
        super(props);
        this.state = {tag:props.tag};
    }

    const question = data.passages.map(function(data){data.text});
    const answers = data.passages.links.map(function(data){data.name});

    render() {
        return (
            <ul>
                {
                    data.passages.map(function (data) {
                        if(data.name == this.state.tag) {
                            return <li>{data.text}
                                <button>test</button>
                            </li>;
                        }
                    })
                }
            </ul>
        );
    };
}


//<button onClick={() => this.toggleExperience()}>Start Experience</button>

export default Interaction;