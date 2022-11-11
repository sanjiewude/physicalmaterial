import * as THREE from 'three';

import {GUI} from "./js/lil-gui.module.min.js"
import { universalMaterial ,textureRepeat} from "./universalMaterial.js"; 

var material = universalMaterial;
var gui = new GUI();

var params = new (function () {
  this.U=textureRepeat.x;
  this.V=textureRepeat.y;
  this.颜色 = material.color; //颜色
  this.自发光 = material.emissive; //自发光颜色
  this.自发光强度 = material.emissiveIntensity; //自发光强度
  this.金属度 = material.metalness; //金属度
  this.粗糙度 = material.roughness; // 粗糙度
  this.是否透明 = material.transparent; //是否透明
  this.不透明度 = material.opacity; //不透明度
  this.透明涂层强度 = material.clearcoat; //透明图层强度
  this.透明涂层粗糙度 = material.clearcoatRoughness; //透明图层的粗糙度
  this.折射率IOR = material.ior; //折射率
  this.反射率 = material.reflectivity; //反射率，用于非金属的
  this.透光率 = material.transmission; //透光率
  this.光泽颜色 = material.sheenColor; //光泽的颜色，用于织物或者布料的
  this.光泽层强度 = material.sheen; //光泽层的强度
  this.光泽层粗糙度 = material.sheenRoughness; //光泽层的粗糙度
  this.非金属高光反射颜色 = material.specularColor; //非金属高光反射颜色
  this.非金属高光反射强度 = material.specularIntensity; //非金属材质高光反射强度
  this.厚度 = material.thickness; //表面下的体积的厚度。
  this.面 = material.side; //定义将要渲染哪一面
  this.线框 = material.wireframe; //是否显示为线框
  this.平面着色 = material.flatShading; //是否平面着色
  this.雾 = material.fog; //材质是否受雾影响
  this.是否渲染材质颜色 = material.colorWrite; //是否渲染材质的颜色
  this.深度测试 = material.depthTest; //深度测试
  this.深度缓冲 = material.depthWrite; //深度缓冲
  this.α测试 = material.alphaTest; //如果不透明度低于此值，则不会渲染
  this.是否点着色 = material.vertexColors; //是否使用顶点着色
  this.是否可见 = material.visible; //此材质是否可见。
})();

const UV = gui.addFolder("UV");
const basic = gui.addFolder("基础属性");
const trans = gui.addFolder("透明属性");
const nonMetal = gui.addFolder("非金属属性");
const coating = gui.addFolder("透明涂层");
const fabric = gui.addFolder("织物属性");
const advanced = gui.addFolder("高级属性");

UV.add(params, "U").onChange((e) => {
  //放射光强度。调节发光颜色。默认为1。
  textureRepeat.x= e;
});
UV.add(params, "V").onChange((e) => {
  //放射光强度。调节发光颜色。默认为1。
  textureRepeat.y= e;
});

basic.addColor(params, "颜色").onChange((e) => {
  //点击颜色面板，e为返回的色值
  material.color.set(e);
});
basic.addColor(params, "自发光").onChange((e) => {
  //点击颜色面板，e为返回的色值
  material.emissive.set(e);
});
basic.add(params, "自发光强度",0,1).onChange((e) => {
  //放射光强度。调节发光颜色。默认为1。
  material.emissiveIntensity= e;
});
basic.add(params, "金属度", 0, 1).onChange((e) => {
  //非金属材质，如木材或石材，使用0，金属使用1，通常没有中间值。
  material.metalness = e;
});
basic.add(params, "粗糙度", 0, 1).onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.roughness = e;
});
trans.add(params, "是否透明").onChange((e) => {
  //定义此材质是否透明
  material.transparent = e;
});
trans.add(params, "不透明度", 0, 1).onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.opacity = e;
});
trans.add(params, "透光率", 0, 1).onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.transmission = e;
});
trans.add(params, "折射率IOR", 0, 2.333).onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.ior = e;
});

nonMetal.add(params, "反射率", 0, 1).onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.reflectivity = e;
});
nonMetal.addColor(params, "非金属高光反射颜色").onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.specularColor.set(e);
});
nonMetal.add(params, "非金属高光反射强度", 0, 1).onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.specularIntensity=e;
});

coating.add(params, "透明涂层强度", 0, 1).onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.clearcoat = e;
});
coating.add(params, "透明涂层粗糙度", 0, 1).onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.clearcoatRoughness = e;
});

fabric.addColor(params, "光泽颜色").onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.sheenColor.set(e);
});
fabric.add(params, "光泽层强度", 0, 1).onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.sheen = e;
});
fabric.add(params, "光泽层粗糙度", 0, 1).onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.sheenRoughness = e;
});

advanced.add(params, "厚度",-100,100).onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.thickness = e;
});
advanced.add(params, "面").options(['THREE.FrontSide', 'THREE.BackSide', 'THREE.DoubleSide']).onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  if(e == 'THREE.FrontSide') {
    material.side = THREE.FrontSide;
}  else if(e == 'THREE.BackSide'){
  material.side = THREE.BackSide;
}
else {
  material.side = THREE.DoubleSide;
}
});
advanced.add(params, "线框").onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.wireframe = e;
});
advanced.add(params, "平面着色").onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.flatShading = e;
});
advanced.add(params, "雾").onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.fog = e;
});
advanced.add(params, "是否渲染材质颜色").onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.colorWrite = e;
});
advanced.add(params, "深度测试").onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.depthTest = e;
});
advanced.add(params, "深度缓冲").onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.depthWrite = e;
});
advanced.add(params, "α测试", 0, 1).onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.alphaTest = e;
});
advanced.add(params, "是否点着色").onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.vertexColors = e;
});
advanced.add(params, "是否可见").onChange((e) => {
  //0表示平滑的镜面反射，1表示完全漫反射
  material.visible = e;
});