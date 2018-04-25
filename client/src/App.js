import React, { Component } from 'react';
import './App.css';
// import model from './components/model.js'
import threeEntryPoint from "./components/threejs/ThreeEntryPoint"
import Page_statistics from "./pages/page_statistics"
import Interaction from "./components/interaction";
import StartInfo from "./StartInfo";

import {render} from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Home = () => <h1>Home</h1>;



class App extends Component {

    constructor() {
        super();
        this.state = {
            startExperience: false,
            canvasClasses: "three__canvas three-blur",

        };
        this.scrollExperience = this.scrollExperience.bind(this);
        this.toggleExperience = this.toggleExperience.bind(this);

    }

    componentDidMount() {
      threeEntryPoint(this.threeRootElement);
    }

    returnClasses(){
        (this.state.startExperience = false) ? this.setState({canvasClasses: "three__canvas three-blur"}) : this.setState({canvasClasses: "three__canvas"});
    }
    toggleExperience(){
        // (this.state.startExperience = false) ? (this.setState({startExperience : true})) : (this.setState({startExperience : true}));
        this.setState({startExperience: true});
        this.returnClasses();
    }
    scrollExperience(event){
        // if (event.deltaY < -30) {console.log('scrolling up');}
        if (event.deltaY > 30) {this.setState({startExperience: true});this.returnClasses();}

    }

    //events need to be removed, before the component is deleted from the dom
    componentWillUnmount() {
         window.removeEventListener('wheel', this.scrollExperience);
    }

     App = () => (
        <div onWheel = {(e) => this.scrollExperience(e)}>

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
                <div ref={element => this.threeRootElement = element} />
            </div>
        </div>
    )


}
ReactDom.render((
    <HashRouter>
        <div>
        <Route exact path="/" component={Home} />
        
      </div>
    </HashRouter>
  ), document.getElementById('root'))
// render((
//     <Router>
//         <Route path={"/"} component={App}>
//         <Route path="statistics" component={Page_statistics}>
//         </Route>
//     </Router>
// ), document.body)


// ReactDOM.render(<MyComponent />, document.getElementById('id'));

export default App;