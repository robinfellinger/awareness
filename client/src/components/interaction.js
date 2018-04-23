import React, { Component } from 'react';
import Message from "./message.js";
import Answers from "./answers.js";

class Interaction extends Component {

    render() {
        return (
        /*const flex = {
            color: 'blue',
            display: flex,
        };*/


            <div className={"classe"}>
                {<Message content={"FRAGE"} q/>}
                <button>
                    {<Answers content={"ANTWORT"}q/>}

                </button>
            </div>
        );
    }
    ;
}


//<button onClick={() => this.toggleExperience()}>Start Experience</button>

export default Interaction;