//////////////////////////////////////////////////////////////////////////////////////////
/////MODEL COMPONENT
/////RECEIVES: colorproperties: modelcolor (default) and rgbColors (in percent)
////           rotationSpeed
////           bounceFrequence ()


import OrbitControls from 'orbit-controls-es6';
import React, { Component } from 'react';
import * as THREE from 'three'
import three from 'three';
import PropTypes from 'prop-types';
var TWEEN = require('@tweenjs/tween.js');
//var TWEEN = require('@tweenjs/tween.js');
var time = 0;
var mesh = null;
var warpVector = null;
var vStart = null;
var rotationSpeed = 0;
var config = {
    size: 2,
    speed: 120,
    radius:40,
    widthSeg: 20,
    heightSeg: 60,
    magnitude: 20,
};

var rowsAndCols = 120;

class Model extends Component {

    constructor(props){
        super(props);
        this.state = {
            mColor: this.props.modelColor,
            colorUpdate: false,
            rgbColors: {r: 90, g: 0, b: 0},
            bFrequence: this.props.bounceFrequence,
        }

    }
    componentWillReceiveProps(){

    }

    componentDidMount() {
        // color("#ff0000");



        var rectLight = new THREE.RectAreaLight( 0xffffff, 2000,  9000, 9000 );
        rectLight.position.set( 5, 100, 0 );
        rectLight.lookAt(0,0,0);
        this.context.scene.add( rectLight )



        // const controls = new OrbitControls(mesh, this.context.renderer.domElement);
        // controls.enabled = true;
        // controls.maxDistance = 1500;
        // controls.minDistance = 0;



        var geometry = new THREE.SphereGeometry(
            config.radius,
            config.widthSeg,
            config.heightSeg);

        var mat = new THREE.MeshPhongMaterial({
            color: new THREE.Color(0xF3007A),
            transparent: true,
            side: THREE.DoubleSide,
            alphaTest: 0.5
        });

        mesh = new THREE.Mesh(geometry, mat);
        mesh.castShadow = true;
        mesh.receiveLights = true;
        mesh.geometry.dynamic = true;
        mesh.material.needsUpdate = true;
        mesh.scale.set(0.4, 0.4, 0.4);
        mesh.rotation.y += 20;
        this.context.scene.add(mesh);

        warpVector = new THREE.Vector3(0, 200, 0);
        console.log(warpVector);

        var light = new THREE.DirectionalLight( 0xFFC500, 2 );
        light.position.set( 30, 0, 10 );
        let helper = new THREE.DirectionalLightHelper( light, 5 );
        this.context.scene.add(helper);
        this.context.scene.add( light );
        light.target = mesh;







    }





    componentDidUpdate() {



function wave(){
    const { vertices } = mesh.geometry;
    const { size, magnitude, speed, radius } = config;

    for (let i = 0; i < mesh.geometry.vertices.length; i++) {

        const v = mesh.geometry.vertices[i];
        // const dist = new THREE.Vector3(v.x, v.y);//.sub(warpVector)
        // v.z = Math.sin(dist.length() / -size + (time / speed)) * (magnitude);


        const dist = v.distanceTo(warpVector);
        const radian = (0.8 + 0.2 * Math.sin(dist / -size + (time/speed))) * radius;
        v.normalize().multiplyScalar(radian);



    }


    mesh.geometry.computeVertexNormals();
    mesh.geometry.computeFaceNormals();
    mesh.geometry.verticesNeedUpdate = true;
    mesh.geometry.elementsNeedUpdate = true;
    mesh.geometry.normalsNeedUpdate = true;
    time++;
}

    function wobble(){
        const { vertices } = mesh.geometry;
        const { size, speed, radius } = config;

        for (let i = 0; i < vertices.length; i++) {
            const v = vertices[i];
            const dist = v.distanceTo(warpVector);
            const radian = (0.8 + 0.2 * Math.sin(dist / -size + (time/speed))) * radius;
            v.normalize().multiplyScalar(radian);
        }

        mesh.geometry.verticesNeedUpdate = true;

        const warpSine = (Math.sin(time/(speed * 8))) * (radius * 2);
        warpVector.y = warpSine;
        warpVector.x = warpSine;
        warpVector.z = warpSine;

        mesh.geometry.computeVertexNormals();
        mesh.geometry.computeFaceNormals();
        mesh.geometry.verticesNeedUpdate = true;
        mesh.geometry.elementsNeedUpdate = true;
        mesh.geometry.normalsNeedUpdate = true;
        time++;
    }
        wobble();
        // wave();





        function gameLoop(){


            TWEEN.update();

        }

        gameLoop();

    }
    render(){
        return null;
    }

}
const render = () => {
    console.log("animation");
    requestAnimationFrame(render);
    this.loop();
};

Model.contextTypes = {
    scene: PropTypes.object,
    renderer: PropTypes.object
};

export default Model;