import React, { Component } from 'react';
import data from "./text.json";
import Type from "./type.js"



class Interaction extends Component {

    constructor(props){
        super(props);
        this.state = {
            IDTest: "Start",
            isRightQestion: false
        }
        this.updateID = this.updateID.bind(this);
    }

    updateID(id){
        this.setState({IDTest: id})
    }

    updateQest(){
        this.setState({isRightQestion: true});
    }




    /*componentDidUpdate() {
        let centerText = document.getElementsByClassName(".interaction")[0];
        let flexdiv = document.getElementsByClassName("interaction-flex");

        for (let i = 0; i < centerText.childElementCount; i++) {
            // console.log(centerText[i]);
            //console.log(flexdiv[i]);
            if (flexdiv[i] != null && flexdiv[i].innerHTML === "") {
                //console.log(flexdiv[i])
                //centerText[i].removeChild(centerText[i].firstChild);
                //flexdiv[i].parentNode.parentNode.removeChild(centerText[i].firstChild);
            }
        }
        $(".interacion-question .typed-cursor").parent().parent()
    }*/
        /*for(var child=centerText.firstChild; child!==null; child=child.nextSibling) {

            if(centerText.child().eq(2).innerHTML == ""){
                centerText.child().eq(2).remove();
            }
        }*/




    render(){


            return (
            <div className={"interaction"}>

                {data.passages.map((question) =>

                        <span className={"interaction-question t-italic"} key={question.pid}>

                                {question.name === this.state.IDTest && <Type strings={[question.text]}/>}
                                {
                                    (typeof(question.links)=='object')?
                                    question.links.map((subrowdata)=>

                                    <span className={"interaction-flex"} key={subrowdata.pid*Math.random()}>
                                        {question.name === this.state.IDTest &&
                                        <button  className={"interaction-button text-sm col-sm-8"}
                                                 onClick={() => this.updateID(subrowdata.link)}>{subrowdata.name}</button>
                                        }
                                    </span>

                                    )
                                    :null
                                }

                            </span>
                        )

            }
            </div>
        )
    };

}


//<button onClick={() => this.toggleExperience()}>Start Experience</button>

export default Interaction;