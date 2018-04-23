////////////////////////////////////////////////////////////////////////////////////
//// MODEL


import * as THREE from 'three'
// import alphaTexture from '../../../../assets/textures/stripes_gradient.jpg';

export default scene => {
    const group = new THREE.Group();

    // const subjectGeometry = deformGeometry(new THREE.IcosahedronGeometry(10, 2));
    // let sphereGeometry = new THREE.SphereGeometry( 200, 60, 30);
    const subjectGeometry = new THREE.SphereGeometry( 11, 32, 32 );
    const subjectMaterial = new THREE.MeshStandardMaterial({ color: "#fff", transparent: true, side: THREE.DoubleSide, alphaTest: 0.5 });


    const subjectMesh = new THREE.Mesh(subjectGeometry, subjectMaterial);

    // const subjectWireframe = new THREE.LineSegments(
    //     new THREE.EdgesGeometry(subjectGeometry),
    //     new THREE.LineBasicMaterial()
    // );

    group.add(subjectMesh);
    // group.add(subjectWireframe);
    scene.add(group);

    group.rotation.z = Math.PI/4;

    const speed = 0.02;
    const textureOffsetSpeed = 0.02;

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