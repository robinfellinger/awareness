import React, { Component } from 'react';
import data from "./text.json";
import Type from "./type.js"



class Interaction extends Component {

    constructor(props){
        super(props);
        this.state = {
            IDTest: "Start",
        }
        this.updateID = this.updateID.bind(this);
    }

    updateID(id){
        this.setState({IDTest: id})
    }

    componentDidUpdate() {
        let centerText = document.getElementsByClassName("interaction")[0];
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
    }
        /*for(var child=centerText.firstChild; child!==null; child=child.nextSibling) {

            if(centerText.child().eq(2).innerHTML == ""){
                centerText.child().eq(2).remove();
            }
        }*/




    render() {
        //const question = data.passages.map(function(data){data});
        return (
            <div className={"interaction"}>
                {data.passages.map((rowdata) =>

                            <div className={"interaction-question t-italic"} key={rowdata.pid}>

                                {rowdata.name === this.state.IDTest && <Type strings={[rowdata.text]}/>}
                                {
                                    (typeof(rowdata.links)=='object')?
                                    rowdata.links.map((subrowdata)=>

                                    <div className={"interaction-flex"} key={subrowdata.pid*Math.random()}>
                                        {rowdata.name === this.state.IDTest &&
                                        <button  className={"interaction-button text-sm col-sm-8"}
                                                 onClick={() => this.updateID(subrowdata.link)}>{subrowdata.name}</button>
                                        }
                                    </div>

                                    )
                                    :null
                                }

                            </div>
                        )
            }
            </div>
        )
    };
}


//<button onClick={() => this.toggleExperience()}>Start Experience</button>

export default Interaction;