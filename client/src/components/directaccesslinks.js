import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page_statistics from "../pages/page_statistics"
import Page_active from "../pages/page_active"
import Page_glossar from "../pages/page_glossary"
class AccessLinks extends Component {
    constructor(){
        super();
        this.state = {
            showStatisticPage: false,
            showActivePage: false,
            showGlossarPage: false,
        }
    }

    toggleStatisticPage(){
        this.state.showStatisticPage == false ? this.setState({showStatisticPage: true}) : this.setState({showStatisticPage: false});
    }

    toggleActivePage(){
        this.state.showActivePage == false ? this.setState({showActivePage: true}) : this.setState({showActivePage: false});
    }

    toggleGlossarPage(){
        this.state.showGlossarPage == false ? this.setState({showGlossarPage: true}) : this.setState({showGlossarPage: false});
    }

    render(){
        return (
            <div>
              <div className={"container-statistics"}>
                    {this.state.showStatisticPage &&
                        <Page_statistics></Page_statistics>
                    }
               </div>

                 <div className={"container-active"}>
                    {this.state.showActivePage &&
                        <Page_active></Page_active>
                    }
                 </div>

                <div className={"container-glossar"}>
                    {this.state.showGlossarPage &&
                        <Page_glossar></Page_glossar>
                    }
                 </div>

                <div className={" pos-absolute accesslinks__line-pos"} style={{"z-index": "50"}}>
                    <svg className="margin-line" width="100%" height="5">
                        <line className={"accesslinks__line"} x1="0" y1="0" x2="100%" y2="0"
                            strokeWidth="3px" stroke="white"/>
                    </svg>
                    <div className={"accesslinks_pos"}>
                
                        <button className={"btn-text text-sm a-sm a-startAnim"} onClick={() => this.toggleStatisticPage()}>infopage</button>
                        <button className={"btn-text text-sm a-sm a-startAnim"} onClick={() => this.toggleActivePage()}>werde aktiv</button>
                        <button className={"btn-text text-sm a-sm a-startAnim"} onClick={() => this.toggleGlossarPage()}>glossar</button>
                        <div class="underbar"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AccessLinks;