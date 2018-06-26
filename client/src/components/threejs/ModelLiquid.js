//////////////////////////////////////////////////////////////////////////////////////////
/////LIQUIDMODEL COMPONENT
/////RECEIVES: colorproperties: modelcolor (default) and rgbColors (in percent)
////           rotationSpeed
////           bounceFrequence ()

import React, { Component } from 'react';
import * as THREE from 'three'
import PropTypes from 'prop-types';
var TWEEN = require('@tweenjs/tween.js');

var time = 0;
var vStart = new THREE.Vector2(0, 0);
var mesh = null;
var wavePlane = null;
var warpVector = null;
var warpVector2 = null;
var cRot = 0.3;
var tRot = 0.8;
var mouseTimer = 0;
var next = false;
var config = {
    frequenz: 1.4, //1.4 for wobble waves 0.2 for sublte rings 0.1 for extreme rings
    speed: 120, // + slower
    radius: 28,
    widthSeg:100, //resolution x
    heightSeg: 100, // resolution y
    magnitude:8,
    waveDepth: 0.01
};

class Model extends Component {

    constructor(props){
        super(props);
        this.state = {
            mColor: this.props.modelColor,
            colorUpdate: false,
            rgbColors: {r: 90, g: 0, b: 0},
        }

    }
    componentWillReceiveProps(){
        if(!(this.props.modelColor === this.state.mColor)){
            updateColor(this.props.rgbColors);
        }

        function updateColor(rgb){
            var updateColor = new THREE.Color("rgb("+rgb.r+"%, "+rgb.g+"%, "+rgb.b+"%)");
            var tweenColor = new TWEEN.Tween(mesh.material.color)
                .easing(TWEEN.Easing.Quartic.In)
                .delay(2000)
                .onUpdate(function() {
                    mesh.material.color = updateColor;
                    mesh.material.alphaTest= 0.5;
                }).start();
        }


    }

    bounce(){
        let position = { x : 0, y: 3 };
        let tween = new TWEEN.Tween(position)
            .to({x: 0, y: -0.6, rotation: 0}, 2000)
            .delay(1500)
            .easing(TWEEN.Easing.Elastic.Out)
            .onUpdate(function(){
                mesh.position.x = position.x;
                mesh.position.y = position.y;
            });
        let tweenBack = new TWEEN.Tween(position)
            .to({x: 0, y: 0., rotation: 0}, 2000)
            .delay(1500)
            .easing(TWEEN.Easing.Elastic.Out)
            .onUpdate(function(){
                mesh.position.x = position.x;
                mesh.position.y = position.y;
            });

        tween.chain(tween);
        // tweenBack.chain(tween);
        tween.start();
    }

    createPlane(scene){
        const geometry = new THREE.PlaneGeometry(70, 140, 170, 170); //width height seg seg
        "#C8ABF3"
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(0xA58EF3),
            // specular: 0xFFFFFF,
            // emissive: 0x000000,
            shininess: 0.1,
            shading: THREE.FlatShading,
            side: THREE.DoubleSide,

        });

        wavePlane = new THREE.Mesh(geometry, material);
        wavePlane.rotation.x = -1.52 * Math.PI;
        wavePlane.rotation.z = 20.5;
        wavePlane.position.set(0, -26, -23);
        vStart = new THREE.Vector2(0, 0);

        // wavePlane.position.set(20, 20, -70);

        scene.add(wavePlane);


    }
    componentDidMount() {

        var rectLight = new THREE.RectAreaLight( 0xffffff, 2000,  9000, 9000 );
        rectLight.position.set( 5, 100, 0 );
        rectLight.lookAt(0,0,0);
        // this.context.scene.add( rectLight )

        this.createPlane(this.context.scene);
        var geometry = new THREE.SphereGeometry(
            config.radius,
            config.widthSeg,
            config.heightSeg);
"#C8D1F1"
        var mat = new THREE.MeshPhongMaterial({
            color: new THREE.Color(0xBAE3F1),
            transparent: true,
            // side: THREE.DoubleSide,
            shininess: 2,
            // shading: THREE.FlatShading,
            alphaTest: 0.5,
            // opacity: 0.97,
        });

        mesh = new THREE.Mesh(geometry, mat);
        mesh.castShadow = true;
        mesh.receiveLights = true;
        mesh.geometry.dynamic = true;
        mesh.material.needsUpdate = true;
        // mesh.rotation.y=-200;
        mesh.scale.set(0.4, 0.4, 0.4);
        // mesh.rotation.y -= 200;
        this.context.scene.add(mesh);

        warpVector = new THREE.Vector3(0, 50, 0); //50
        warpVector2 = new THREE.Vector3(20, 120, 0);

        console.log(warpVector);
"#FFC500"
        var light = new THREE.DirectionalLight( 0xFFFBEA, 0.1 );
        light.position.set( 30, 0, 10 );
        let helper = new THREE.DirectionalLightHelper( light, 5 );
        // this.context.scene.add(helper);
        this.context.scene.add( light ); //soft light from the right
        light.target = mesh;


        this.bounce();

        if(this.props.emotion === "joy"){
            console.log("JOYYYY");
        }

    }





componentDidUpdate() {

function waveForPlane(){
    // const { vertices } = wavePlane.geometry;
    const { magnitude, speed } = config;

    for (let i = 0; i < wavePlane.geometry.vertices.length; i++) {
        const v = wavePlane.geometry.vertices[i];
        const dist = new THREE.Vector2(v.x, v.y).sub(vStart);
        v.z = Math.sin(dist.length() / -1 + (time / speed)) * (cRot/2); //2 equals size
    }

    wavePlane.geometry.verticesNeedUpdate = true;
}
function wave(){
    const { vertices } = mesh.geometry;
    const { frequenz, speed, radius, magnitude, waveDepth } = config;

    for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i];
        const dist = v.distanceTo(warpVector);
        let waveToUse = (0.8 + (waveDepth*cRot) * Math.sin(dist / -frequenz + (time/speed*magnitude))) * radius;

        v.normalize().multiplyScalar(waveToUse);

    }

    mesh.geometry.verticesNeedUpdate = true;

    const warpSine = (Math.sin(time/(speed * 8))) * (radius * 2);
    // warpVector.z = warpSine; //comment in to move center of waves point

    mesh.geometry.computeVertexNormals();
    mesh.geometry.computeFaceNormals();
    mesh.geometry.verticesNeedUpdate = true;
    time++;
    }
function wobble(){
        const { vertices } = mesh.geometry;
        const { frequenz, speed, radius } = config;

        for (let i = 0; i < vertices.length; i++) {
            const v = vertices[i];
            const dist = v.distanceTo(warpVector);
            const radian = (0.8 + 0.2 * Math.sin(dist / -80 + (time/(100)))) * 80;
            v.normalize().multiplyScalar(radian);
        }

        mesh.geometry.verticesNeedUpdate = true;

        const warpSine = (Math.sin(time/(speed * 8))) * (80 * 2);
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
function mousemove() {
    var mouseTolerance = 0.5;


    document.onmousemove = function (e) {
        var centerX = window.innerWidth * 0.5;
        var centerY = window.innerHeight * 0.5;
        // var centerZ = window.innerHeight * 0.5;
        let mousePosX = (e.clientX - centerX) / centerX * mouseTolerance;
        let mousePosY = (e.clientY - centerY) / centerY * mouseTolerance;

        setTimeout(function () {
            // mesh.rotation.x -= 0.05 * (mousePosX * -1);
            // mesh.rotation.y += 0.05 * (mousePosY * -1);
        }, 100);
        if(mousePosX < 0 && mousePosY < 0){



        }
        if(mousePosX < 0 && mousePosY > 0){
            //console.log("links unten");
            mouseTimer++;
        }
        if(mousePosX > 0 && mousePosY > 0){
            //console.log("rechts unten");
            mouseTimer++;
        }
        if(mousePosX > 0 && mousePosY < 0){
            //console.log("rechts oben");
            mouseTimer++;
        }
    };
}
mousemove();
function wakov(){
      if(Math.floor(Math.random()< 0.01)){
                if(tRot > 1.5){
                    tRot = 0.3;
                }else{
                    tRot += Math.floor(Math.random() * .1) + 0.25;

       }
      }
                cRot+=(tRot-cRot)/100;
}
function handleEmotions(emotion){
    if(emotion === "anger"){
        //console.log("anger")
    }
    if(emotion === "joy"){
        //console.log("joy")
        if(next === false){
            next = true;
            // setTimeout(function () {
                let position = { x : 0, y: 3 };
                let tween = new TWEEN.Tween(position)
                    .to({x: 0, y: -0.6, rotation: 0}, 1000)
                    // .delay(300)
                    .easing(TWEEN.Easing.Elastic.In)
                    .onUpdate(function(){
                        mesh.position.x = position.x;
                        mesh.position.y = position.y;
                    });
                tween.start();
            // }, 0.005);

            mesh.geometry.computeVertexNormals();
            mesh.geometry.computeFaceNormals();
            mesh.geometry.verticesNeedUpdate = true;
            mesh.geometry.elementsNeedUpdate = true;
            mesh.geometry.normalsNeedUpdate = true;
        }

        if(config.frequenz > 0.7){
            config.frequenz -=0.01;
        }
    }
}

       wakov();//calculates random parameter for animations
       handleEmotions(this.props.emotion);
       wave();
       if(wavePlane){
           waveForPlane();
       }

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