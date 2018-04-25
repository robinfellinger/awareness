import React, { Component } from 'react';
import './App.css';
// import model from './components/model.js'
 import threeEntryPoint from "./components/threejs/ThreeEntryPoint"
import Page_statistics from "./pages/page_statistics"
import Interaction from "./components/interaction";
import AccessLinks from "./components/directaccesslinks";
import StartInfo from "./StartInfo";
import EntryPoint from "./components/threejs/ThreeEntryPoint"
import TestScene from "./components/threejs/TestScene"
import Model from "./components/threejs/Model"
import Cube from "./components/threejs/Cube"
import TWEEN from '@tweenjs/tween.js';
import PerspectiveCamera from "./components/threejs/Camera";
console.log(Model);
class App extends Component {

    constructor() {
        super();
        this.state = {
            startExperience: false,
            canvasClasses: "three__canvas three-blur",
            width: window.innerWidth,
            height: window.innerHeight,
            color: "#d3d2e1",
            tRot: 0,


        };
        this.scrollExperience = this.scrollExperience.bind(this);
        this.toggleExperience = this.toggleExperience.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.wakov = this.wakov.bind(this);


    }
    wakov(){

        if(Math.floor(Math.random()< 0.01)){
            if(this.state.tRot >5){
                console.log("COLOR CHANGE");
                this.setState({color: "#e25800"})
            }
            // console.log("COLOR CHANGE");
            this.setState({tRot: this.state.tRot+2})
            console.log(this.state.tRot);
        }
        // cRot+=(tRot-cRot)/100000;
        //console.log(cRot);
    }
    componentDidMount() {
        // console.log(TWEEN);

        this.setState({startExperience: true});
        this.gameLoop();
        window.addEventListener("resize", this.updateDimensions);
        // threeEntryPoint(this.threeRootElement);
        console.log(TWEEN);
    }
    gameLoop = () => {
        // this.setState({startExperience: false});
        this.setState({color: "#e25800"});
        requestAnimationFrame(this.gameLoop);
        this.wakov();
    }


    returnClasses(){
        (this.state.startExperience = false) ? this.setState({canvasClasses: "three__canvas three-blur"}) : this.setState({canvasClasses: "three__canvas"});
    }
    toggleExperience(){
        // (this.state.startExperience = false) ? (this.setState({startExperience : true})) : (this.setState({startExperience : true}));
        this.setState({startExperience: true}, this.returnClasses);
    }
    scrollExperience(event){
        // if (event.deltaY < -30) {console.log('scrolling up');}
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
    return (
        <div onWheel = {(e) => this.scrollExperience(e)}>
            <AccessLinks></AccessLinks>
            <div className={"pos-absolute pos-centerText startInfo_pos"}>
            <StartInfo start={this.state.startExperience}></StartInfo>
                <button className={"button-basic text-sm t-transform-lowercase button-startAnim"} onClick={() => this.toggleExperience()}>Start Experience</button>
            </div>

            {this.state.startExperience &&
                <div className={"pos-absolute"}>
                    {/*TODO: MOVE INTERACTION TO THREE.JS FOR BETTER COMMUNICATION*/}
                    <Interaction></Interaction>
                    <button>TO STATISTIC PAGE</button>
                    <Page_statistics></Page_statistics>

                </div>
            }

            {/*imports the three.js model (maybe commented out for better performance)*/}
            <div className={this.state.canvasClasses}>
                {/*<div ref={element => this.threeRootElement = element} />*/}
                <TestScene width={this.state.width} height={this.state.height}>
                    <PerspectiveCamera fov={60}
                                       near={4}
                                       aspect={this.state.width/this.state.height}
                                       far={100}
                                       position={{x: 0, y: 0, z: 30}}>
                    <Model color={this.state.color}></Model>
                    </PerspectiveCamera>
                </TestScene>
            </div>


        </div>

    );
  }


}
// render((
//     <Router>
//         <Route path={"/"} component={App}>
//         <Route path="statistics" component={Page_statistics}>
//         </Route>
//     </Router>
// ), document.body)


// ReactDOM.render(<MyComponent />, document.getElementById('id'));

export default App;