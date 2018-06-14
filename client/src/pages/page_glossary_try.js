import React, { Component } from 'react';
import data from "./glossar.json";




class Page_glossary extends Component {

    constructor(props){
        super(props)
        this.state = { show : true};
        this.toggleDiv = this.toggleDiv.bind(this)
    }

    toggleDiv = () => {
        const { show } = this.state;
        this.setState({ show: !show})
    }

    render(){



        return(

            /* <SectionBlack title={"Title der section"} content={}>*/

            <section className="glossarPage">

                <div className="headerGloss">
            <section class="header ops-section test" data-index="1">
               <a href="/" class="header__link">zurück</a>

            <h2 class="header__titel">transgender <span class="header__titel--highlight">Glossar</span></h2>
                <toggle />
            </section>
</div>


                <div>
                    {
                        data.glossar.map((dynamicT, i) =>
                            <section className="glossary">
                                <b className="glossary__glossarWord" >{dynamicT.word}   <button className="glossary__button" id={dynamicT.id} onClick={ () => this.toggleDes(dynamicT.id) }><img className="glossary__image" src={require('./arrow.png')} alt="Drop Down" height="9" width="9"></img></button></b>


                                <div className="glossary__glossarDescription" style={{display: "none"}}> {dynamicT.description} </div>
                                {console.log(this.state.show)}


                            </section>
                        )


                    }
                </div>





                <div>

                    {
                        data.glossar.map((dynamicT, i) =>
                            <section className="glossary">
                                {dynamicT.id % 2 == 0 &&

                                <div className="glossary__glossarWord" >{dynamicT.word}   <button className="glossary__button" id={dynamicT.id} onClick={ () => this.toggleDes(dynamicT.id) }><img className="glossary__image" src={require('./arrow.png')} alt="Drop Down" height="9" width="9"></img></button></div>
                                }
                                {dynamicT.id % 2 == 0 &&

                                <div className="glossary__glossarDescription" style={{display: "none"}}> {dynamicT.description} </div>
                                }
                                {dynamicT.id % 2 == 1 &&

                                <div className="glossary__glossarWord1" >{dynamicT.word}   <button className="glossary__button" id={dynamicT.id} onClick={ () => this.toggleDes(dynamicT.id) }><img className="glossary__image" src={require('./arrow.png')} alt="Drop Down" height="9" width="9"></img></button></div>
                                }
                                {dynamicT.id % 2 == 1 &&

                                <div className="glossary__glossarDescription1" style={{display: "none"}}> {dynamicT.description} </div>
                                }

                                {console.log(this.state.show)}


                            </section>
                        )


                    }






                    <Column flexGrow={1}>
                        <Row horizontal='center'>
                            <h1>HEADER</h1>
                        </Row>

                        <Row vertical='center'>

                            <Column flexGrow={1} horizontal='center'>

                                <h3>hallo </h3>
                                <span> du </span>
                            </Column>

                            <Column flexGrow={1} horizontal='center'>

                                <h3>bye </h3>
                                <span> you </span>
                            </Column>

                            <Column flexGrow={1} horizontal='center'>
                                <h3> Column 2 </h3>
                                <span> column 2 content </span>
                            </Column>
                        </Row>
                    </Column>






                    {
                        duo.glossar.map((dynamicT1) =>

                            <section className="glossary">


                                <div className="glossary__glossarWord">{dynamicT1.word} <button className="glossary__button" id={dynamicT1.id} onClick={ () => this.toggleDes(dynamicT1.id) }><img className="glossary__image" src={require('./arrow.png')} alt="Drop Down" height="9" width="9"></img></button></div>

                                <div className="glossary__glossarDescription" style={{display: "none"}}> {dynamicT1.description} </div>

                                {console.log(this.state.show)}


                            </section>
                        )
                    }
                    {
                        uno.glossar.map((dynamicT2) =>
                            <section className="glossary">


                                <div className="glossary__glossarWord1" >{dynamicT2.word}   <button className="glossary__button1" id={dynamicT2.id} onClick={ () => this.toggleDes(dynamicT2.id) }><img className="glossary__image1" src={require('./arrow.png')} alt="Drop Down" height="9" width="9"></img></button></div>

                                <div className="glossary__glossarDescription1" style={{display: "none"}}> {dynamicT2.description} </div>

                                {console.log(this.state.show)}


                            </section>
                        )

                    }



                </div>


                </section>
        );
    }
}

class Box extends Component{
    render(){
        return (
            <div>
                {
                    data.glossar.map((dynamicT, i) =>
                        <section className="glossary ops-section">

                            <span className="glossary__glossarDescription" >{dynamicT.description}</span>

                        </section>
                    )


                }
            </div>

        )

    }
}

export default Page_glossary;
