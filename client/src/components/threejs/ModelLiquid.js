//////////////////////////////////////////////////////////////////////////////////////////
/////MODEL COMPONENT
/////RECEIVES: colorproperties: modelcolor (default) and rgbColors (in percent)
////           rotationSpeed
////           bounceFrequence ()



import React, { Component } from 'react';
import * as THREE from 'three'
import three from 'three';
import PropTypes from 'prop-types';
var TWEEN = require('@tweenjs/tween.js');
//var TWEEN = require('@tweenjs/tween.js');
var time = 0;
var mesh = null;
var warpVector = null;


var config = {
    size: 60,
    speed: 90,
    radius: 90,
    widthSeg: 20,
    heightSeg: 60,
};

var rowsAndCols = 120;

class Model extends Component {

    constructor(props){
        super(props);
        this.state = {
            mColor: this.props.modelColor,
            colorUpdate: false,
            rgbColors: {r: 0, g: 90, b: 0},
            bFrequence: this.props.bounceFrequence,
        }

    }
    componentWillReceiveProps(){

    }

    componentDidMount() {

        var geometry = new THREE.SphereGeometry(
            config.radius,
            config.widthSeg,
            config.heightSeg);

        var mat = new THREE.MeshLambertMaterial({
            color: new THREE.Color("hsl(90%, 90%, 90%)"),
            transparent: true,
            side: THREE.DoubleSide,
            alphaTest: 0.5
        });

        mesh = new THREE.Mesh(geometry, mat);
        mesh.castShadow = true;
        mesh.geometry.dynamic = true;
        mesh.material.needsUpdate = true;
        this.context.scene.add(mesh);

        warpVector = new THREE.Vector3(0, 200, 0);
        console.log(mesh.geometry.vertices);

    }





    componentDidUpdate() {


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