import React, { Component } from 'react';

class StartInfo extends Component {


    constructor(props) {
        super(props);
        this.state = {
            fadeAway: this.props.start,
            headlinexlClasses: "",
            headlinelgClasses: "",
        }



    }

    componentDidMount() {
        this.returnClasses();
    }
    componentWillReceiveProps(){
        this.returnClasses();
    }
    returnClasses(){
        (this.props.start === false) ? this.setState({headlinexlClasses: "headline-xl t-transform-lowercase"}) : this.setState({headlinexlClasses: "headline-xl t-transform-lowercase headline-xl-animBack"});
        (this.props.start === false) ? this.setState({headlinelgClasses: "headline-lg"}) : this.setState({headlinelgClasses: "headline-lg headline-lg-animBack"});
    }


    render() {
        return (

            <div>
                <h2 className={this.state.headlinexlClasses}><span className={"t-italic"}>Hi, ich bin </span>Alex|</h2>
                <h3 className={this.state.headlinelgClasses}>wollen wir miteinander chatten?</h3>
            </div>
        );
    }


}
export default StartInfo;