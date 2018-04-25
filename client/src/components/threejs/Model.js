import React, { Component } from 'react';
import * as THREE from 'three'
import three from 'three';
import PropTypes from 'prop-types';
var TWEEN = require('@tweenjs/tween.js');
//var TWEEN = require('@tweenjs/tween.js');

class Model extends Component {
    constructor(props){
        super(props);
        this.state = {

        }

    }
    componentWillMount() {
        console.log(this.context);
        console.log("MODELLLLs");
        var geometry = new THREE.SphereGeometry( 6, 32, 32 );
        var mat = new THREE.MeshLambertMaterial({ color: this.props.color, transparent: true, side: THREE.DoubleSide, alphaTest: 0.5 });
        var mesh = new THREE.Mesh(geometry, mat);
        mesh.castShadow = true;
        mesh.geometry.dynamic = true;
        this.context.scene.add(mesh);


        let position = { x : 0, y: 10 };
        let tween = new TWEEN.Tween(position)
            .to({x: 0, y: -0.5, rotation: 0}, 3000)
            .delay(900)
            .easing(TWEEN.Easing.Elastic.Out)
            .onUpdate(function(){
                mesh.position.x = position.x;
                mesh.position.y = position.y;
            });



        let tweenBack = new TWEEN.Tween(position)
            .to({x: 0, y: 0., rotation: 0}, 3000)
            .delay(900)
            .easing(TWEEN.Easing.Elastic.Out)
            .onUpdate(function(){
                mesh.position.x = position.x;
                mesh.position.y = position.y;
            });

        tween.chain(tweenBack);
        tweenBack.chain(tween);
        tween.start();







        // console.log(mesh);
        drawFloor(this);

/////////////////////////////////////////////////////////////////////////////
////// SHADOW (FLOOR)
        function drawFloor(model){


            var planeGeometry = new THREE.PlaneGeometry( 2000, 2000 );
            var planeMaterial = new THREE.ShadowMaterial();
          //  var planeMaterial = new THREE.MeshLambertMaterial({ color: "#0300e1", transparent: true, side: THREE.DoubleSide, alphaTest: 0.5 });
            planeMaterial.opacity = 0.2;

            var plane = new THREE.Mesh( planeGeometry, planeMaterial );
            plane.position.set(0,-30,0);
            plane.rotation.x = Math.PI / -1.7;

            plane.receiveShadow = true;
            model.context.scene.add(plane);

        }

    }
    componentDidUpdate() {
        function gameLoop(){
            TWEEN.update();
            // requestAnimationFrame(this.gameLoop);
        }

        gameLoop();
    }

    loop(){
        // TWEEN.update();
    }
    render(){
        return null;
       // this.loop();
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