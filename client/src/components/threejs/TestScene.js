import React, { Component } from 'react';
// var TWEEN = require('@tweenjs/tween.js');
import * as THREE from 'three'
import PropTypes from 'prop-types';

import three from 'three';
import Model from './Model'
//var TWEEN = require('@tweenjs/tween.js');

class TestScene extends Component {


    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({alpha: true });

    constructor(){
        super();
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
        }
    }

    componentDidMount(){
        var screenDimensions = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        this.updateThree(this.props);
        this.renderer.shadowMapEnabled = true;
        this.renderer.shadowMapType = THREE.PCFSoftShadowMap;

        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;

        // console.log(this.props.children[0]);


        const camera =  buildCamera(screenDimensions);
        this.renderer.setSize(screenDimensions);

        this.refs.anchor.appendChild(this.renderer.domElement);
        this.renderer.render(this.scene, camera);


        light(this.scene);

        var planeShadow = new THREE.DirectionalLight( 0xf3007a, 0.2 );
        planeShadow.position.set(0,20,0);
        let helper = new THREE.DirectionalLightHelper( planeShadow, 5 );
        planeShadow.shadowDarkness = 0.1;
        planeShadow.castShadow = true;
        planeShadow.shadowCameraVisible = true;

        this.scene.add(helper);
        this.scene.add(planeShadow);

        planeShadow.shadow.mapSize.width = 512;  // default
        planeShadow.shadow.mapSize.height = 512; // default
        planeShadow.shadow.camera.near = 0.5;    // default
        planeShadow.shadow.camera.far = 120;     // default



        // function gameLoop(renderer, scene){
        //     // TWEEN.update();
        //     requestAnimationFrame(gameLoop);
        //
        //     // renderer.render(scene, camera);
        // }
        // gameLoop(this.renderer, this.scene);



    function light(scene){
        const lightIn = new THREE.PointLight("#b7bcc9", 2, 0.0, 0.01);
        const lightFront = new THREE.DirectionalLight( 0xffffff, 0.3 );
        const lightOut = new THREE.AmbientLight( 0x404040, 3 );

        lightOut.position.set(40,20,40);
        lightIn.position.set(-110,-100,-190);
        lightFront.position.set(40,40,40);


        scene.add(lightIn);
        scene.add(lightOut);
        scene.add(lightFront);
    }
    function buildRender({ width, height }) {
            const renderer = new THREE.WebGLRenderer({  alpha: true  });
            const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
            renderer.setPixelRatio(DPR);
            renderer.setSize(width, height);
            renderer.shadowMapEnabled = true;
            renderer.shadowMapType = THREE.PCFSoftShadowMap;
            renderer.gammaInput = true;
            renderer.gammaOutput = true;
            return renderer;
        }
    function buildCamera({ width, height }) {
            const aspectRatio = width / height;
            const fieldOfView = 60;
            const nearPlane = 4;
            const farPlane = 100;
            const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
            camera.position.z = 40;
            return camera;
        }
    function onWindowResize(renderer) {
            screenDimensions.width = window.innerWidth;
            screenDimensions.height = window.innerHeight;
            camera.aspect = screenDimensions.width / screenDimensions.height;
            camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        // console.log("RESIZE");

    }



     onWindowResize(this.renderer);
     window.addEventListener( 'resize', onWindowResize(this.renderer), false );

    }
    componentDidUpdate() {
        this.updateThree(this.props);
    }

    updateThree(props) {
        const { width, height } = props;
        // this.renderer.setSize(width, height);
    }

    getChildContext() {
        return {
            scene: this.scene,
            renderer: this.renderer
        }
    }
    onWindowResize(renderer) {
        // screenDimensions.width = window.innerWidth;
        // screenDimensions.height = window.innerHeight;
        // camera.aspect = screenDimensions.width / screenDimensions.height;
        // camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        // console.log("RESIZE");

    }

    render(){
       // const {width, height} = this.props;
        const {scene} = this.props;
        const { width, height, style } = this.props;
        const newwidth = 3000;
        const newHeight = 3000;
        window.addEventListener( 'resize', this.onWindowResize(this.renderer), false );
        return (
            <div ref="anchor">
                {/*<Model scene={scene}/>*/}
                {this.props.children}
            </div>

        );
    }
    // loop();
}
function loop(){
    requestAnimationFrame(loop);

    // cube.rotation.x += 0.03;
    // cube.rotation.y += 0.03;

    this.renderer.render(this.scene, this.camera);
}

TestScene.childContextTypes = {
    scene: PropTypes.object,
    renderer: PropTypes.object
}
export default TestScene;