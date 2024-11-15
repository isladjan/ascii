# ASCII Effect

An ASCII effect for THREE.js and post-processing.

This module implements an ASCII art post-processing effect using Three.js and GLSL shaders. It transforms a rendered scene into an ASCII representation by mapping pixel brightness to a set of ASCII characters. The effect generates a texture containing specified ASCII characters using an HTML canvas, which the shader samples to replace image pixels with characters (a much better solution in terms of performance than using actual text). Customizable parameters include the character set, font, font size, cell size, color, and inversion option.

Note: The Original three/examples/jsm library also includes an ASCII effect, but I would recommend avoiding it because it’s too slow and likely not intended for production use.

Take a peek at [demo1](https://isladjan.com/lab/ascii1/) and [demo2](https://isladjan.com/lab/ascii2/)

![Produce_0-ezgif com-crop](https://github.com/user-attachments/assets/8e93405d-8fdd-4189-a59b-c69a5a55978a)
![ascii2](https://github.com/user-attachments/assets/7dcd2547-00d6-4401-9f78-95d3f3234fa0)

This effect is based on the work of [cieplak/AsciiEffect.js](https://gist.github.com/cieplak/0f1f615b0f245cccbea34c15d8d09cb6) and [emilwidlund/ASCII](https://github.com/emilwidlund/ASCII)
<br />

# Requirements
To run this project, you'll need the following:
- three.js
- [postprocessing](https://github.com/pmndrs/postprocessing)
<br />


# Installation
``` 
npm install

//run example
npx vite
npx vite build
npx vite preview
```
<br />


# How to use
Grab ascii.js or the minified version and set it up according to the example in index.html.
```javascript
import { EffectComposer, RenderPass, EffectPass } from "postprocessing";
import { ASCIIEffect } from './asciiEffect.min.js' 

const asciiEffect = new ASCIIEffect({ 
    fontSize: 35, 
    cellSize: 16,
    invert: false, 
    color: "#ffffff", 
    characters: ` .:,'-^=*+?!|0#X%WM@`
});

composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new EffectPass(camera, asciiEffect));
```
<br />

# License
This project is licensed under the MIT License.