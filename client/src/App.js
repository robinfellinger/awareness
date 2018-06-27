import React, { Component } from 'react';
import './App.css';

import Interaction from "./components/interaction";
import AccessLinks from "./components/directaccesslinks";
import StartInfo from "./StartInfo";
import TestScene from "./components/threejs/TestScene"
import Model from "./components/threejs/Model"
import ModelLiquid from "./components/threejs/ModelLiquid.js"
import PerspectiveCamera from "./components/threejs/Camera";
import glow from './img/rahmen_glow.png'
//console.log(Model);
class App extends Component {

    constructor() {
        super();
        this.state = {
            startExperience: false,
            showStatisticPage: false,
            canvasClasses: "three__canvas three-blur",
            width: window.innerWidth,
            height: window.innerHeight,
            color: "#d3d2e1",
            tRot: 0,
            rgbColors: {r: 0, g: 0, b: 0},
            bounceFrequence: 0,
            rotationSpeed: 0,
            emotion: "none",
            once: false,
            startCircleClasses: "circleSvg",
        };

        this.scrollExperience = this.scrollExperience.bind(this);
        this.toggleExperience = this.toggleExperience.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.startStartButtonAnimation = this.startStartButtonAnimation.bind(this);
        this.startLeaveStartButtonAnimation = this.startLeaveStartButtonAnimation.bind(this)
        // this.toggleStatisticPage = this.toggleStatisticPage.bind(this);
        this.wakov = this.wakov.bind(this);


    }


    wakov(){

        if(Math.floor(Math.random()< 0.01)){
            if(this.state.tRot >5){

            }
            this.setState({tRot: this.state.tRot+2})
        }
    }
    componentDidMount() {
        this.gameLoop();
        window.addEventListener("resize", this.updateDimensions);
        setTimeout(() => {
            this.setState({startCircleClasses: "startCircleSvg circleSvg"});
        }, 4000 )
    }
    gameLoop = () => {
        // const { rotationSpeed } = this.state;


        // const { color } = this.state;
        // this.setState({tRot: 0});


        setTimeout(() => {
            if(!this.state.once){
            requestAnimationFrame(this.gameLoop);
            this.setState({rotationSpeed: this.state.rotationSpeed});
            this.setState({once: true});
            }
        }, 1000 / 30 )


        // this.wakov();
    }

//hover start button
    startStartButtonAnimation(){

        var startButton = document.getElementsByClassName("button-startAnim")[0];
        var svg = document.getElementsByClassName("circleSvg")[0];
        var startAnimSvg = document.getElementsByClassName("startAnimSvg")[1];
        var small = document.getElementsByClassName("startCircle-small")[0];

        if(svg && startAnimSvg && small){
        // if(!svg.classList.contains("startCircleSvg")){
            svg.classList.add("startCircleSvg-hover");
            startAnimSvg.classList.add("startAnimSvg-small");
            small.classList.add("startCircle-small-anim");
            setTimeout(() => {
                svg.classList.remove("startCircleSvg-hover");
            }, 2500 )
        // }else {
        //     svg.classList.remove("startCircleSvg");
        //     // svg.classList.add("circleSvg");console.log("STARTCIRCLE")
        //
        //     }
        }


            // svg.classList.remove("startButtonHoverAnimationLeave"); }



        if(startButton){
        startButton.classList.add("startButtonHoverAnimation");
        startButton.classList.remove("startButtonHoverAnimationLeave"); }
    }
    startLeaveStartButtonAnimation(){
        var startButton = document.getElementsByClassName("button-startAnim")[0];
        if(startButton){
        console.log(startButton);
        startButton.classList.add("startButtonHoverAnimationLeave");
        startButton.classList.remove("startButtonHoverAnimation");}
    }


    returnClasses(){
        (this.state.startExperience === false) ? this.setState({canvasClasses: "three__canvas three-blur"}) : this.setState({canvasClasses: "three__canvas"});
    }
    toggleExperience(){
        this.setState({startExperience: true}, this.returnClasses);
        this.setState({color: "E1DB00"});
        var button = document.getElementsByClassName("pos-centerText")[0];
        button.style.display = "none";
        this.setState({bounceFrequence: 800});

    }

    //CALLBACK INTERACTION
    myCallback = (dataFromChild) => {
        this.setState({emotion: dataFromChild});
    };


    scrollExperience(event){
        if (event.deltaY > 30) {this.setState({startExperience: true});this.returnClasses();}
    }

    updateDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }
    componentWillMount() {
        this.updateDimensions();
    }


    //events need to be removed, before the component is deleted from the dom
    componentWillUnmount() {
         window.removeEventListener('wheel', this.scrollExperience);
        window.removeEventListener("resize", this.updateDimensions);
    }




    render() {
        const { color } = this.state;
        return (
        <div
            // onWheel = {(e) => this.scrollExperience(e)}
        >
            <AccessLinks></AccessLinks>
            <div className={"pos-absolute startInfo_pos"}>

            <StartInfo start={this.state.startExperience}></StartInfo>
            </div>

            {this.state.startExperience &&
                <div className={"pos-absolute interaction_pos"}>
                <Interaction callbackFromParent={this.myCallback}></Interaction>
                    {/*TODO: MOVE INTERACTION TO THREE.JS FOR BETTER COMMUNICATION
                   
                    <button onClick={() => this.toggleStatisticPage()}>TO STATISTIC PAGE</button>
                    {this.state.showStatisticPage &&
                        {/*<Page_statistics></Page_statistics>
                   }*/}
                </div>
            }
            <div className={"pos-absolute pos-centerText"}>
                <div className="startButtonListener"
                onMouseEnter={() => this.startStartButtonAnimation()}
                onMouseLeave={() => this.startLeaveStartButtonAnimation()}
                onClick={() => this.toggleExperience()}
                ></div>
                <div className="animWholeButton">
                <svg height="50" width="50" className={"startAnimSvg"}>
                    <circle id="" cx="16" cy="16" r="14" stroke="black" stroke-width="2" fill="transparent" />
                </svg>
                <svg height="50" width="50" className={"startAnimSvg"}>
                    <circle className="startCircleSvg circleSvg" cx="16" cy="16" r="14" stroke="red" stroke-width="2" fill="transparent" />
                </svg>
                <button className={"button-basic startCircle text-sm t-transform-lowercase text-button"}>
                    <div className={"startCircle-small"}></div>
                    <p>start</p></button></div>
            </div>
            {/*imports the three.js model (maybe commented out for better performance)*/}
            <div className="pos-absolute gradient-shadow"></div>
            <div className={this.state.canvasClasses}>
                {/*<div ref={element => this.threeRootElement = element} />*/}
                <TestScene rgbColors={this.state.rgbColors} width={this.state.width} height={this.state.height}>
                    <PerspectiveCamera fov={415}
                                       near={4}
                                       aspect={(this.state.width/this.state.height)}
                                       far={600}
                                       position={{x: 0, y: 0, z: 47}}>
                    <Model rotationSpeed={this.state.rotationSpeed}/>
                    <ModelLiquid rgbColors={this.state.rgbColors}
                                 modelColor={this.state.color}
                                 bounceFrequence={this.state.bounceFrequence}
                                 rotationSpeed={this.state.rotationSpeed}
                                 emotion={this.state.emotion}/>
                    </PerspectiveCamera>
                </TestScene>
            </div>
           <div id="noise"></div>
           <div className="contrast-gradient"></div>
            <div className="rectangle-gradient">
                <img src={glow} alt="glow_rectangle"/>
            </div>

        </div>

    );
  }


}


export default App;