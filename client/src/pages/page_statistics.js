import React, { Component } from 'react';




class Page_statistics extends Component {


    render(){
        return(


            /* <SectionBlack title={"Title der section"} content={}>*/
            <section class="statistics-container">

                <section class="trans-in-oe">
                    <h2 class="trans-in-oe__text--titel">trans in
                    <span class="trans-in-oe__text--titel__highlight">österreich</span>
                    </h2>
                    <p class="trans-in-oe__text--content">Durch die sich immer weiter verbesserten Rechtslage sowie der zunehmende Präsenz von Transgender&#8209;Frauen
                        und &#8209;Männern in den Medien, trauen sicher immer mehr Transgender sich zu outen.
                </p>
                    <a href="http://www.hosilinz.at" class="trans-in-oe__text--link">hosilinz.at</a>
                </section>

                <section class="bedeutung-trans">
                <p class="navigation">navigation <span>01/04</span></p>
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
                <section class="diskriminierung">
                <p class="navigation">navigation <span>02/04</span></p>
                    <h2 class="diskriminierung__titel">Diskriminierung</h2>
                    <p class="diskriminierung__text">Transgender Personen sind häufig Verletzungen ihrer Grundrechte wie Diskriminierung, Gewalt und Belästigung ausgesetzt,
                        und zwar in einem weit höheren Maß, als dies von anderen Personen in der LGBT Community angegeben wird. Solche
                        Erfahrungen bewirken ständige Angstgefühle und haben oft starke Depressionen und andere psychische Erkrankungen
                        zur folge.
                </p>
                    <div class="diskriminierung__statistic">
                        <p><span>54%</span><br />werden diskriminiert weil sie als "Trans" wahrgenommen werden</p>
                            <p><span>78%</span><br />trauen sich nicht, sich während der Schulzeit zu outen</p>
                                <p><span>37%</span><br />fühlten sich bei der Arbeitssuche diskriminiert</p>
                                    <p><span>60%</span><br />der Personen melden Vorfälle von diskriminierung nicht</p> </div>
                    
                </section>
    
    
        </section>
        );
    }
}
export default Page_statistics;