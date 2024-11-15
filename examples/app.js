import { WebGLRenderer, Scene, PerspectiveCamera, Mesh, DirectionalLight, MeshStandardMaterial} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer, RenderPass, EffectPass } from "postprocessing";
import { ASCII } from '../ascii.js';
import modelUrl from '/marcus.glb?url'; 
let touchDevice;


export class App {
  constructor() {
    this.container = document.querySelector(".webglCanvas");
    this.canvas = { width: this.container.offsetWidth, height: this.container.offsetHeight };

    if (matchMedia("(pointer: coarse)").matches) touchDevice = true;
    else touchDevice = false;

    this.initThree();
    this.loadModel();
    this.asciiInit();
  }


  initThree() {
    const pixelRatio = window.devicePixelRatio;
    let AA = true;
    if (touchDevice) AA = false;
    if (pixelRatio > 2) AA = false;

    this.renderer = new WebGLRenderer({
      powerPreference: "high-performance",
      alpha: true,
      antialias: AA,
      stencil: false
    });
    this.renderer.setSize(this.canvas.width, this.canvas.height);
    this.container.appendChild(this.renderer.domElement);

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.directLight = new DirectionalLight("#fff", 6.5);
    this.directLight.position.set(0, 0, 7);
    this.directLight.castShadow = false;
    this.scene.add(this.directLight);

    const resizeObserver = new ResizeObserver((en) => { this.onResize(en[0].contentRect) });
    resizeObserver.observe(document.body);
  }



  loadModel() {
    this.loader = new GLTFLoader();
    this.loader.load((modelUrl), (response) => {
      let material = new MeshStandardMaterial({
        metalness: 0.6,
        roughness: 0.4,
      });
      this.figure = new Mesh(response.scene.children[0].geometry, material);
      this.figure.position.set(0, -0, 3.5);
      this.figure.castShadow = false;
      this.figure.receiveShadow = false;
      this.scene.add(this.figure);
      this.animate();
    })
  }


  asciiInit() {
    const asciiEffect = new ASCII({ 
      fontSize: 35, 
      cellSize: 16,
      invert: false, 
      color: "#ffffff", 
      characters: ` .:,'-^=*+?!|0#X%WM@`
    });

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.composer.addPass(new EffectPass(this.camera, asciiEffect));
  }


  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.figure.rotation.y += 0.003;
    this.composer.render(this.scene, this.camera);
  }


  onResize(contentRect) {
    this.canvas = { width: contentRect.width, height: contentRect.height };
    this.camera.aspect = contentRect.width / contentRect.height;
    this.camera.updateProjectionMatrix();
    this.composer.setSize(contentRect.width, contentRect.height);
  }
}