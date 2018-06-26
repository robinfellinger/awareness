import React, { Component } from 'react';
import data from "./organisationen.json";



class Page_active extends Component {

    constructor(props){
        super()
        this.state = { widthS: 200, heightS: 200};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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
            <div className="container-aktiv2" style={{width: this.state.widthS, height: this.state.heightS}}>
                <section className="aktivPage" style={{width: this.state.widthS, height: this.state.heightS}}>
                    <h2 className="header__aktiv"> WEITERFÜHRENDE LINKS </h2>

                        <div className={"pos-absolute accesslinks__line-pos"}>

                        </div>

                        <div id="einzug2">

                            {
                                data.glossar.map((dynamicT, i) =>
                                <section className="aktiv">
                                <div className="aktiv__circle"></div>
                                        <b className="aktiv_name" >{dynamicT.organisation} <hr className="aktiv_line" style={{backgroundColor: "#2F80ED", border: "none", width: "20px", height: "1px", marginTop: "10px"}}></hr> <div className="aktiv_ort"> {dynamicT.ort}</div></b>
                                        <div className="aktiv_description" > {dynamicT.beschreibung}</div>

                                        <a className="aktiv_link" target="_blank" href={dynamicT.link}> {dynamicT.link} </a>
                                    </section>
                                )


                            }
                        </div>





                   </section>
            </div>
        );
    }
}
export default Page_active;