# ASCII Effect

An ASCII effect for THREE.js and post-processing (using vanilla THREE.js).

The three/examples/jsm library also includes an ASCII effect, but I would recommend avoiding it because it’s too slow and likely not intended for production use.

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

npx vite
npx build
npx vite preview
```
<br />


# Usage
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