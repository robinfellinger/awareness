import React, { Component } from 'react';
import data from "./glossar.json";




class Page_glossary extends Component {



    render(){
        const test = data.name;
        const yep = "binder";

        return(
            /* <SectionBlack title={"Title der section"} content={}>*/
            <section class="header ops-section test" data-index="1">
            <h2 class="header__titel">transgender <span class="header__titel--highlight">Glossar</span></h2>
            <a href="/" class="header__link">zurück</a>


                <div>
                    {
                        data.glossar.map((dynamicT, i) =>
                            <div>
                                <b className="GlossarWord" >{dynamicT.word}: &nbsp;<br /></b>

                                <span className="GlossarDescription" >{dynamicT.description}</span>
                            </div>
                        )


                    }
                </div>
            </section>
        );
    }
}
export default Page_glossary;