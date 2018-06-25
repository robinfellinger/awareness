import React, { Component } from 'react';
import data from "./text.json";
import Type from "./type.js";
import stats from "./stats.json";
import firebase from 'firebase';
import {DB_CONFIG} from '../Config';
// const Firestore = require('@google-cloud/firestore');
// const firestore = new Firestore({
//     projectId: 'awareness-ca317',
//     keyFilename: './awareness-e8bf142951ee.json',
//   });
//   const document = firestore.doc('stats/question');



class Interaction extends Component {

    constructor(props){
        super(props);
        this.state = {
            IDTest: "Start",
            emotion: "neutral",
            index: 0,
            answers: []
        }
        this.updateID = this.updateID.bind(this);
        this.app = firebase.initializeApp(DB_CONFIG);
        this.database = this.app.database().ref();
    }

    updateID(id, em, pid){
        this.setState({IDTest: id})
        this.setState({index: this.state.index + 1})
        if(em) {
            this.setState({emotion: em[0]})
            console.log(this.state.emotion);
        }else{
            this.setState({emotion: "neutral"});
        }
        this.setState({index: this.state.answers.push(pid)});
        console.log(this);
        console.log(pid);

        this.writeData(pid);

        let obj = stats;
        obj.question['count'] = 1;
        console.log(obj);


        stats.question[pid]++;
        console.log(stats.question[pid]);
    }

     writeData(pid){
        console.log(this.database.child(pid));

        var updates = {};
        updates['/question/' + pid] = 1;
        this.database.update(updates);
     }

    render(){
            return (
            <div className={"interaction"}>

                {data.passages
                    .filter(function(data){return data.name === this.state.IDTest ? data : null}, this)
                    .map((question) =>

                        <div className={"interaction-question t-italic"} key={question.pid}>

                                {question.name === this.state.IDTest && <Type strings={[question.text.split('\n')[0]]}/>}
                                <div className={"answers interaction-flex"}>{
                                    (typeof(question.links)==='object')?
                                    question.links.map((subrowdata)=>

                                    <p className={"interaction-answer"}>
                                        {question.name === this.state.IDTest &&
                                        <button  className={"interaction-button text-sm col-sm-8"}
                                                 onClick={() => {
                                                     this.updateID(subrowdata.link, question.tags, subrowdata.pid);
                                                    }}>{subrowdata.name}</button>
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