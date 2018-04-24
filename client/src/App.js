import React, { Component } from 'react';
import './App.css';
// import model from './components/model.js'
import threeEntryPoint from "./components/threejs/ThreeEntryPoint"
import Page_statistics from "./pages/page_statistics"
import Interaction from "./components/interaction";
import StartInfo from "./StartInfo";

import {render} from 'react-dom';
import {Router, Route, Link} from 'react-router';


class App extends Component {

    constructor() {
        super();
        this.state = {
            startExperience: false,
        }
    }

    toggleExperience(){
        (this.state.startExperience = false) ? (this.setState({startExperience : true})) : (this.setState({startExperience : true}));
    }

    componentDidMount() {
        threeEntryPoint(this.threeRootElement);
    }


    render() {
    return (
        <div>

            <div className={"pos-absolute pos-centerText"}>
            <StartInfo></StartInfo>
                <button onClick={() => this.toggleExperience()}>Start Experience</button>
            </div>

            {this.state.startExperience &&
                <div className={"pos-absolute"}>
                    {/*TODO: MOVE INTERACTION TO THREE.JS FOR BETTER COMMUNICATION*/}
                    <Interaction></Interaction>
                    <form method="post">
                    <button type= "submit">TO STATISTIC PAGE</button>
                    </form>
                    <Page_statistics></Page_statistics>

                </div>
            }

            {/*imports the three.js model (maybe commented out for better performance)*/}
            <div className="three__canvas">
                <div ref={element => this.threeRootElement = element} />
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