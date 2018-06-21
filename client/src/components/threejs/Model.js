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
var mesh = null;
var particleSphere = null;
var particleVertices = null;
var particleVertices1 = null;
var mesh2 = null;
var mesh3 = null;


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

    componentDidMount() {

        var geometry = new THREE.SphereGeometry( 8, 32, 32 );
        var mat = new THREE.MeshLambertMaterial({ color: new THREE.Color("hsl(90%, 90%, 90%)"), transparent: true, side: THREE.DoubleSide, alphaTest: 0.5 });

        mesh = new THREE.Mesh(geometry, mat);
        mesh.castShadow = true;
        mesh.geometry.dynamic = true;
        mesh.material.needsUpdate = true;


        drawFloor(this.context.scene);
        // drawShape(this.context.scene);


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
            var xPlus=7; //move rectangle along x-axis
            const part1 = makeGradientCube(0xadebff, 0xEDB2D9, 0.5,0.1,16, 1);
            part1.position.z = 0;
            part1.position.x = -11+xPlus;
            part1.position.y = 3;
            mScene.add( part1 );

            const part2 = makeGradientCube(0xadebff, 0xEDB2D9, 0.5,0.1,16, 1);
            part2.position.z = 0;
            part2.position.x = 4.5+xPlus;
            part2.position.y = 3;
            mScene.add( part2 );

            const part3G = new THREE.BoxGeometry(16, 0.5, 0.1);
            const part3M = new THREE.MeshPhongMaterial({ color: "#adebff" });
            const part3 = new THREE.Mesh(part3G, part3M);
            part3.position.z = 0;
            part3.position.x = -3.19+xPlus;
            part3.position.y = -4.8;
            mScene.add( part3 );

            const part4G = new THREE.BoxGeometry(16, 0.5, 0.1);
            const part4M = new THREE.MeshPhongMaterial({ color: "#EDB2D9" });
            const part4 = new THREE.Mesh(part4G, part4M);
            part4.position.z = 0;
            part4.position.x = -3.19+xPlus;
            part4.position.y = 10.8;
            mScene.add( part4 );


        }



        // Set up the main scene, blur scene, and blur mask.
        function glowAndCube(scene) {
            // This cube will be the source from which the glow emanates.
            // let cubeGroup = new Object3D;
            var cube1 = createCube({
                size1: 3,
                size2: 53,
                size3: 0.1,
                color: 0xFFFFFF
            });

            var cube2 = createCube({
                size1: 44,
                size2: 3,
                size3: 0.1,
                color: 0xFFFFFF
            });

            var cube3 = createCube({
                size1: 3,
                size2: 53,
                size3: 0.1,
                color: 0xFFFFFF
            });

            var cube4 = createCube({
                size1: 44,
                size2: 3,
                size3: 0.1,
                color: 0xFFFFFF
            });
            // cubeGroup.add(cube1, cube2, cube3, cube4);

            // This is the cube that represents the actual glow of the first cube we created.
            // Notice its size is slightly bigger than the source cube. The size can be adjusted creating a smaller/larger glow.
            var glowCube1 = createCube({
                size1: 8,
                size2: 58,
                size3: 1,
                color: 0xFFFFFF
            });

            var glowCube2 = createCube({
                size1: 44,
                size2: 8,
                size3: 1,
                color: 0xFFFFFF
            });

            var glowCube3 = createCube({
                size1: 8,
                size2: 58,
                size3: 1,
                color: 0xFFFFFF
            });

            var glowCube4 = createCube({
                size1: 44,
                size2: 8,
                size3: 1,
                color: 0xFFFFFF
            });




            // Set up a point light in the main scene.
            var light = new THREE.PointLight( 0xff00ff ,1.4);
            light.position.set( -20, 90, 50 );

            // Mirror the same light in the blur scene.
            var blurLight = new THREE.PointLight( 0xff00ff,1.4);
            blurLight.position.set( -20, 90, 50 );

            var light2 = new THREE.PointLight( 0x00ffff ,1.4);
            light2.position.set( -20, -90, 50 );

            // Mirror the same light in the blur scene.
            var blurLight2 = new THREE.PointLight( 0x00ffff,1.4);
            blurLight2.position.set( -20, -90, 50 );



            scene.add(light);
            scene.add(light2);
//    scene.add(new THREE.AmbientLight(0x66ffff, 0.5));
            cube1.position.x = -35.5;
            cube1.position.y = 12.5;
            scene.add(cube1);
            cube2.position.x = -12;
            cube2.position.y = 37.5;
            scene.add(cube2);
            cube3.position.y = 12.5;
            cube3.position.x = 11.5;
            scene.add(cube3);
            cube4.position.x = -12;
            cube4.position.y = -12.5;
            scene.add(cube4);
        }
        function createCube(params) {
            var cubeGeometry = new THREE.CubeGeometry(params.size1, params.size2, params.size3);
            var cubeMaterial = new THREE.MeshLambertMaterial({
                color: params.color,
                opacity: params.opacity != undefined ? params.opacity : 1.0,
                transparent: false,
                shading: THREE.SmoothShading
            });

            var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);


            cube.position.y = 38;

            return cube;
        }
       //  function drawShape(mScene){
       //
       //      const part1 = makeGradientCube(0x33ccff, 0xcf309a, 0.5,0.1,16, 1);
       //      part1.position.z = 0;
       //      part1.position.x = -11;
       //      part1.position.y = 3;
       //    //  mScene.add( part1 );
       //
       //      const part2 = makeGradientCube(0x33ccff, 0xcf309a, 0.5,0.1,16, 1);
       //      part2.position.z = 0;
       //      part2.position.x = 4.5;
       //      part2.position.y = 3;
       //   //   mScene.add( part2 );
       //
       //      const part3G = new THREE.BoxGeometry(16, 0.5, 0.1);
       //      const part3M = new THREE.MeshPhongMaterial({ color: "#33ccff", emissive: 0x33ccff, emissiveIntensity: 1});
       //      const part3 = new THREE.Mesh(part3G, part3M);
       //      part3.position.z = 0;
       //      part3.position.x = -3.19;
       //      part3.position.y = -4.8;
       // //     mScene.add( part3 );
       //
       //      const part4G = new THREE.BoxGeometry(16, 0.5, 0.1);
       //      const part4M = new THREE.MeshPhongMaterial({ color: "#cf309a", emissive: 0xcf309a, emissiveIntensity: 1, specular: 0xcf309a, shininess: 100});
       //      const part4 = new THREE.Mesh(part4G, part4M);
       //      part4.position.z = 0;
       //      part4.position.x = -3.19;
       //      part4.position.y = 10.8;
       //   //   mScene.add( part4 );
       //  }
/////////////////////////////////////////////////////////////////////////////
////// PARTICLES
          particles(this.context.scene);

// CREATE PARTICLES
        function particles(scene){
            var geometry = new THREE.SphereGeometry(110, 40, 40);
            var material = new THREE.PointsMaterial({size: (Math.random()*0.2+0.09), color: 0xbababa, opacity: 0.2});

            particleSphere = new THREE.Points(geometry, material);
            meshitup(particleSphere, scene);
        }
// FUNCTION THAT CREATES A PARTICLE SYSTEM OUT OF BOX GEOMETRY
        function meshitup(obj, scene){

            var geometry2 = new THREE.Geometry();
            particleVertices = obj.geometry.vertices;

            particleVertices.forEach(function (p){
                var particle = new THREE.Vector3(p.x*Math.random(), p.y, p.z);
                particle.yp = particle.y;
                particle.xp = particle.x;

                particle.vy = 0.00005 + Math.random() * 0.05;
                geometry2.vertices.push(particle);
            });
            mesh2 = new THREE.Points(geometry2, obj.material);
            mesh2.sortParticles = true;
            scene.add(mesh2);


            var geometry3 = new THREE.Geometry();
            particleVertices1 = obj.geometry.vertices;

            particleVertices1.forEach(function (p){
                var particle1 = new THREE.Vector3(p.x*Math.random(), p.y, p.z);
                particle1.yp = particle1.y;
                particle1.xp = particle1.x;

                particle1.vy = 0.00005 + Math.random() * 0.05;
                geometry3.vertices.push(particle1);
            });
            mesh3 = new THREE.Points(geometry3, obj.material);
            mesh3.sortParticles = true;
            scene.add(mesh3);
        }


/////////////////////////////////////////////////////////////////////////////
////// SHADOW (FLOOR)
        function drawFloor(model){


            var planeGeometry = new THREE.PlaneGeometry( 2000, 2000 );
            var planeMaterial = new THREE.ShadowMaterial();
            planeMaterial.opacity = 0.08; // shadow intensity

            var plane = new THREE.Mesh( planeGeometry, planeMaterial );
            plane.position.set(0,-18,0);
            plane.rotation.x = Math.PI / -1.7;
            plane.castShadow = true;
            plane.receiveShadow = true;
            plane.name = "PLANE";
            model.add(plane);
            // console.log(model);
        }

    }
    componentDidUpdate() {
        const { rotationSpeed } = this.props;
        // mesh.rotation.z = rotationSpeed;
        const {mColor} = this.props;

        // MOVES PARTICLES
        function particlemove(){

            mesh2.rotation.y -=0.0002;
            mesh2.rotation.z -=0.0002;
            particleVertices = mesh2.geometry.vertices;


            particleVertices.forEach(function(particle){

                var yTop = particle.yp+600;
                var yBottom = particle.yp-600;

                if(particle.x > particle.xp+window.innerWidth){
                    particle.x = particle.xp;
                }
                if(particle.y > particle.yp+window.innerHeight){
                    particle.y = particle.yp;
                }

                var num = Math.floor(Math.random()*2) + 1;
                num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
                particle.x +=num/200;
                particle.y -= num/100;
            });
            mesh2.geometry.verticesNeedUpdate = true;

        }
        function wabbewobbel(){
        mesh.geometry.vertices.forEach(function(particle){
            if(particle.x > particle.xp+window.innerWidth){
                particle.x = particle.xp;
            }
            var num = Math.random()*0.02 + 0.005;
            // var num = Math.floor(Math.random()*2) + 1;
            //  num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
            particle.x += num;
            particle.y -= num;
        });
            mesh2.geometry.verticesNeedUpdate = true;



            mesh3.rotation.y -=0.0002;
            mesh3.rotation.z -=0.0002;
            particleVertices1 = mesh3.geometry.vertices;
            // moveParticles();
    function moveParticles(){
    particleVertices1.forEach(function(particle1){

        var yTop = particle1.yp+600;
        var yBottom = particle1.yp-600;

        if(particle1.x > particle1.xp+window.innerWidth){
            particle1.x = particle1.xp;
        }
        if(particle1.y > particle1.yp+window.innerHeight){
            particle1.y = particle1.yp;
        }

        var num = Math.random()*0.02 + 0.005;
        particle1.x -= num;
        particle1.y += num;
    });
    mesh3.geometry.verticesNeedUpdate = true;
}

        }

        wabbelWobbel2();

        function wabbelWobbel2(){
            for (let ix = 0; ix < mesh.geometry.vertices.length; ix++) {
                for (let iz = 0; iz < mesh.geometry.vertices.length; iz++) {
                    // let vert = new Vector3()
                    // vert.x = ix * this.SEPERATION - ((this.WIDTH * this.SEPERATION) / 2)
                    // vert.y = (Math.cos((ix / this.WIDTH) * Math.PI * 6) + Math.sin((iz / this.HEIGHT) * Math.PI * 6))
                    // vert.z = iz * this.SEPERATION - ((this.HEIGHT * this.SEPERATION) / 2)
                    // this.particleGeometry.vertices.push(vert)
                    // console.log("wabbelwobbbbbel");
                }
            }

        }
        function gameLoop(){


            TWEEN.update();
            if (particleSphere) {
                particlemove();
            }
        }

        gameLoop();
        wabbewobbel();
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