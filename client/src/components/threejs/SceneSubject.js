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
    subjectMesh.geometry.dynamic = true;

    group.add(subjectMesh);
    scene.add(group);
    drawFloor();
    group.rotation.z = Math.PI/4;

    const speed = 0.02;
    const textureOffsetSpeed = 0.02;

    createSprings();





    /**
     * Creates a virtual spring between adjacent vertices in a
     * face. Since vertices are shared between faces
     * in the geometry, the faces are inherently connected to
     * each other
     */
    function createSprings() {

        var sphereFaces = subjectMesh.geometry.faces;

        for(var f = 0; f < sphereFaces.length; f++) {
            var face = sphereFaces[f];

            if(face instanceof THREE.Face3) {

                createSpring(face.a, face.b);
                createSpring(face.b, face.c);
                createSpring(face.c, face.a);

            } else {

                createSpring(face.a, face.b);
                createSpring(face.b, face.c);
                createSpring(face.c, face.d);
                createSpring(face.d, face.a);

            }
        }
    }

    /**
     * Displaces the vertices of a face
     *
     * @param {THREE.Face3|4} face The face to be displaced
     * @param {Number} magnitude By how much the face should be displaced
     */
    function displaceFace(face, magnitude) {

        // displace the first three vertices
        displaceVertex(face.a, magnitude);
        displaceVertex(face.b, magnitude);
        displaceVertex(face.c, magnitude);

        // if this is a face4 do the final one
        if (face instanceof THREE.Face4) {
            displaceVertex(face.d, magnitude);
        }
    }



    /**
     * Creates an individual spring
     *
     * @param {Number} start The index of the vertex for the spring's start
     * @param {Number} end The index of the vertex for the spring's start
     */
    function createSpring(start, end) {
        var sphereVertices = subjectMesh.geometry.vertices;
        var startVertex    = sphereVertices[start];
        var endVertex      = sphereVertices[end];

        // if the springs array does not
        // exist for a particular vertex
        // create it
        if(!startVertex.springs) {
            startVertex.springs = [];

            // take advantage of the one-time init
            // and create some other useful vars
            startVertex.normal = startVertex.clone().normalize();
            startVertex.originalPosition = startVertex.clone();
        }

        // repeat the above for the end vertex
        if(!endVertex.springs) {
            endVertex.springs = [];
            endVertex.normal = startVertex.clone().normalize();
            endVertex.originalPosition = endVertex.clone();
        }

        if(!startVertex.velocity) {
            startVertex.velocity = new THREE.Vector3();
        }

        // finally create a spring
        startVertex.springs.push({

            start   : startVertex,
            end     : endVertex,
            length  : startVertex.length(
                endVertex
            )

        });
    }

    /**
     * Displaces an individual vertex
     *
     * @param {Number} vertex The index of the vertex in the geometry
     * @param {Number} magnitude The degree of displacement
     */
    function displaceVertex(vertex, magnitude) {

        var sphereVertices = subjectMesh.geometry.vertices;

        // add to the velocity of the vertex in question
        // but make sure we're doing so along the normal
        // of the vertex, i.e. along the line from the
        // sphere centre to the vertex
        sphereVertices[vertex].velocity.add(

            sphereVertices[vertex].normal.
            clone().
            multiplyScalar(magnitude)

        );
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
        plane.position.set(0,-40,0);
        plane.rotation.x = Math.PI / -2;

        // object3d.castShadow = true;
        plane.receiveShadow = true;
        console.log("PLANE");
        scene.add( plane );

    }
/////////////////////////////////////////////////////////////////////////////
////// PARTICLES

    var particleSphere;
    var mesh2;
    var particleVertices;
    // particles();
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
    function update(time) {
        const angle = time*speed;
        group.rotation.y = angle;
        if (particleSphere) {
            particlemove();
        }
        const scale = (Math.sin(angle*8)+6.4)/5;
        // updateVertexSprings();
        //
        // // flag that the sphere's geometry has
        // // changed and recalculate the normals
        // sphere.geometry.verticesNeedUpdate = true;
        // sphere.geometry.normalsNeedUpdate = true;
        // sphere.geometry.computeFaceNormals();
        // sphere.geometry.computeVertexNormals();

    }
    return {
        update
    }
}