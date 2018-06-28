import React, { Component } from 'react';
import data from "./glossar.json";
import duo from "./glossar1.json";
import uno from "./glossar2.json";
import final from "./glossar3.json";
import { Column, Row } from 'simple-flexbox';
import { Link } from 'react-router-dom';




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

                        <h2 className="header__titel"> <span className="header__titel--highlight"></span></h2>

                    </section>
                    <div className={"pos-absolute accesslinks__line-pos"}>

                    </div>

                    <div id="einzug2">
                        {
                            final.glossar.map((dynamicT, i) =>
                                <section className="glossary2">
                                    <b className="glossary__glossarWord2" >{dynamicT.word}   <button className="glossary__button2" id={dynamicT.id} onClick={ () => this.toggleDes(dynamicT.id) }><img className="glossary__image2" src={require('./arrow.png')} alt="Drop Down" height="9" width="9"></img></button></b>

                                    <div className="glossary__glossarDescription2" style={{display: "none"}}> {dynamicT.description} </div>


                                    <b className="glossary__glossarWord3" >{dynamicT.word1}   <button className="glossary__button3" id={dynamicT.id1} onClick={ () => this.toggleDes(dynamicT.id1) }><img className="glossary__image3" src={require('./arrow.png')} alt="Drop Down" height="9" width="9"></img></button></b>

                                    <div className="glossary__glossarDescription3" style={{display: "none"}}> {dynamicT.description1} </div>


                                    {console.log(this.state.show)}



                                </section>
                            )


                        }
                    </div>







                </section>
            </div>

        );
    }


}



export default Page_glossary;


