////////////////////////////////////////////////////////////////////////////////////
//// MODEL
import floor from './floor.png';
import * as THREE from 'three'
var TWEEN = require('@tweenjs/tween.js');

// import alphaTexture from '../../../../assets/textures/stripes_gradient.jpg';

export default scene => {

    var cRot = 0.0;
    var tRot = 0.01;
    const group = new THREE.Group();
    const subjectGeometry = new THREE.SphereGeometry( 8, 32, 32 );
    const subjectMaterial = new THREE.MeshLambertMaterial({ color: "#d3d2e1", transparent: true, side: THREE.DoubleSide, alphaTest: 0.5 });


     const subjectMesh = new THREE.Mesh(subjectGeometry, subjectMaterial);
    subjectMesh.castShadow = true;
    subjectMesh.geometry.dynamic = true;

    group.add(subjectMesh);
   //  group.add(subjectWireframe);
    scene.add(group);
    drawShape();
    drawFloor();
    group.rotation.z = Math.PI/4;

    const speed = 0.02;
    const textureOffsetSpeed = 0.02;


    // group.position.set(10,10,0);
    let position = { x : 0, y: 10 };
    // let target = { x : 0, y: 2 };
    let tween = new TWEEN.Tween(position)
        .to({x: 0, y: -0.5, rotation: 0}, 3000)
        .delay(900*cRot)
        .easing(TWEEN.Easing.Elastic.Out)
        .onUpdate(function(){
            group.position.x = position.x;
            group.position.y = position.y;
        });




    function rotate(){
        subjectMesh.rotateY += 500;

        //subjectMesh.position.x += 0.1;

    }


    let tweenBack = new TWEEN.Tween(position)
        .to({x: 0, y: 0.*cRot, rotation: 0}, 3000)
        .delay(900*cRot)
        .easing(TWEEN.Easing.Elastic.Out)
        .onUpdate(function(){
            group.position.x = position.x;
            group.position.y = position.y;
        });

    tween.chain(tweenBack);
    tweenBack.chain(tween);
    tween.start();

//creates random parameter for more realistic animations
function wakov(){
    if(Math.floor(Math.random()< 0.01)){
        if(tRot > 400){
            tRot = 0;
        }else{
            tRot += Math.floor(Math.random() * .1) + 5.25;

        }
    }
     cRot+=(tRot-cRot)/100000;
    //console.log(cRot);
}





/////////////////////////////////////////////////////////////////////////////
////// PARTICLES


/////////////////////////////////////////////////////////////////////////////
////// SHADOW (FLOOR)
    function drawFloor(){


        var planeGeometry = new THREE.PlaneGeometry( 2000, 2000 );
        var planeMaterial = new THREE.ShadowMaterial();
        planeMaterial.opacity = 0.2;

        var plane = new THREE.Mesh( planeGeometry, planeMaterial );
        plane.position.set(0,-17,0);
        plane.rotation.x = Math.PI / -1.7;

        // object3d.castShadow = true;
        plane.receiveShadow = true;
        console.log("PLANE");
        scene.add( plane );

    }

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



    function drawShape(){


        var x = 0, y = 0;

        var heartShape = new THREE.Shape();

      //  heartShape.moveTo( 100,100 );
      //   heartShape.bezierCurveTo( 100, 100, 100, 200);
     //   heartShape.bezierCurveTo( 100, 200, 200, 200);
     //   heartShape.bezierCurveTo( 200, 200, 200, 100);
     //   heartShape.bezierCurveTo( 200, 100, 100, 100);
        var material1 = new THREE.LineBasicMaterial({
            color: 0x0000ff,

        });

        const part1 = makeGradientCube(0xadebff, 0xEDB2D9, 0.5,0.1,16, 1);
        part1.position.z = 0;
        part1.position.x = -11;
        part1.position.y = 3;
        scene.add( part1 );

        const part2 = makeGradientCube(0xadebff, 0xEDB2D9, 0.5,0.1,16, 1);
        part2.position.z = 0;
        part2.position.x = 4.5;
        part2.position.y = 3;
        scene.add( part2 );

        const part3G = new THREE.BoxGeometry(16, 0.5, 0.1);
        const part3M = new THREE.MeshPhongMaterial({ color: "#adebff" });
        const part3 = new THREE.Mesh(part3G, part3M);
        part3.position.z = 0;
        part3.position.x = -3.19;
        part3.position.y = -4.8;
        scene.add( part3 );

        const part4G = new THREE.BoxGeometry(16, 0.5, 0.1);
        const part4M = new THREE.MeshPhongMaterial({ color: "#EDB2D9" });
        const part4 = new THREE.Mesh(part4G, part4M);
        part4.position.z = 0;
        part4.position.x = -3.19;
        part4.position.y = 10.8;
        scene.add( part4 );






        var geometry = new THREE.ShapeGeometry( heartShape );
        var material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("img/eye.jpg") });
        var mesh = new THREE.Mesh( geometry, material ) ;
        scene.add( mesh );
    }
    function update(time) {
        const angle = time*speed;
        group.rotation.y = angle;
        particlemove();
        const scale = (Math.sin(angle*8)+6.4)/5;
        rotate();

    }

/////////////////////////////////////////////////////////////////////////////
////// PARTICLES

    var particleSphere;
    var mesh2;
    var particleVertices;
    particles();
// CREATE PARTICLES
    function particles(){
        var geometry = new THREE.SphereGeometry(110, 40, 40);
        var material = new THREE.PointsMaterial({size: (Math.random()*0.2+0.09), color: 0xbababa, opacity: 0.2});

        particleSphere = new THREE.Points(geometry, material);
        meshitup(particleSphere);
    }
// FUNCTION THAT CREATES A PARTICLE SYSTEM OUT OF BOX GEOMETRY
    function meshitup(obj){

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
    }

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

/////////////////////////////////////////////////////////////////////////////
////// UPDATE COMPONENT
    Math.easeOutCubic = function (t, b, c, d) {
        t /= d;
        t--;
        return c*(t*t*t + 1) + b;
    };

    function update(time) {

        const angle = time*speed;
        group.rotation.y = angle;
        if (particleSphere) {
            particlemove();
        }
        const scale = (Math.sin(angle*8)+6.4)/5;
        subjectMesh.geometry.verticesNeedUpdate = true;
        subjectMesh.geometry.normalsNeedUpdate = true;
        // group.position.set(0, (tangle), 0);


        // let tangleSPEED = 0;
        // if(tangle <= -2 ){
        //     tangle +=0.02;
        //     tangleSPEED+=2;
        // }else {
        //     tangleSPEED =0;
        //     tangle -=0.01;
        // }
        // tween.update();
        wakov();
       TWEEN.update();

    }
    return {
        update
    }
}