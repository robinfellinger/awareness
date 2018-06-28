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
        this. disablePagination();
        
        this.setState({showStatisticPage: false});
        this.moveRope("6rem", "-1rem");
        this.colorNav("white");
    }

    toggleStatisticPage(){
        let body = document.getElementsByTagName("body");
        if (body.length >= 0 && body[0]) {
            // firstTime[0].style.display = "none";
            body[0].className = '';
         }
        this.setState({showGlossarPage: false});
        this.setState({showActivePage: false});
        this.setState({showStatisticPage: true});
        this.moveRope("11rem", "6rem");

    //     let firstTime = document.getElementsByClassName("onepage-pagination");
    //    // console.log(firstTime);

    //     if (firstTime[0] && typeof(firstTime) != 'undefined' && firstTime != null) {
    //         firstTime[0].style.display = "initial";
    //     }

        this.colorNav("#ffffff"); //COLOR CHANGE STATISTIC PAGE
    }

    toggleActivePage(){
        this.setState({showGlossarPage: false});
        this.setState({showActivePage: true});
        this.disablePagination();
        this.setState({showStatisticPage: false});
        
        this.moveRope("13rem", "18rem");
        this.colorNav("#4F4F4F");
    }

    toggleGlossarPage(){
        this.setState({showGlossarPage: true});
        this.setState({showActivePage: false});
        this.disablePagination();
        this.setState({showStatisticPage: false});
        
        this.moveRope("9rem", "32rem");
        this.colorNav("#4F4F4F");
    }

    disablePagination() {
        let firstTime = document.getElementsByClassName("onepage-pagination");
        let firstTime2 = document.getElementsByClassName("onePageScript");
        let body = document.getElementsByTagName("body");
        let active = document.getElementsByTagName("active");
        let stats = document.getElementsByClassName("container-statistics");
        

        if (firstTime.length >= 0 && firstTime[0]) {
           firstTime[0].remove();
        }

        if (firstTime2.length >= 0 && firstTime2[0]) {
            firstTime2[0].remove();
         }

         
        if (body.length >= 0 && body[0]) {
            body[0].className = '';
         }

         if (active.length >= 0 && active[0]) {
            active[0].classList.remove("active");
         }

         if (stats.length >= 0 && stats[0]) {
            stats[0].className = 'container-statistics';
            stats[0].style = '';
         }
    }

    moveRope(width, left) {
        let underbar = document.getElementsByClassName("underbar");
       
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

                <div className={" pos-absolute accesslinks__line-pos"} style={{"z-index": "150"}}>
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