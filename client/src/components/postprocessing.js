import React, { Component } from 'react';
import * as THREE from "three";

import EffectComposer from './EffectComposer.js';
import RenderPass from './RenderPass.js';
import ShaderPass from './ShaderPass.js';
import SepiaShader from './SepiaShader.js';

//THREE.EffectComposer = require('./lib/EffectComposer');
//THREE.RenderPass = require('./lib/RenderPass');
//THREE.ShaderPass = require('./lib/ShaderPass');
//THREE.ShaderPass = require('./lib/SepiaShader');

class Postprocessing extends Component {

    //COMPOSER
    composer = new THREE.EffectComposer(renderer);

    //PASSES
    renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);

    pass1 = new THREE.ShaderPass(THREE.SepiaShader);
    composer.addPass(pass1);
    pass1.renderToScreen = true;

    render(){
        return{
            this.composer.render();
        }
    }
}

export default Postprocessing;