////////////////////////////////////////////////////////////////////////////////////
//// ALL SCENE LIGHTNING



import * as THREE from 'three'

export default scene => {

    const lightIn = new THREE.PointLight("#ff00ff", 2, 0.0, 0.01);
    const lightFront = new THREE.DirectionalLight( 0xffffff, 0.3 );
    const lightOut = new THREE.AmbientLight( 0x404040, 3 );

    lightOut.position.set(40,20,40);
    lightIn.position.set(-110,-100,-190);
    lightFront.position.set(40,40,40);


    addPlaneShadow();

    scene.add(lightIn);
    scene.add(lightOut);
    scene.add(lightFront);

    const rad = 80;


    function addPlaneShadow(){
        const planeShadow = new THREE.DirectionalLight( 0xffffff, 0.2 );//("#f0eef3", 5, 900, 2);
        planeShadow.position.set(0,40,40);
        let helper = new THREE.DirectionalLightHelper( planeShadow, 5 );
        planeShadow.shadowDarkness = 0.1;
        planeShadow.castShadow = true;
        planeShadow.shadowCameraVisible = true;
        scene.add(helper);
        scene.add(planeShadow);

        planeShadow.shadow.mapSize.width = 512;  // default
        planeShadow.shadow.mapSize.height = 512; // default
        planeShadow.shadow.camera.near = 0.5;    // default
        planeShadow.shadow.camera.far = 120;     // default


    }
    function update(time) {
        // const x = rad * Math.sin(time*0.2)
        // lightOut.position.x = x;
    }

    return {
        update
    }
}