import React, { Component } from 'react';
import './App.css';
// import model from './components/model.js'
import threeEntryPoint from "./components/threejs/ThreeEntryPoint"
import Page_statistics from "./pages/page_statistics"
import Interaction from "./components/interaction";

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

          <h1>startpage</h1>

            {/*imports the three.js model (maybe commented out for better performance)*/}
            <div ref={element => this.threeRootElement = element} />
    <button onClick={() => this.toggleExperience()}>Start Experience</button>
            {this.state.startExperience &&
                <div>
                    {/*TODO: MOVE INTERACTION TO THREE.JS FOR BETTER COMMUNICATION*/}
                    <Interaction></Interaction>
                    <button onClick={""}>TO STATISTIC PAGE</button>
                    <Page_statistics></Page_statistics>

                </div>
            }
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