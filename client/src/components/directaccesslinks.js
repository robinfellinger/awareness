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

    showChat(){
        this.setState({showGlossarPage: false});
        this.setState({showActivePage: false});
        this.setState({showStatisticPage: false});
        this. disablePagination();
        this.moveRope("6rem", "-1rem");
        this.colorNav("white");
    }

    toggleStatisticPage(){
        this.setState({showGlossarPage: false});
        this.setState({showActivePage: false});
        this.setState({showStatisticPage: true});
        this.moveRope("11rem", "6rem");

        let firstTime = document.getElementsByClassName("onepage-pagination");
       // console.log(firstTime);

        if (firstTime[0] && typeof(firstTime) != 'undefined' && firstTime != null) {
            firstTime[0].style.display = "initial";
        }

        this.colorNav("#4F4F4F");
    }

    toggleActivePage(){
        this.setState({showGlossarPage: false});
        this.setState({showActivePage: true});
        this.setState({showStatisticPage: false});
        this.disablePagination();
        this.moveRope("13rem", "18rem");
        this.colorNav("#4F4F4F");
    }

    toggleGlossarPage(){
        this.setState({showGlossarPage: true});
        this.setState({showActivePage: false});
        this.setState({showStatisticPage: false});
        this.disablePagination();
        this.moveRope("9rem", "32rem");
        this.colorNav("#4F4F4F");
    }

    disablePagination() {
        let firstTime = document.getElementsByClassName("onepage-pagination");
        console.log(firstTime);

        if (firstTime.length >= 0 && firstTime[0]) {
            firstTime[0].style.display = "none";
        }
    }

    moveRope(width, left) {
        let underbar = document.getElementsByClassName("underbar");
        console.log(underbar);
        underbar[0].style.width = width;
        underbar[0].style.left = left;
        
    }

    colorNav(farbe) {
        let nav = document.getElementsByClassName("a-startAnim");
        let underbar = document.getElementsByClassName("underbar");

        if (nav[0] && nav[1] && nav[2] && nav[3] && underbar[0] ) {
            for(let i = 0; i < 4; i++) {
                nav[i].style.color = farbe;
            }
            underbar[0].style.background = farbe;
        
        }
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
                           <button className={"btn-text text-sm a-sm a-startAnim"} onClick={() => this.showChat()}>chat</button>
                        <button className={"btn-text text-sm a-sm a-startAnim"} onClick={() => this.toggleStatisticPage()}>infopage</button>
                        <button className={"btn-text text-sm a-sm a-startAnim"} id={"getActive"} onClick={() => this.toggleActivePage()}>werde aktiv</button>
                        <button className={"btn-text text-sm a-sm a-startAnim"} onClick={() => this.toggleGlossarPage()}>glossar</button>
                        <div class="underbar"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AccessLinks;