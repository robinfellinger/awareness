import React, { Component } from 'react';
import Bar from '../components/Bar';

let page = 1;


class Page_statistics extends Component {

    constructor(props){
        super(props);
        //this.animateValue("value", 100, 25, 2000);
        
    }

    handle = (value, duration) => {
        this.ref = value;
        this.animateValue(duration);
      }
    animateValue(duration) {
        var current = 0;
        var end = this.ref.innerHTML.replace('%','');
        var range = end - current;
        var increment = 1; //further tweak for duration change
        var stepTime = Math.abs(Math.floor(duration / range));
        var obj = this.ref;
        var timer = setInterval(request, stepTime);
        function request(){
            clearInterval(timer);
            current += increment;
            obj.innerHTML = Math.floor(current) + "%"; 
            if (Math.floor(current) == end) {
                clearInterval(timer);
                return;
            }
            stepTime = stepTime - stepTime/100;
            timer = setInterval(request, stepTime);
        }
    }

    componentDidMount(){
        this.handle(this.refs.value1, 500)    
        this.handle(this.refs.value2, 1000)
        this.handle(this.refs.value3, 1500)
        this.handle(this.refs.value4, 2000)
      }

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
                <p><span ref="value1">54%</span><br />werden diskriminiert weil sie als "Trans" wahrgenommen werden</p>
                <p><span ref="value2">78%</span><br />trauen sich nicht, sich während der Schulzeit zu outen</p>
                <p><span ref="value3">37%</span><br />fühlten sich bei der Arbeitssuche diskriminiert</p>
                <p><span ref="value4">60%</span><br />der Personen melden Vorfälle von diskriminierung nicht</p>
            </div>,
        ];
        
        return(
            <div class="statistics-container">
                <SectionHeader title={trans_in_oe[0]} span={trans_in_oe[1]} text={trans_in_oe[2]} />
                <SectionBlack title={bedeutung[0]} text_1={bedeutung[1]} text_2={bedeutung[2]} />
                <SectionGradient title={diskriminierung[0]} text_1={diskriminierung[1]} extra={diskriminierung[2]} />
                <SectionWhite2 title={psychische_krankheit[0]} span={psychische_krankheit[1]} text={psychische_krankheit[2]} />
                <SectionBlack title={medizinische_u[0]} text_1={medizinische_u[1]} text_2={medizinische_u[2]} />
            </div>
        );
    }
}

const SectionHeader = (props) => {
    return (
        <section class="header">
            <h2 class="header__titel">{props.title}<span class="header__titel--highlight">{props.span}</span></h2>
            <p class="header__content">{props.text}</p>
            <a href="http://www.hosilinz.at" class="header__link">hosilinz.at</a>
        </section>
    )
}

const SectionWhite2 = (props) => {
    return (
        <section class="white">
        <div class="line"></div>
            <p class="navigation">navigation <span>01/04</span></p>

            <h2 class="white__titel">{props.title}<br /><span class="white__titel--highlight">{props.span}</span></h2>
            <p class="white__content white__content--large">{props.text}</p>

            <div class="vl vl--1"></div><div class="vl vl--2"></div><div class="vl vl--3"></div>
        </section>
    )
}

const SectionBlack = (props) => {
    return (
        <section class="black">
            <div class="line"></div>
            <p class="navigation">navigation <span>01/04</span></p>

            <h2 class="black__titel">{props.title}</h2>
            <p class="black__text black__text--1">{props.text_1}</p>
            <p class="black__text black__text--2">{props.text_2}</p>

            <div class="line line--hashtags"></div>
            <p class="black__text black__text--hashtags">#binder #passing <br />#homelessTransTeens</p>

            <div class="vl vl--1"></div><div class="vl vl--2"></div><div class="vl vl--3"></div>
        </section>
    )
}

const SectionGradient = (props) => {
    return (
        <section class="gradient">
        <div class="line"></div>
            <p class="navigation">navigation <span>02/04</span></p>


            <h2 class="gradient__titel">{props.title}</h2>
            <p class="gradient__text">{props.text_1}</p>
            {props.extra}

            <div class="vl vl--1"></div><div class="vl vl--2"></div><div class="vl vl--3"></div>
        </section>
    )
}

export default Page_statistics;