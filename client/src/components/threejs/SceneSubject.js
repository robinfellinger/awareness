////////////////////////////////////////////////////////////////////////////////////
//// MODEL
import floor from './floor.png';
import * as THREE from 'three'
// import alphaTexture from '../../../../assets/textures/stripes_gradient.jpg';

export default scene => {
    const group = new THREE.Group();

    // const subjectGeometry = deformGeometry(new THREE.IcosahedronGeometry(10, 2));
    // let sphereGeometry = new THREE.SphereGeometry( 200, 60, 30);
    const subjectGeometry = new THREE.SphereGeometry( 11, 32, 32 );
    const subjectMaterial = new THREE.MeshLambertMaterial({ color: "#6b6b6b", transparent: true, side: THREE.DoubleSide, alphaTest: 0.5 });


    const subjectMesh = new THREE.Mesh(subjectGeometry, subjectMaterial);
    subjectMesh.castShadow = true;
    // const subjectWireframe = new THREE.LineSegments(
    //     new THREE.EdgesGeometry(subjectGeometry),
    //     new THREE.LineBasicMaterial()
    // );

    group.add(subjectMesh);
    // group.add(subjectWireframe);
    scene.add(group);
    drawShape();
    drawFloor();
    group.rotation.z = Math.PI/4;

    const speed = 0.02;
    const textureOffsetSpeed = 0.02;

    function drawFloor(){
        var geometry = new THREE.PlaneGeometry( 80, 900, 32 );
        var material = new THREE.MeshLambertMaterial({ color: "#6b6b6b", transparent: true, side: THREE.DoubleSide, alphaTest: 0.5 });

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
        // subjectWireframe.material.color.setHSL( Math.sin(angle*2), 0.5, 0.5 );

        const scale = (Math.sin(angle*8)+6.4)/5;
        // subjectWireframe.scale.set(scale, scale, scale)
    }

    return {
        update
    }
}