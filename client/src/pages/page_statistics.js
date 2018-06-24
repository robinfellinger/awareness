import React, { Component } from 'react';


class Page_statistics extends Component {

    constructor(props){
        super(props);  
    }

    componentDidMount () {

        let firstTime = document.getElementsByClassName("onepage-pagination");
        console.log(firstTime);

        if (firstTime.length <= 0) {

            const script2 = document.createElement("script");

            script2.innerHTML = 'onePageScroll(".container-statistics", {sectionContainer: "section", easing: "ease", animationTime: 1000, pagination: true,'
            script2.innerHTML += ' updateURL: false, beforeMove: function(index) {}, afterMove: function(index) {if (document.getElementById("numbers").classList.contains("active")) {animateValue("#percent1", 500); animateValue("#percent2", 1000);animateValue("#percent3", 1500); animateValue("#percent4", 2000);}';
            script2.innerHTML += '}, loop: false, keyboard: true,  responsiveFallback: false      });';
            
            script2.async = true;

            document.body.appendChild(script2);
        }
    }

    clickFunction() {
        console.log("Hi34");
        document.getElementById("getActive").click();
    }

    render(){
        const trans_in_oe = [
            "trans", " in österreich", 
            "In den Medien ist die Thematik Transgender und Transidentität in den letzten Jahren immer präsenter geworden. Doch existieren weiterhin Informationsdefizite, sowie allgemeine Vorurteile, um die es sich zu kümmern gilt.",
            "Aus interpretationen von mehreren Statistiken, wird das Verhältnis der Transfrauen mit einer von 1.000 geschätzt. Das Verhältnis der Transmänner wird auf einen von 2.000 geschätzt. Viele Trans*-Menschen leben allerdings in der Anonymität und können deshalb von Statistiken nicht erfasst werden.",
            
        ];
        const psychische_krankheit = [
            "Transgender als", "“psychische” Krankheit?", 
            "Bislang wurde Transsexualität offiziell als eine psychische Erkrankung eingestuft. Die Weltgesundheitsorganisation hat jedoch beschlossen, den internationalen Katalog der Krankheiten und psychischen Störungen zu ändern – ein Dokument, das mehr als 70 Prozent aller Psychiater weltweit als Richtlinie für ihre alltägliche Arbeit nutzen. In der sogenannten ICD-11, die 2018 erscheinen soll, wird Transsexualität nicht mehr als psychische Störung pathologisiert.",
        ];
        const bedeutung = [
            "Was bedeutet es Transgender zu sein?",
            "Der Begriff „TRANSGENDER“ bezeichnet Menschen, deren äußerliche Geschlechtsmerkmale (und damit das bei der Geburt zugewiesene Geschlecht) nicht mit ihrem gefühlten Geschlecht, dem sogenannten Identitätsgeschlecht, übereinstimmen. Oft wird auch gesagt: „Transgender Personen fühlen sich im falschen Körper“.",
            "Allerdings lassen sich die Lebensumstände von Transgender-Personen nicht auf diese einfache Formel reduzieren. Denn das Thema erstreckt sich auf sehr viele weitere Teile des Lebens als lediglich das Körperliche. ",
            "Außerdem lehnen viele Transgender diese Formulierung für sich persönlich ab,  z.B. weil sie ihren Körper nicht als „falsch“ bezeichnen wollen, nur weil sie Trans*-Personen sind. Die Erfahrungen sind eben vielfältig und lassen sich nur schwer vereinheitlichen.",
        ];
        const rechte= [
            "Rechte in Österreich",
            "Die rechtlich gültige Anerkennung des Identitäts-Geschlechts gilt für viele Transgender-Personen als wesentlicher Schritt, ihr empfundenes Geschlecht ständig und vollends leben zu können. Um dies zu erreichen sind in Österreich zwei Schritte von nöten:",
            "Personenstandsänderung", "Dies ist erforderlich, um auch offiziell im gelebten Geschlecht anerkannt zu werden, sowie um die passende Dokumente zu erhalten.",
            "Vornamensänderung", "Es ist fast unmöglich, im eigenen Geschlecht anerkannt zu werden, wenn der Vorname diesem Geschlecht widerspricht.",
        ];

        const medizin= [
            "Medizinische Unterstützung",
            "Zur aktuellen Zeit werden in Österreich die meisten nötigen Behandlungen zur Umwandlung durch die gesetzlichen Krankenversicherung bezahlt. Motiv dafür ist, dass in der Medizin der Transsexualität Krankheitswert zukommt, wenn die innere Spannung zwischen dem biologischen Geschlecht und dem identifizierten Geschlecht so stark ausgeprägt ist, dass nur durch die Beseitigung dieser Spannung schwere Symptome psychischer Krankheiten behoben oder gelindert werden können.",
            "Wichtig ist hier zu erwähnen, dass nicht alle Transgender-Personen jeden dieser Schritte gehen wollen oder müssen. Mit Unterstützung von medizinischen Personal ist zu klären, welche Behandlungen konkret gewünscht und sinnvoll sind."
        ];

        const diskriminierung = [
            "Diskriminierung in Österreich",
            "Transgender-Personen sind oft einem höheren Maß an Diskriminierung, Gewalt und Belästigung ausgesetzt, als dies von anderen Personen innerhalb und außerhalb der LGBT-Community angegeben wird. Die konstante Aussetzung zu solchen Umständen bewirken ständige Angstgefühle, Depressionen und andere psychische Erkrankungen.",
        ];
        const stats = [
            <div className="stats">
                <p className="stats__one"><span ref="value1" id="percent1">54%</span><br />TRANSPERSONEN WURDEN ÖFFENTLICH IN ÖSTERREICH DISKRIMINIERT *</p>
                <p className="stats__three"><span ref="value2" id="percent2">78%</span><br />… trauen sich nicht sich während der Schulzeit zu outen</p>
                <p className="stats__two"><span ref="value3" id="percent3">37%</span><br />der Befragten fühlten sich bei der Arbeitssuche disrikiminiert</p>
                <p className="stats__four"><span ref="value4" id="percent4">60%</span><br />der Vorfälle werden nicht gemeldet</p>
                <p className="stats__footnote info-subcontent">* folgende Daten sind von der FRA’s LGBT survey von 2014 und beschränken sich auf Erfahrungen innerhalb der letzten 3 Monaten vom Tag der Befragung</p>
            </div>,
        ];

        const gewalt = [
            <div className="gewalt">
                <h2 className="gewalt__titel info-titel">Gewalt</h2>
                <p className="gewalt__text info-content">Neben Diskriminierung sind wiederholte Gewaltakte und die darauf folgende “Angst, man selbst zu sein“ weitere große Hürden im Leben vieler Transgender-Personen.</p>
                <p className="gewalt__three"><span ref="value2" id="percent2">50%</span><br />der Trans-Personen  berichten von etwa einem Vorfall von Gewalt oder Belästigung pro Jahr</p>
                <p className="gewalt__two"><span ref="value3" id="percent3">34%</span><br />geben an,  sie sind in den letzten 5 jahren angegriffen oder mit Gewalt bedroht worden.</p>
                <p className="gewalt__four"><span ref="value4" id="percent4">8%</span><br />wurden angegriffen, hauptsächlich / nur weil sie als trans wahrgenommen wurden.</p>
                <p className="gewalt__footnote info-subcontent">* folgende Daten sind von der FRA’s LGBT survey von 2014
                </p>
            </div>,
        ];

        const helfen = [
            "Wie kann ich helfen?",
            "Mehr Information zu dem Thema kann unter dem Link gefunden werden.",
        ];
        
        return(
            <div className="statistics-container">


            <SectionTransInOe title={trans_in_oe[1]} span={trans_in_oe[0]} text={trans_in_oe[2]} subtext={trans_in_oe[3]} />
            <SectionBedeutung title={bedeutung[0]} text={bedeutung[1]} text_2={bedeutung[2]} text_3={bedeutung[3]} />
            <SectionMedizin title={medizin[0]} text={medizin[1]} subtext={medizin[2]} />
            <SectionDiskriminierung title={diskriminierung[0]} text={diskriminierung[1]}/> 
            <SectionStats text={stats[0]}/>
                 <SectionRechte title={rechte[0]} text={rechte[1]} bold_1={rechte[2]} subtext_1={rechte[3]} bold_2={rechte[4]} subtext_2={rechte[5]} />
            

                
                 <SectionGewalt text={gewalt[0]}/>
                 
                 
                 


                 <SectionHelfen title={helfen[0]} subtext={helfen[1]} />
           
                 
            </div>
        );
    }
}



const SectionTransInOe = (props) => {
    return (
        <section className="transInOe ops-section active">
            <h2 className="transInOe__titel info-titel"><span className="italic">{props.span}</span>{props.title}</h2>
            <p className="transInOe__content info-content">{props.text}</p>
            <p className="transInOe__subcontent info-subcontent">{props.subtext}</p>
            <button className="transInOe__button info-button" onClick={this.clickFunction}>Werde aktiv</button>
        </section>
    )
}

const SectionDiskriminierung = (props) => {
    return (
        <section className="diskriminierung ops-section">
            <h2 className="diskriminierung__titel info-titel">{props.title}</h2>
            <p className="diskriminierung__content info-content">{props.text}</p>
            <button className="diskriminierung__button info-button">Jetzt helfen</button>
            <div className="diskriminierung__box info-box"></div>
        </section>
    )
}

const SectionBedeutung = (props) => {
    return (
        <section className="bedeutung ops-section">
            <h2 className="bedeutung__titel info-titel">{props.title}</h2>
            <p className="bedeutung__content info-content">{props.text}</p>
            <p className="bedeutung__content_2 info-content">{props.text_2}</p>
            <p className="bedeutung__content_3 info-content">{props.text_3}</p>
            <div className="bedeutung__box info-box"></div>
        </section>
    )
}

const SectionRechte = (props) => {
    return (
        <section className="rechte ops-section">
            <h2 className="rechte__titel info-titel">{props.title}</h2>
            <p className="rechte__content info-content">{props.text}</p>
            
            <p className="rechte__subcontentB1 info-subcontent">{props.bold_1}</p>
            <p className="rechte__subcontent_1 info-subcontent">{props.subtext_1}</p>
            
            <p className="rechte__subcontentB2 info-subcontent">{props.bold_2}</p>

            <p className="rechte__subcontent_2 info-subcontent">{props.subtext_2}</p>
        </section>
    )
}

const SectionMedizin = (props) => {
    return (
        <section className="medizin ops-section">
            <h2 className="medizin__titel info-titel">{props.title}</h2>
            <p className="medizin__content info-content">{props.text}</p>
            <p className="medizin__subcontent info-subcontent">{props.subtext}</p>
            <div className="medizin__box info-box"></div>
        </section>
    )
}

const SectionHelfen = (props) => {
    return (
        <section className="helfen ops-section">
            <h2 className="helfen__titel info-titel">{props.title}</h2>
            <p className="helfen__subcontent info-subcontent">{props.subtext}</p>
            <button className="helfen__button info-button">Werde aktiv</button>
        </section>
    )
}

const SectionStats = (props) => {
    return (
        <section className="ops-section">
        <p className="stats__content info-content">{props.text}</p>
        </section>
    )
}

const SectionGewalt = (props) => {
    return (
        <section className="ops-section">
        <p className="gewalt__content info-content">{props.text}</p>
        </section>
    )
}

export default Page_statistics;