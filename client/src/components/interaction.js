import React, { Component } from 'react';
import data from "./text.json";
import Type from "./type.js";
import firebase from 'firebase';
import {DB_CONFIG} from '../Config';

class Interaction extends Component {

    constructor(props){
        super(props);
        this.state = {
            IDTest: "Hallo, ich bin Leo",
            emotion: "neutral",
            chat: [],
            finished: false,
            mode: "standard"
        };
        this.update = this.update.bind(this);
        //this.writeData = this.writeData.bind(this);
        this.app = firebase.initializeApp(DB_CONFIG);
        this.database = this.app.database().ref('/question/');
        this.answers = [];
        this.index = 0;
        this.stats = {};
        this.statText = [];
        this.statIndex = 0;
    }

    myCallback = (dataFromChild) => {
            this.state.chat.push({'answer': null, 'question':dataFromChild});
            this.state.finished = true;
    };

    update(pid, id, em,  answer, question){
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


        console.log(pid)
        console.log(pid == 30 || pid == 29 || pid === 31);
        this.answers.push(pid);
        if(pid == 30 || pid == 29 || pid == 31) this.writeData(this.answers);
    }

    
    updateStat(answer, question){

            this.state.chat.push({'answer': answer, 'question':question});
            this.state.finished = true;
            this.statIndex++;
            console.log(this.statIndex  + '  ' + this.statText.length)
            if (this.statIndex  == this.statText.length){
                this.setState({mode: 'standard'});
                console.log('state changed')
            }
        
    }

    componentDidUpdate(){
        if(this.state.finished) {
            let elem = document.getElementById("chatrunning");
            elem.scrollTop = elem.scrollHeight;
            this.state.finished = false;
        }

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
        this.setState({model: 'end'});
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
        console.log('percentage');
        this.statLookup(5, 'Menschen haben gefragt, warum ich nicht einfach eine andere Toilette nehme');
        this.statLookup(6, 'Menschen, zeigten sich verständnisvoll für meine Lage ');
        this.statLookup(7, 'Menschen konnten es nicht fassen, dass ich heutzutage noch diskriminiert werde');

        this.statLookup(11, 'Leute meinten, dass Transgender sein oft nur eine Phase sei');
        this.statLookup(10, 'Leute wollten wissen, ob ich mich wohler in der Rolle eines anderen Geschlechts fühle');

        this.statLookup(29, 'Teilnehmer finden, dass dieses Thema wichtig sei');
        this.statLookup(30, 'Teilnehmer finden, dass Transgender zu sein seltsam sei');
        this.statLookup(31, 'Teilnehmer zeigten Interesse an der Thematik');
        this.setState({mode: "end"})
        console.log(this.statText);
    }

    statLookup(id, text){
        console.log(this.answers[3])
       console.log(id);
       let match = false;
       for (let val of this.answers){
           console.log(val)
           if (id == val) match = true;
       }
       if (match){
          this.statText.push(`Du und ${Math.round(((this.stats[id] + 1) / (this.stats['count'] + 1)) * 100)} Prozent der ${text}`);
       }
    }
    componentDidMount(){
        this.readData();
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
                                         onClick={() => this.update(subrowdata.pid, subrowdata.link, question.tags, subrowdata.name, question.text.split("\n\n")[0])}>{subrowdata.name}</button>
                                }
                            </p>
                            )
                            :null
                        }
                        {this.state.mode == 'end' && <button  className={"interaction-button text-sm"}
                                         onClick={() => this.updateStat(null,this.statText[this.statIndex])}>Weiter</button>}
                        </div>

                        </div>
                    )
            }
            </div>
        )
    };

}


//<button onClick={() => this.toggleExperience()}>Start Experience</button>

export default Interaction;