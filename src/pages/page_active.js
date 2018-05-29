import React, { Component } from 'react';




class Page_active extends Component {


    render(){
        return(
            /* <SectionBlack title={"Title der section"} content={}>*/
            <section class="header ops-section test" data-index="1">
            <h2 class="header__titel">werde <span class="header__titel--highlight">Aktiv</span></h2>
            <a href="/" class="header__link">zurück</a>
            </section>
        );
    }
}
export default Page_active;