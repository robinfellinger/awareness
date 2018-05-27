import React, { Component } from 'react';
import './App.css';
import Page_statistics from "./pages/page_statistics"
import Interaction from "./components/interaction";
import AccessLinks from "./components/directaccesslinks";
import StartInfo from "./StartInfo";
import TestScene from "./components/threejs/TestScene"
import Model from "./components/threejs/Model"
import ModelLiquid from "./components/threejs/ModelLiquid.js"
import PerspectiveCamera from "./components/threejs/Camera";
console.log(Model);
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
        };

        this.scrollExperience = this.scrollExperience.bind(this);
        this.toggleExperience = this.toggleExperience.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.toggleStatisticPage = this.toggleStatisticPage.bind(this);
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
    }
    gameLoop = () => {
        const { rotationSpeed } = this.state;

        requestAnimationFrame(this.gameLoop);
        const { color } = this.state;
        this.setState({tRot: 0});
        this.setState({rotationSpeed: this.state.rotationSpeed+0.1});
        this.wakov();
    }


    returnClasses(){
        (this.state.startExperience === false) ? this.setState({canvasClasses: "three__canvas three-blur"}) : this.setState({canvasClasses: "three__canvas"});
    }
    toggleExperience(){
        this.setState({startExperience: true}, this.returnClasses);
        this.setState({color: "E1DB00"});
        this.setState({rgbColors: {
            r: 0,
            g: 90,
            b: 90,
        }});
        this.setState({bounceFrequence: 800});
        this.setState({emotion: "joy"});
    }
    toggleStatisticPage(){
        this.setState({showStatisticPage: true});
    }
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
        <div onWheel = {(e) => this.scrollExperience(e)}>
            <AccessLinks></AccessLinks>
            <div className={"pos-absolute startInfo_pos"}>
            <StartInfo start={this.state.startExperience}></StartInfo>
            </div>
            <div className={"pos-absolute pos-centerText pos-bottom"}>
            <button className={"button-basic text-sm t-transform-lowercase button-startAnim"} onClick={() => this.toggleExperience()}>Starte die Experience</button>
            </div>
            {this.state.startExperience &&
                <div className={"pos-absolute interaction_pos"}>
                    {/*TODO: MOVE INTERACTION TO THREE.JS FOR BETTER COMMUNICATION*/}
                    <Interaction></Interaction>
                    <button onClick={() => this.toggleStatisticPage()}>TO STATISTIC PAGE</button>
                    {this.state.showStatisticPage &&
                        <Page_statistics></Page_statistics>
                    }
                </div>
            }

            {/*imports the three.js model (maybe commented out for better performance)*/}
            <div className="pos-absolute gradient-shadow"></div>
            <div className={this.state.canvasClasses}>
                {/*<div ref={element => this.threeRootElement = element} />*/}
                <TestScene rgbColors={this.state.rgbColors} width={this.state.width} height={this.state.height}>
                    <PerspectiveCamera fov={415}
                                       near={4}
                                       aspect={this.state.width/this.state.height}
                                       far={600}
                                       position={{x: 0, y: 0, z: 40}}>
                    <Model rotationSpeed={this.state.rotationSpeed}/>
                    <ModelLiquid rgbColors={this.state.rgbColors}
                                 modelColor={this.state.color}
                                 bounceFrequence={this.state.bounceFrequence}
                                 rotationSpeed={this.state.rotationSpeed}
                                 emotion={this.state.emotion}/>
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