import React, { Component } from 'react';
import data from "./text.json";
import Type from "./type.js";
import firebase from 'firebase';
import {DB_CONFIG} from '../Config';
import admin from 'firebase-admin';
import { isNull } from 'util';

class Interaction extends Component {

    constructor(props){
        super(props);
        this.state = {
            IDTest: "Start",
            emotion: "neutral"
        }
        this.updateID = this.updateID.bind(this);
        this.writeData = this.writeData.bind(this);

        this.app = firebase.initializeApp(DB_CONFIG);
        this.database = this.app.database().ref('/question/');
        this.answers = [];
        this.index = 0;
        this.obj = {};
    }

    componentDidMount(){

        this.database.once('value', s => {
            if(s.val()){
              console.log(s.val());
              //this.snap.push(s.val());
              this.obj = s.val();
              while(s.val() == null){
                this.obj = s.val();
              }


            } else {
              console.log('/whatever/whateverProperty node does not exist!');
            }
          }, function(error) {
            // The Promise was rejected.
            console.log(error);
          });

    }

    updateID(id, em, pid){
        this.setState({IDTest: id})
        if(em) {
            this.setState({emotion: em[0]})
            //console.log(this.state.emotion);
        }else{
            this.setState({emotion: "neutral"});
        }
        console.log(this.index++);
        this.answers.push(pid);
        if(this.index === 9) this.writeData(this.answers);
    }

    dataAccess(answers){
        //this.readData(answers);
        this.writeData(answers);
    }
     writeData(answers){
         console.log('write data');
         let updates = {};
         let val;
         let k;
 //        var users = [];
        for (let i = 0; i < answers.length; i++){
            console.log('i  ' + i + ' y    ' + answers[i])
            console.log(this.obj);
            if (i in this.obj[i] == null){
                val = 1;
            }else{
                val = this.obj[i][answers[i]] +1;
            }

        updates[i + '/' + answers[i]] = val;
        }
        console.log(updates);
        updates['count/'] = this.obj['count'] + 1;
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