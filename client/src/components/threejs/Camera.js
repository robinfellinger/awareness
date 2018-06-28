import React, { Component } from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types';

class PerspectiveCamera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // aspect: (window.innerWidth/window.innerHeight),
            width: window.innerWidth,
            height: window.innerHeight,
        }

        this.updateThree(props);
    }
    componentDidUpdate() {

        this.updateThree(this.props);
        this._render();


        function onWindowResize(camera) {
          //  this.aspect = screenDimensions.width / screenDimensions.height;
          //  camera.updateProjectionMatrix();
            //renderer.setSize(window.innerWidth, window.innerHeight);


            // camera.aspect = this.state.width / this.state.height;
           // camera.updateProjectionMatrix();
          //  camera.setState({aspect: window.innerWidth/window.innerHeight});
        }



        onWindowResize(this);
        window.addEventListener( 'resize', onWindowResize(this), false );

    }

    updateThree(props) {
        const { fov, near, far, aspect, position } = this.props;

        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.x = position.x;
        this.camera.position.y = position.y;
        this.camera.position.z = position.z;
    }

    componentDidMount() {
        this.updateThree(this.props);
        this._render();
    }
    componentWillMount(){
        
        this.updateThree(this.props);
        this._render();
    }

    _render() {
        this.context.renderer.render(this.context.scene, this.camera);
    }

    render() {
        return <div>{this.props.children}</div>;
    }


}

PerspectiveCamera.contextTypes = {
    scene: PropTypes.object,
    renderer: PropTypes.object
}

export default PerspectiveCamera;