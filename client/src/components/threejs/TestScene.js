import React, { Component } from 'react';
// var TWEEN = require('@tweenjs/tween.js');
import * as THREE from 'three'
import PropTypes from 'prop-types';

import three from 'three';
import Model from './Model'
//var TWEEN = require('@tweenjs/tween.js');

class TestScene extends Component {

    // startWidth = width.innerHeight;
    // startHeight = height.innerHeight;;
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({  alpha: true, logarithmicDepthBuffer: true  });

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
        console.log(this.renderer);
        this.renderer.shadowMapEnabled = true;
        this.renderer.shadowMapType = THREE.PCFSoftShadowMap;
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;

        const camera =  buildCamera(screenDimensions);
        this.renderer.setSize(screenDimensions);


        this.scene.fog = new THREE.FogExp2( 0x071E30, 1 ); // intensität?
        this.scene.fog = new THREE.Fog( 0x071E30, 4, 100 );
        this.scene.fog.color.setHSL( 0.51, 0.5, 0.9 );

        this.refs.anchor.appendChild(this.renderer.domElement);
        this.renderer.render(this.scene, camera);

        //-------------PROSTPRO-----------

       /* var renderPass = new THREE.RenderPass(scene, camera );
        renderPass.clear = false;
        // var copyPass = new THREE.ShaderPass( THREE.CopyShader );
        // copyPass.renderToScreen = true;

        var composer = new THREE.EffectComposer(renderer );
        composer.addPass( renderPass );
        // composer.addPass( copyPass );

        composer.render( 0.05 );




        // const composer = new EffectComposer(this.renderer);
        //
        // const renderPass = new RenderPass(this.scene, this.camera);
        composer.addPass(renderPass);

        const filmPass = new ShaderPass(FilmShader);
        composer.addPass(filmPass);*/

        light(this.scene);
        // glow(this.scene);


    function glow(scene){
        var bulbGeometry = new THREE.SphereBufferGeometry( 0.02, 16, 8 );
        const bulbLight = new THREE.PointLight( 0x000000, 1, 100, 2 );
        const bulbMat = new THREE.MeshStandardMaterial( {
            emissive: 0x000000,
            emissiveIntensity: 1,
            color: 0x000000
        });
        bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
        bulbLight.position.set( 0, 100, 140 );
        bulbLight.castShadow = true;
        scene.add( bulbLight );


        var bulbGeometry1 = new THREE.SphereBufferGeometry( 0.02, 16, 8 );
        const bulbLight1 = new THREE.PointLight( 0x33ccff, 1, 100, 2 );
        const bulbMat1 = new THREE.MeshStandardMaterial( {
            emissive: 0x33ccff,
            emissiveIntensity: 10,
            color: 0x000000
        });
        bulbLight1.add( new THREE.Mesh( bulbGeometry1, bulbMat1 ) );
        bulbLight1.position.set( -20, 0, -5 );

        scene.add( bulbLight1 );


        var bulbGeometry2 = new THREE.SphereBufferGeometry( 0.02, 16, 8 );
        const bulbLight2 = new THREE.PointLight( 0xcf309a, 1, 100, 2 );
        const bulbMat2 = new THREE.MeshStandardMaterial( {
            emissive: 0xEDB2D9,
            emissiveIntensity: 10,
            color: 0x000000
        });
        bulbLight2.add( new THREE.Mesh( bulbGeometry2, bulbMat2 ) );
        bulbLight2.position.set( -10, 30, -5 );

        scene.add( bulbLight2 );
    }
    function light(scene){
        const lightIn = new THREE.PointLight("#b7bcc9", 2, 0.0, 0.01);
            lightIn.position.set(-110,-100,-190);
        const lightFront = new THREE.DirectionalLight( 0xffffff, 0.8 );
            lightFront.position.set(3,13,50);
        const lightOut = new THREE.AmbientLight( 0x404040, 1.2 );
            lightOut.position.set(40,20,40);
        const rimLightLu = new THREE.DirectionalLight( 0xB7BCE2, 1 );
            rimLightLu.position.set(-3, -2, -5);
            rimLightLu.rotation.x = 89.5;
            rimLightLu.rotation.z -= 3;
        const rimLightMo = new THREE.DirectionalLight( 0xC93692, 5 );
        rimLightMo.position.set(2, 10, -12);
        rimLightMo.rotation.x = 89.5;
        // rimLightMo.rotation.z -= 3;
        const extraFromAbove = new THREE.DirectionalLight( 0xC90068, 0.6 );
            extraFromAbove.position.set(5,14,16);
        extraFromAbove.rotation.x -= 20;
        extraFromAbove.rotation.z -= 20;

        let helper = new THREE.DirectionalLightHelper( lightFront, 15 );
      //  scene.add(helper);



        // scene.add(lightIn);
        scene.add(lightOut); //ambient light
        scene.add(lightFront); //hard light from right top
        scene.add(rimLightLu);
        scene.add(rimLightMo);
        scene.add(extraFromAbove);
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

    }



     onWindowResize(this.renderer);
     window.addEventListener( 'resize', onWindowResize(this.renderer), false );

    }
    componentDidUpdate() {
        this.updateThree(this.props);
    }

    updateThree(props) {
        const { width, height } = props;
    }

    getChildContext() {
        return {
            scene: this.scene,
            renderer: this.renderer
        }
    }
    onWindowResize(renderer) {
        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    render(){


        window.addEventListener( 'resize', this.onWindowResize(this.renderer), false );
        return (
            <div ref="anchor">
                {this.props.children}
            </div>

        );
    }
}


TestScene.childContextTypes = {
    scene: PropTypes.object,
    renderer: PropTypes.object
}
export default TestScene;