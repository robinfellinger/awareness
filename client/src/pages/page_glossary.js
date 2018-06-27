import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import ue1 from "./glossarUE1.json";
import ue2 from "./glossarUE2.json";
import ScrollAnimation from 'react-animate-on-scroll';


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

        <h2 className="header__glossar"> GLOSSAR </h2>


        <div className={"pos-absolute accesslinks__line-pos"}>

            </div>

                           <div id="einzug2">
                               <div  className="glossary4">
                                   <div className="glossar_ueT"> TRANSGENDER </div>
                                   <div className="glossar_ueDesT">Transgender Menschen, überschreiten die sozialen Geschlechtsgrenzen (Gender). Ein  Geschlechtswechsel innerhalb des binären Geschlchtsmodells (Mann oder Frau) kann temporär aber auch permanent sein. Es kann aber auch bedeuten, dass eine Person sich in beiden Geschlechtern oder mit keinem der beiden Geschlechter identifiziert. </div>


                                   <section className="glossar_testT">
                                               {
                                                   ue1.Transgender.map((dynamicT, i) =>

                                                   <div className="glossar_box"><b className="glossary__glossarWord4" style={{order: dynamicT.id}}><a name={dynamicT.word}></a> {dynamicT.word} </b>
                                                   <div className="glossary__glossarDescription4" style={{order: dynamicT.id}}> {dynamicT.description} </div></div>


                                                   )
                                               }


                                   </section>



                                   <div className="glossar_ueG"> GESCHLECHT & GENDER </div>

                                   <div className="glossar_ueDesG">In der englischen Sprache wird seit Jahrhunderten zwischen biologischem Geschlecht (Sex) und grammatischem Geschlecht (Gender) unterschieden. Gender bezeichnet die Geschlechtsidentität sowie die Geschlechterrollen und mit Sex das biologische Geschlecht. </div>


                                   <section className="glossar_testG">
                                       {
                                           ue1.Geschlecht.map((dynamicT, i) =>

                                               <div className="glossar_box"><b className="glossary__glossarWord4" style={{order: dynamicT.id}}><a name={dynamicT.word}></a>  {dynamicT.word} </b>
                                                   <div className="glossary__glossarDescription4" style={{order: dynamicT.id}}> {dynamicT.description} </div></div>


                                           )
                                       }


                                   </section>


                                   <div className="glossar_ueA"> ÄUßERES ERSCHEINUNGSBILD </div>

                                   <div className="glossar_ueDesA">Auch die äußere Erscheinung eines Menschen gehört zur Körpersprache und stellt damit einen Teilbereich der nonverbalen Kommunikation dar. Dazu gehören sämtliche Unterkategorien wie Kleidung, Abzeichen, Schmuck, Körperbau, Haar und Haut. </div>


                                   <section className="glossar_testA">
                                       {
                                           ue1.Erscheinungsbild.map((dynamicT, i) =>

                                               <div className="glossar_box"><b className="glossary__glossarWord4" style={{order: dynamicT.id}}><a name={dynamicT.word}></a> {dynamicT.word} </b>
                                                   <div className="glossary__glossarDescription4" style={{order: dynamicT.id}}> {dynamicT.description} </div></div>


                                           )
                                       }


                                   </section>



                                   <div className="glossar_ueL"> LSBTQI* </div>

                                   <div className="glossar_ueDesL">Ist die Abkürzung für Lesben, Schwule, Bisexuelle, Trans*, Queer und Inter*. Auch bekannt unter LGBTQI* - Lesbian, Gay, Bi*, Trans*, Queer, Inter*.</div>


                                   <section className="glossar_testL">
                                       {
                                           ue1.LSBTQI.map((dynamicT, i) =>

                                               <div className="glossar_box"><b className="glossary__glossarWord4" style={{order: dynamicT.id}}><a name={dynamicT.word}></a> {dynamicT.word} </b>
                                                   <div className="glossary__glossarDescription4" style={{order: dynamicT.id}}> {dynamicT.description} </div></div>


                                           )
                                       }


                                   </section>




                                   <div className="glossar_ueE"> EINFLÜSSE DES UMFELDES </div>

                                   <div className="glossar_ueDesE">Einflüsse, die aus dem sozialen Umfeld heraus (vor allem aus der Kernfamilie) auf die Entwicklung und Ausprägung der betroffenen Psyche einwirken können.</div>


                                   <section className="glossar_testE">
                                       {
                                           ue1.Einfluesse.map((dynamicT, i) =>

                                               <div className="glossar_box"><b className="glossary__glossarWord4" style={{order: dynamicT.id}}><a name={dynamicT.word}></a> {dynamicT.word} </b>
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


