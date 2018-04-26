import React, { Component } from 'react';
import * as THREE from 'three'
import three from 'three';
import PropTypes from 'prop-types';
var TWEEN = require('@tweenjs/tween.js');
//var TWEEN = require('@tweenjs/tween.js');
var mesh = null;
class Model extends Component {

    constructor(props){
        super(props);
        this.state = {
            mColor: this.props.modelColor,
        }

    }
    componentDidMount() {
        console.log(this.context);
        console.log("MODELLLLs");
        var geometry = new THREE.SphereGeometry( 8, 32, 32 );
        console.log("COLOR" +this.state.mColor);
        var mat = new THREE.MeshLambertMaterial({ color: this.state.mColor, transparent: true, side: THREE.DoubleSide, alphaTest: 0.5 });
        mesh = new THREE.Mesh(geometry, mat);
        mesh.castShadow = true;
        mesh.geometry.dynamic = true;
        this.context.scene.add(mesh);



        // mesh.material.color.setHex( this.state.mColor );

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
        drawFloor(this.context.scene);
        drawShape(this.context.scene);


        function makeGradientCube(c1, c2, w, d, h, opacity){
            if(typeof opacity === 'undefined')opacity = 1.0;
            if(typeof c1 === 'number')c1 = new THREE.Color( c1 );
            if(typeof c2 === 'number')c2 = new THREE.Color( c2 );

            var cubeGeometry = new THREE.BoxGeometry(w, h, d);




            var cubeMaterial = new THREE.MeshPhongMaterial({
                vertexColors:THREE.VertexColors
            });

            if(opacity < 1.0){
                cubeMaterial.opacity = opacity;
                cubeMaterial.transparent = true;
            }

            for(var ix=0;ix<12;++ix){
                if(ix==4 || ix==5){ //Top edge, all c2
                    cubeGeometry.faces[ix].vertexColors = [c2,c2,c2];
                }
                else if(ix==6 || ix==7){ //Bottom edge, all c1
                    cubeGeometry.faces[ix].vertexColors = [c1,c1,c1];
                }
                else if(ix%2 ==0){ //First triangle on each side edge
                    cubeGeometry.faces[ix].vertexColors = [c2,c1,c2];
                }
                else{ //Second triangle on each side edge
                    cubeGeometry.faces[ix].vertexColors = [c1,c1,c2];
                }
            }

            return new THREE.Mesh(cubeGeometry, cubeMaterial);
        }
        function drawShape(mScene){

            const part1 = makeGradientCube(0xadebff, 0xEDB2D9, 0.5,0.1,16, 1);
            part1.position.z = 0;
            part1.position.x = -11;
            part1.position.y = 3;
            mScene.add( part1 );

            const part2 = makeGradientCube(0xadebff, 0xEDB2D9, 0.5,0.1,16, 1);
            part2.position.z = 0;
            part2.position.x = 4.5;
            part2.position.y = 3;
            mScene.add( part2 );

            const part3G = new THREE.BoxGeometry(16, 0.5, 0.1);
            const part3M = new THREE.MeshPhongMaterial({ color: "#adebff" });
            const part3 = new THREE.Mesh(part3G, part3M);
            part3.position.z = 0;
            part3.position.x = -3.19;
            part3.position.y = -4.8;
            mScene.add( part3 );

            const part4G = new THREE.BoxGeometry(16, 0.5, 0.1);
            const part4M = new THREE.MeshPhongMaterial({ color: "#EDB2D9" });
            const part4 = new THREE.Mesh(part4G, part4M);
            part4.position.z = 0;
            part4.position.x = -3.19;
            part4.position.y = 10.8;
            mScene.add( part4 );
        }

/////////////////////////////////////////////////////////////////////////////
////// SHADOW (FLOOR)
        function drawFloor(model){


            var planeGeometry = new THREE.PlaneGeometry( 2000, 2000 );
            var planeMaterial = new THREE.ShadowMaterial();
            planeMaterial.opacity = 0.2;

            var plane = new THREE.Mesh( planeGeometry, planeMaterial );
            plane.position.set(0,-18,0);
            plane.rotation.x = Math.PI / -1.7;
            plane.castShadow = true;
            plane.receiveShadow = true;
            plane.name = "PLANE";
            model.add(plane);
            console.log(model);
        }

    }
    componentDidUpdate() {
        console.log(this.state.mColor);
        const {mColor} = this.props;

         // console.log(this.state.mColor);

        function gameLoop(){
            TWEEN.update();

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