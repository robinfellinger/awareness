import React, { Component } from 'react';
import data from "./glossar.json";
import final from "./glossar3.json";
// import { Column, Row } from 'simple-flexbox';
import { Link } from 'react-router-dom';

import ue1 from "./glossarUE1.json";
import ue2 from "./glossarUE2.json";




class Page_glossary extends Component {

    constructor(props){
        super()
        this.state = { widthS: 200, heightS: 200};
        this.toggleDes = this.toggleDes.bind(this)
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    toggleDes (id) {
        this.setState({ show: !this.state.show})
        const tryIt = document.getElementById(id);

        console.log(tryIt);

        if(tryIt.parentNode.nextElementSibling.style.display === "none"){
            tryIt.parentNode.nextElementSibling.style.display = "block";
            tryIt.style.transform = "rotate(180deg)";
        } else {
            tryIt.parentNode.nextElementSibling.style.display = "none";
            tryIt.style.transform = "rotate(0deg)";
        }


    }




    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions.bind(this));
    }

    componentWillMount() {
        window.removeEventListener("resize", this.updateWindowDimensions.bind(this));
    }

    updateWindowDimensions() {
        this.setState({ widthS: window.innerWidth, heightS: window.innerHeight+5 });
    }


    render(){
        return(
            /* <SectionBlack title={"Title der section"} content={}>*/



                <div class="container-glossar2" style={{width: this.state.widthS, height: this.state.heightS}}>
                    <section className="glossarPage" style={{width: this.state.widthS, height: this.state.heightS}}>
                    <h2 class="header__titel"> <span class="header__titel--highlight"></span></h2>


    <section className="glossarHeader" data-index="1">

            { console.log(this.state.heightS)}

        <h2 className="header__glossar"> Glossar </h2>

        </section>
        <div className={"pos-absolute accesslinks__line-pos"}>

            </div>

                           <div id="einzug2">
                               <div  className="glossary4">
                                   <div className="glossar_ue"> TRANSKULTUR </div>
                                   <div className="glossar_ueDes">das ist jetzt eine probe das ist jetzt eine probe das ist jetzt eine probe das ist jetzt eine probe das ist jetzt eine probe das ist jetzt eine probe das ist jetzt eine probe </div>


                                   <section className="glossar_test">
                                               {
                                                   ue1.UE1.map((dynamicT, i) =>

                                                   <div className="glossar_box"><b className="glossary__glossarWord4" style={{order: dynamicT.id}}> {dynamicT.word} </b>
                                                   <div className="glossary__glossarDescription4" style={{order: dynamicT.id}}> {dynamicT.description} </div></div>


                                                   )
                                               }

                                   </section>

                               </div>
                         </div>







    </section>
    </div>

    );
    }


    }



    export default Page_glossary;


