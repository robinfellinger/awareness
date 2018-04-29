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
        (this.props.start === false) ? this.setState({headlinexlClasses: "headline-xl t-transform-uppercase"}) : this.setState({headlinexlClasses: "headline-xl t-transform-uppercase headline-xl-animBack"});
        (this.props.start === false) ? this.setState({headlinelgClasses: "headline-lg"}) : this.setState({headlinelgClasses: "headline-lg headline-lg-animBack"});
    }


    render() {
        return (

            <div>

                <svg className="margin-line" height="5">
                    <line className={"button--animate__arrowline"} x1="0" y1="0" x2="90" y2="0"
                          strokeWidth="3px" stroke="white"/>
                </svg>
                <h2 className={this.state.headlinexlClasses}><span className={"t-transform-uppercase"}>Hi, ich bin </span>Alex</h2>
                <h3 className={this.state.headlinelgClasses}>wollen wir miteinander chatten?</h3>
                <svg className="margin-line" width="60" height="5">
                    <line className={"button--animate__arrowline"} x1="0" y1="0" x2="90" y2="0"
                          strokeWidth="3px" stroke="white"/>
                </svg>
            </div>
        );
    }


}
export default StartInfo;