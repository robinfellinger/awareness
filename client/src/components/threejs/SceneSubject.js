////////////////////////////////////////////////////////////////////////////////////
//// MODEL
import floor from './floor.png';
import * as THREE from 'three'
// import alphaTexture from '../../../../assets/textures/stripes_gradient.jpg';

export default scene => {
    const group = new THREE.Group();
    const subjectGeometry = new THREE.SphereGeometry( 11, 32, 32 );
    const subjectMaterial = new THREE.MeshLambertMaterial({ color: "#6b6b6b", transparent: true, side: THREE.DoubleSide, alphaTest: 0.5 });


    const subjectMesh = new THREE.Mesh(subjectGeometry, subjectMaterial);
    subjectMesh.castShadow = true;

    group.add(subjectMesh);
    // group.add(subjectWireframe);
    scene.add(group);
    drawShape();
    drawFloor();
    group.rotation.z = Math.PI/4;

    const speed = 0.02;
    const textureOffsetSpeed = 0.02;



    function drawFloor(){


        var planeGeometry = new THREE.PlaneGeometry( 2000, 2000 );
        var planeMaterial = new THREE.ShadowMaterial();
        planeMaterial.opacity = 0.2;

        var plane = new THREE.Mesh( planeGeometry, planeMaterial );
        plane.position.set(0,-40,0);
        plane.rotation.x = Math.PI / -2;

        // object3d.castShadow = true;
        plane.receiveShadow = true;
        console.log("PLANE");
        scene.add( plane );

    }
    function drawShape(){
        var x = 0, y = 0;

        var heartShape = new THREE.Shape();

        heartShape.moveTo( 0,0 );
        // heartShape.bezierCurveTo( 0, 200, 0, 200);
        // heartShape.bezierCurveTo( 6, 0,0, 7,6, 0 );
        // heartShape.bezierCurveTo( 6, 11,0, 15.4, 5, 0 );
        // heartShape.bezierCurveTo( 12, 15.4, 0, 11, 16,0 );
        // heartShape.bezierCurveTo( 16, 7, 0, 0, 10,0 );
        // heartShape.bezierCurveTo( 7, 0,0, 5, 5,0 );

        var geometry = new THREE.ShapeGeometry( heartShape );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var mesh = new THREE.Mesh( geometry, material ) ;
        scene.add( mesh );
    }
    function update(time) {
        const angle = time*speed;
        group.rotation.y = angle;
        particlemove();
        const scale = (Math.sin(angle*8)+6.4)/5;

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










    return {
        update
    }
}