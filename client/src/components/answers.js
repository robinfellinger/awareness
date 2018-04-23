import React, { Component } from 'react';
import Interaction from "./interaction";

class Answers extends Component{
    constructor(){

        super();
        this.state = {
            //question: "0",
            //emotion: this.props.emotion,
            //direction: "4",
            //content: "Hello"
        }

    }

    render() {

        //  const { question, emotion, direction, content} = this.props;
        return (
            <div>{this.props.content}</div>
        );
        //   return <button onClick={} >{this.props.content}</button>


    };
}

export default Answers;