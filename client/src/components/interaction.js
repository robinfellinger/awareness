import React, { Component } from 'react';
import data from "./text.json";
import Type from "./type.js";
import firebase from 'firebase';
import {DB_CONFIG} from '../Config';

class Interaction extends Component {

    constructor(props){
        super(props);
        this.state = {
            IDTest: "Start",
            emotion: "neutral",
            mode: "standard",
            index: 0
        }
        this.updateID = this.updateID.bind(this);
        this.writeData = this.writeData.bind(this);
       // this.updateStat = this.updateStat.bind(this);

        this.app = firebase.initializeApp(DB_CONFIG);
        this.database = this.app.database().ref('/question/');
        this.answers = [];
        this.index = 0;
        this.stats = {};
        this.statText = [];
        this.statIndex = 0;
    }

    componentDidMount(){
        this.readData();
    }

    updateID(id, em, pid){
        this.setState({IDTest: id})
        if(em) {
            this.setState({emotion: em[0]})
            //console.log(this.state.emotion);
        }else{
            this.setState({emotion: "neutral"});
        }
        console.log(pid);
        this.answers.push(pid);
        if(pid == 23 || pid == 16 || pid == 24) this.writeData(this.answers);
    }

     writeData(answers){
         console.log('write data');
         let updates = {};
         let val;
        for (let i = 0; i < answers.length; i++){
            console.log('i  ' + i + ' y    ' + answers[i])
            console.log(this.stats);
            if (i in this.stats == null){
                val = 1;
                console.log('nan');
            }else{
                val = this.stats[answers[i]] +1;
            }

        updates[answers[i]] = val;
        }
        console.log(updates);
        updates['count'] = this.stats['count'] + 1;
        this.database.update(updates);
        this.percentage();
     }

     readData(){
        this.database.once('value', s => {
            if(s.val()){
              console.log(s.val());
              this.stats = s.val();
              while(s.val() == null){
                this.stats = s.val();
              }
            } else {
              console.log('/whatever/whateverProperty node does not exist!');
            }
          }, function(error) {
            console.log(error);
          });
     }

     percentage(){
         console.log(this.stats);
         this.statLookup(18, 'andere toilette');
         this.statLookup(17, 'verständnisvoll');
         this.statLookup(5, 'verärgert');

         this.statText.push('sabhduas');


         this.setState({mode: "end2"})
     }

     statLookup(id, text){
        let match = false;
        for (let val of this.answers){
            if (id == val) match = true;
        }
        if (match){
           this.statText.push(`Du und ${Math.round(((this.stats[id] + 1) / (this.stats['count'] + 1)) * 100)} Prozent der Menschen: ${text}`);
        }
     }
     updateStat(){
        this.setState({index: 1});
        
        //this.setState({mode: 'end'});
        console.log(this.state.index)
        //if (this.statIndex > 1){}
     }

    render(){

        if(this.state.mode === 'standard') {
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
        }else if(this.state.mode === 'end'){
            return (
                <div className={"interaction"}>
                    {data.passages
                        .filter(function(data){return data.name === this.state.IDTest ? data : null}, this)
                        .map((question) =>
                            <div className={"interaction-question t-italic"}>
                                    
                                    {this.statText[this.state.index]}
                                    <button  className={"interaction-button text-sm col-sm-8"}
                                                 onClick={() => {
                                                     this.updateStat();
                                                    }}>Weiter</button>
                                                               </div>
                        )
                }
                </div>
            )

        }
    };

}


//<button onClick={() => this.toggleExperience()}>Start Experience</button>

export default Interaction;