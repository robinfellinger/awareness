import React, { Component } from 'react';

let page = 1;


class Page_statistics extends Component {
    render(){
        const trans_in_oe = [
            "trans in ", "österreich", 
            "Durch die sich immer weiter verbesserten Rechtslage sowie der zunehmende Präsenz von Transgender-Frauen und -Männern in den Medien, trauen sicher immer mehr Transgender sich zu outen.",
            
        ];
        const psychische_krankheit = [
            "Transgender als", "“psychische” Krankheit?", 
            "Bislang wurde Transsexualität offiziell als eine psychische Erkrankung eingestuft. Die Weltgesundheitsorganisation hat jedoch beschlossen, den internationalen Katalog der Krankheiten und psychischen Störungen zu ändern – ein Dokument, das mehr als 70 Prozent aller Psychiater weltweit als Richtlinie für ihre alltägliche Arbeit nutzen. In der sogenannten ICD-11, die 2018 erscheinen soll, wird Transsexualität nicht mehr als psychische Störung pathologisiert.",
        ];
        const bedeutung = [
            "Was bedeutet es Transgender zu sein?",
            "Du bist als Mädchen geboren, aber fühlst dich wie ein Junge? Oder anders rum? Wer transsexuell ist, hat das Gefühl, im falschen Körper zu leben. Das biologische Geschlecht ist also ein anderes, als das empfundene oder gewünschte Geschlecht. Mit Schwul sein hat das aber nur selten was zu tun. Ein Junge, der sich dem weiblichen Geschlecht zugehörig fühlt, geht eine Beziehung mit einem anderen Jungen nicht als Schwuler ein, sondern als Frau. ",
            "Doch es gibt auch unter Transgendern Homosexualität, das heißt Jungen, die sich dem weiblichen Geschlecht zugehörig fühlen und sich sexuell dennoch zu Frauen hingezogen fühlen."
        ];
        const medizinische_u = [
            "Medizinische Unterstützung",
            "In Österreich werden aktuell die meisten notwendigen Behandlungen zur Umwandlung durch die gesetzlichen Krankenversicherungen bezahlt, weil der Transsexualität dann Krankheitswert zukommt, wenn die innere Spannung zwischen dem körperlichen Geschlecht und der seelischen Identifizierung mit dem anderen Geschlecht so ausgeprägt ist, dass nur durch die Beseitigung dieser Spannung schwere Symptome psychischer Krankheiten behoben oder gelindert werden.",
            "Wichtig ist jedoch zu betonen, dass nicht alle Transgender-Personen jeden dieser Schritte gehen wollen oder müssen. Mit Unterstützung der behandelnden Ärztinnen und Ärzte sowie Therapeutinnen und Therapeuten gilt es herauszufinden, welche Behandlungen konkret in einer bestimmten Lebensphase individuell gewünscht und sinnvoll sind."
        ];
        const diskriminierung = [
            "Diskriminierung",
            "Transgender Personen sind häufig Verletzungen ihrer Grundrechte wie Diskriminierung, Gewalt und Belästigung ausgesetzt, und zwar in einem weit höheren Maß, als dies von anderen Personen in der LGBT Community angegeben wird. Solche Erfahrungen bewirken ständige Angstgefühle und haben oft starke Depressionen und andere psychische Erkrankungen zur folge.",
            <div class="gradient__statistic">
                <p><span>54%</span><br />werden diskriminiert weil sie als "Trans" wahrgenommen werden</p>
                <p><span>78%</span><br />trauen sich nicht, sich während der Schulzeit zu outen</p>
                <p><span>37%</span><br />fühlten sich bei der Arbeitssuche diskriminiert</p>
                <p><span>60%</span><br />der Personen melden Vorfälle von diskriminierung nicht</p>
            </div>,
        ];
        
        return(
            <section class="statistics-container">
                <SectionWhite title={trans_in_oe[0]} span={trans_in_oe[1]} text={trans_in_oe[2]} />
                <SectionBlack title={bedeutung[0]} text_1={bedeutung[1]} text_2={bedeutung[2]} />
                <SectionGradient title={diskriminierung[0]} text_1={diskriminierung[1]} extra={diskriminierung[2]} />
                <SectionWhite title={psychische_krankheit[0]} span={psychische_krankheit[1]} text={psychische_krankheit[2]} />
                <SectionBlack title={medizinische_u[0]} text_1={medizinische_u[1]} text_2={medizinische_u[2]} />
            </section>
        );
    }
}

const SectionWhite = (props) => {
    return (
        <section class="white">
            <h2 class="white__titel">{props.title}<span class="white__titel--highlight">{props.span}</span></h2>
            <p class="white__content">{props.text}</p>
            <a href="http://www.hosilinz.at" class="white__link">hosilinz.at</a>
        </section>
    )
}

const SectionBlack = (props) => {
    return (
        <section class="black">
            <p class="navigation">navigation <span>01/04</span></p>
            <h2 class="black__titel">{props.title}</h2>
            <p class="black__text black__text--1">{props.text_1}</p>
            <p class="black__text black__text--2">{props.text_2}</p>
        </section>
    )
}

const SectionGradient = (props) => {
    return (
        <section class="gradient">
            <p class="navigation">navigation <span>02/04</span></p>
            <h2 class="gradient__titel">{props.title}</h2>
            <p class="gradient__text">{props.text_1}</p>
            {props.extra}
        </section>
    )
}

export default Page_statistics;