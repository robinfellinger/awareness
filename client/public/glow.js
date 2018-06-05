


$(document).ready(function() {
    init();
    glowAndCube();
    SetupComposers();

    animate();
});

// Scene-related variables that will be needed throughout various functions.
var camera = null;
var renderer = null;
var scene = null;
var blurScene = null;

var blurComposer = null;
var sceneComposer = null;

// Set up the scene camera, renderer and controls to control the camera.
function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 200;

    renderer = new THREE.WebGLRenderer({alpha:true, logarithmicDepthBuffer: true});



    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.autoClear = false;
    $('#main').append(renderer.domElement);



    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfbfdff);
    blurScene = new THREE.Scene();
    blurScene.background = new THREE.Color(0xfbfdff);

    blurComposer = new THREE.EffectComposer(renderer);
    sceneComposer = new THREE.EffectComposer(renderer);
}

// Set up the main scene, blur scene, and blur mask.
 function glowAndCube() {
    // This cube will be the source from which the glow emanates.
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

    blurScene.add(blurLight);
    blurScene.add(blurLight2);
    //   blurScene.add(new THREE.AmbientLight(0x66ffff, 0.5));
    glowCube1.position.x = -35.5;
    glowCube1.position.y = 12.5;
    blurScene.add(glowCube1);
    glowCube2.position.x = -12;
    glowCube2.position.y = 37.5;
    blurScene.add(glowCube2);
    glowCube3.position.y = 12.5;
    glowCube3.position.x = 11.5;
    blurScene.add(glowCube3);
    glowCube4.position.x = -12;
    glowCube4.position.y = -12.5;
    blurScene.add(glowCube4);
}

// Helper function that will create a cube and cube material based on the function parameters.
// Possible parameters: color, size, opacity, position
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



// Set up THREE.Composer objects to render / blur the scenes.
var SetupComposers = function() {
    // To ensure the alpha channel is preserved while blurring, set the formats of both renderTarget1 and renderTarget2 to RGBA for the blur composer.
    blurComposer.renderTarget2.texture.format = blurComposer.renderTarget1.texture.format = THREE.RGBAFormat;

    // Create a couple blur passes to blur the regular scene output. Note that each one of these objects will have a horizontal blur pass and a vertical blur pass.
    var blur1Passes = blurShaderPasses(window.innerWidth, window.innerHeight);
    var blur2Passes = blurShaderPasses(window.innerWidth / 2, window.innerHeight / 2);

    var blurPass = new THREE.RenderPass(blurScene, camera);
    blurPass.clear = true;
    blurPass.clearAlpha = 0;

    blurComposer.addPass(blurPass);
    blurComposer.addPass(blur1Passes.horizontalPass);
    blurComposer.addPass(blur1Passes.verticalPass);
    blurComposer.addPass(blur2Passes.horizontalPass);
    blurComposer.addPass(blur2Passes.verticalPass);

    // Set up a simple shader that will overlay the blurred scene image over the regular scene image.
    var overlayShader = {
        uniforms: {
            tDiffuse: { type: "t", value: 0, texture: null }, // The base scene buffer
            tOverlay: { type: "t", value: 1, texture: null } // The glow scene buffer
        },

        vertexShader: $('#simpleVertex').html(),
        fragmentShader: $('#overlayFrag').html()
    };

    var scenePass = new THREE.RenderPass(scene, camera);
    scenePass.clear = true;

    overlayShader.uniforms["tOverlay"].value = blurComposer.renderTarget2;
    var overlayPass = new THREE.ShaderPass(overlayShader);
    overlayPass.renderToScreen = true;

    sceneComposer.addPass(scenePass);
    sceneComposer.addPass(overlayPass);
}

// This function simply creates a pair of THREE.ShaderPass objects (horizontal and vertical passes).
// Since we are using the THREEJS composer object, the blur shader uniforms must be specifically named to fit into the THREEJS composer pipeline.
// In a THREEJS composer, each pass takes in the result of the previous pass via a texture called 'tDiffuse'.
function blurShaderPasses(h,v) {
    var HBlurShader = {
        uniforms: {
            tDiffuse: { type: "t", value: null },
            h: { type: "f", value: 1.0 / h }
        },
        vertexShader: $('#simpleVertex').html(),
        fragmentShader: $('#horizontalBlurFrag').html()
    };

    var VBlurShader = {
        uniforms: {
            tDiffuse: { type: "t", value: null },
            v: { type: "f", value: 1.0 / v }
        },
        vertexShader: $('#simpleVertex').html(),
        fragmentShader: $('#verticalBlurFrag').html()
    };

    var HBlur = new THREE.ShaderPass(HBlurShader);
    var VBlur = new THREE.ShaderPass(VBlurShader);

    return { horizontalPass: HBlur, verticalPass: VBlur };
}

function renderScene() {


    blurComposer.render();
    sceneComposer.render();
}

function animate() {
    requestAnimationFrame(animate);

    renderScene();
}