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
        (this.props.start === false) ? this.setState({headlinexlClasses: "headline-xl "}) : this.setState({headlinexlClasses: "headline-xl headline-xl-animBack"});
        (this.props.start === false) ? this.setState({headlinelgClasses: "text-md startInfo-intro-textindent"}) : this.setState({headlinelgClasses: "text-md startInfo-intro-textindent headline-lg-animBack"});
    }


    render() {
        return (

            <div className={"startInfo-container"}>
            <div className={"startInfo_pos"}>
                {/*<svg className="margin-line line-anim" height="5">*/}
                    {/*<line className={"button--animate__arrowline"} x1="0" y1="0" x2="90" y2="0"*/}
                          {/*strokeWidth="3px" stroke="white"/>*/}
                {/*</svg>*/}
                <h2 className={this.state.headlinexlClasses}><span className={""}>hi, ich bin Leo!</span></h2>
                <h3 className={this.state.headlinelgClasses}>
                    Alex ist eine experience die Dich mit dem Thema Transgender in Österreich vertraut machen möchte
                    <button className={"button-gradient startInfo-gradientbutton"}>erfahre mehr</button>
                </h3>

                {/*<svg className="margin-line line-anim" width="60" height="5">*/}
                    {/*<line className={"button--animate__arrowline"} x1="0" y1="0" x2="90" y2="0"*/}
                          {/*strokeWidth="3px" stroke="white"/>*/}
                {/*</svg>*/}
            </div>
                <div className="startCircle pos-absolute">
                <canvas className={""}></canvas>
                <div>x</div>
                </div>
                <div className={"pos-absolute startInfo-intro_pos"}>
                {/*<p className={"text-sm"}>eine experience die Dich mit dem Thema Transgender in Österreich vertraut machen möchte</p>*/}

                </div>

            </div>
        );
    }


}
export default StartInfo;