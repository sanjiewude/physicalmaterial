import * as THREE from "three";

import { universalMaterial } from "./universalMaterial.js";
import { RGBELoader } from './js/RGBELoader.js';
import { OrbitControls } from "./js/OrbitControls.js";
// import { GUI } from "./js/lil-gui.module.min.js";
import "./panel.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 5);
controls.update();

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

const axisHelper = new THREE.AxesHelper( 5 );
scene.add( axisHelper );

const light = new THREE.AmbientLight(0xffffff, 0.3); //两个值，颜色，强度
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 1, 150, 2); //四个值，颜色，强度，距离，衰减
pointLight.position.set(-4,-3,-3,);
scene.add(pointLight);
const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
scene.add( pointLightHelper );

scene.background = new THREE.Color(0xc2c2c2);
scene.environment = new RGBELoader().load('./textures/brown_photostudio_02_1k.hdr' , function () {
  scene.environment.mapping = THREE.EquirectangularReflectionMapping;
});


// const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16); //第一个值是圆环半径，第二个值是管道半径，第三个值是分段数量，第四个值是横截面分段数量
// // const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
// const material = universalMaterial;
// const torusKnot = new THREE.Mesh(geometry, material);
// scene.add(torusKnot);
// console.log(torusKnot);

const geometry = new THREE.SphereGeometry( 1, 32, 16 );
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const material = universalMaterial;
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

camera.position.z = 5;

window.onresize = function () {
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth/window.innerHeight;
  // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
  // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix();
};

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // torusKnot.rotation.x += 0.01;
  // torusKnot.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
