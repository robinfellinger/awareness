import React, { Component } from 'react';
import * as THREE from "three.js";

import EffectComposer from './test/EffectComposer.js';
import RenderPass from './test/RenderPass.js';
import ShaderPass from './test/ShaderPass.js';
import FilmShader from './test/FilmShader.js';

var composer;
var renderPass;
var shaderPass;

class Postprocessing extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderer: this.renderer,
            scene:this.scene,
            camera:this.camera
        }

    }

    //COMPOSER
    composer = new EffectComposer(this.renderer);

    //PASSES
    renderPass = new RenderPass(this.scene, this.camera);
    composer.addPass(renderPass);

    filmPass = new THREE.ShaderPass(FilmShader);
    composer.addPass(filmPass);
    filmPass.renderToScreen = true;

   // render();

    render(){
        return{
            <div>
            this.composer.render();
            </div>
        }
    }
}

export default Postprocessing;