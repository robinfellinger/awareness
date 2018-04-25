import React, { Component } from 'react';




class Page_statistics extends Component {


    render(){
        return(


            /* <SectionBlack title={"Title der section"} content={}>*/
            <section class="statistics-container">
            <section class="trans-in-oe">
                <h2 class="trans-in-oe__text--titel">trans in <span class="trans-in-oe__text--titel__highlight">österreich</span>
                </h2>
                <p class="trans-in-oe__text--content">Durch die sich immer weiter verbesserten Rechtslage sowie der zunehmende Präsenz von Transgender&#8209;Frauen
                    und &#8209;Männern in den Medien, trauen sicher immer mehr Transgender sich zu outen.
                </p>
                <a href="http://www.hosilinz.at" class="trans-in-oe__text--link">hosilinz.at</a>
            </section>
    
            <section class="bedeutung-trans">
                <h2 class="bedeutung-trans__titel">Was bedeutet es Transgender zu sein?</h2>
                <p class="bedeutung-trans__text--1">
                    Du bist als Mädchen geboren, aber fühlst dich wie ein Junge? Oder anders rum? Wer transsexuell ist, hat das Gefühl, im falschen
                    Körper zu leben. Das biologische Geschlecht ist also ein anderes, als das empfundene oder gewünschte Geschlecht.
                    Mit Schwul sein hat das aber nur selten was zu tun. Ein Junge, der sich dem weiblichen Geschlecht zugehörig
                    fühlt, geht eine Beziehung mit einem anderen Jungen nicht als Schwuler ein, sondern als Frau. </p>
                <p class="bedeutung-trans__text--2">
                    Doch es gibt auch unter Transgendern Homosexualität, das heißt Jungen, die sich dem weiblichen Geschlecht zugehörig fühlen
                    und sich sexuell dennoch zu Frauen hingezogen fühlen.
                </p>
            </section>
            
        </section>
        );
    }
}
export default Page_statistics;