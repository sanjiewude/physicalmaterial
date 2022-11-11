import * as THREE from "three";

//以下定义一个可以普遍使用的材质，通过对其属性值进行调节，达到不同效果
const textureRepeat = new THREE.Vector2;
textureRepeat.x = 1;
textureRepeat.y = 1;
const texture = null;
// const texture1 = null;
// const texture1 = new THREE.TextureLoader().load( './img/Foam Rubber.png' );
// const texture1 = new THREE.TextureLoader().load( './img/Bump Map.jpg' );
const texture1 = new THREE.TextureLoader().load( './img/cgaxis_pbr_14_orange_fabric_3_height.jpg' );
// const texture2 = new THREE.TextureLoader().load( './img/郭智心.png' );
texture1.wrapS = THREE.RepeatWrapping;
texture1.wrapT = THREE.RepeatWrapping;
texture1.repeat =textureRepeat;
// texture1.repeat.set(14, 2 );



const universalMaterial = new THREE.MeshPhysicalMaterial({
  name: "universalMaterial", //对象的可选名称（不必是唯一的）。默认值为空字符串。

  color: 0x555555, //材质的颜色，默认值为白色 0xffffff。
  map: texture, //颜色贴图。可以选择包括一个alpha通道，通常与.transparent 或.alphaTest。默认为null。 纹理贴图颜色由漫反射颜色.color调节。

  emissive: 0x000000, //材质的放射（光）颜色，基本上是不受其他光照影响的固有颜色。默认为黑色。如果你有一个放射贴图，请务必将放射颜色设置为黑色以外的其他颜色。
  emissiveMap: texture, //设置放射（发光）贴图。默认值为null。放射贴图颜色由放射颜色和强度所调节。 如果你有一个放射贴图，请务必将放射颜色设置为黑色以外的其他颜色。
  emissiveIntensity: 1, //放射光强度。调节发光颜色。默认为1。

  metalness: 0, //非金属材质，如木材或石材，使用0，金属使用1，通常没有中间值。 默认值为0。0到1之间的值可用于生锈金属的外观。如果还提供了metalnessMap，则两个值相乘。
  metalnessMap: texture, //该纹理的蓝色通道用于改变材质的金属度。

  roughness: 0, //粗糙度。0表示平滑的镜面反射，1表示完全漫反射。默认值为1。如果还提供roughnessMap，则两个值相乘。
  roughnessMap: texture1, //该纹理的绿色通道用于改变材质的粗糙度。

  transparent: true, //定义此材质是否透明。这对渲染有影响，因为透明对象需要特殊处理，并在非透明对象之后渲染。为true时，通过设置opacity属性来控制材质透明的程度。
  opacity: 1, //材质的透明度。值0表示完全透明，1表示完全不透明。如果材质的transparent属性未设置为true，则材质将保持完全不透明，此值仅影响其颜色。 默认值为1.0。
  alphaMap: texture, //控制不透明度，黑色：完全透明，白色：完全不透明，默认值为null

  normalMap: texture, //法线贴图的纹理
  normalScale: (1, 1), //法线贴图对材质的影响程度。典型范围是0-1。默认值是Vector2设置为（1,1）。
  normalMapType: THREE.ObjectSpaceNormalMap, //法线贴图的类型,选项为THREE.TangentSpaceNormalMap（默认）和THREE.ObjectSpaceNormalMap。

  bumpMap: texture1, //凹凸贴图的纹理,如果定义了法线贴图，则将忽略该贴图。
  bumpScale: 0.01, //凹凸贴图会对材质产生多大影响。典型范围是0-1。默认值为1。

  displacementMap: texture, //置换贴图
  displacementScale: 1, //置换贴图对网格的影响程度（黑色是无位移，白色是最大位移）。如果没有设置位移贴图，则不会应用此值。默认值为1。
  displacementBias: 1, //位移贴图在网格顶点上的偏移量。如果没有设置位移贴图，则不会应用此值。默认值为0

  aoMap: texture, //该纹理的红色通道用作环境遮挡贴图，默认值为null。
  aoMapIntensity: 1, //环境遮挡效果的强度。默认值为1。零是不遮挡效果。

  envMap: texture, //环境贴图，为了能够保证物理渲染准确，您应该添加由PMREMGenerator预处理过的环境贴图，默认为null。
  envMapIntensity: 1, //通过乘以环境贴图的颜色来缩放环境贴图的效果。

  //类似于车漆，碳纤，被水打湿的表面的材质需要在面上再增加一个透明的，具有一定反光特性的面。而且这个面说不定有一定的起伏与粗糙度。Clearcoat可以在不需要重新创建一个透明的面的情况下做到类似的效果。
  clearcoat: 0, //表示clear coat层的强度，范围从0到1，当需要在表面加一层薄薄的半透明材质的时候使用,默认为0。
  clearcoatMap: texture, //这个贴图的红色通道值会与.clearcoat相乘作为整个clear coat的强度值层，默认为null。
  clearcoatNormalMap: texture, //用于为clear coat层设置的独立的法线贴图，默认为null。
  clearcoatNormalScale: (1, 1), //衡量.clearcoatNormalMap影响clear coat层多少的值，由(0,0)到(1,1)，默认为(1,1)。
  clearcoatRoughness: 0, //clear coat层的粗糙度，由0.0到1.0。 默认为0.0
  clearcoatRoughnessMap: texture, //此纹理的绿色通道值会与.clearcoatRoughness相乘，用于改变clear coat的粗糙度，默认为null

  ior: 1.5, //为非金属材质所设置的折射率，范围由1.0到2.333。默认为1.5。

  //为非金属材质提供了更多更灵活的光线反射
  reflectivity: 0.5, //反射率，由0到1。默认为0.5, 相当于折射率1.5。这模拟了非金属材质的反射率。当metalness为1.0时，此属性无效。

  //opacity属性有一些限制:在透明度比较高的时候，反射也随之减少。使用基于物理的透光性.transmission属性可以让一些很薄的透明表面，例如玻璃，变得更真实一些。
  transmission: 0, //透光率或者说透光性，范围从0到1。默认值是0。很薄的透明或者半透明的塑料、玻璃材质即便在几乎完全透明的情况下仍旧会保留反射的光线，透光性属性用于这种类型的材质。当透光率不为0的时候, opacity透明度应设置为1.
  transmissionMap: texture, //此纹理的红色通道会与透光性.transmission相乘最为最终的透光性结果。默认为null。

  //可用于代表布和织物材料
  sheenColor: 0xD9D6D4, //光泽颜色，默认为0xffffff白色。
  sheenColorMap: texture1, //此纹理的RGB通道会与.sheenColor光泽颜色相乘，最终作为光泽颜色结果，默认为null。
  sheen: 0.5, //光泽层的强度,范围是0.0到1.0。默认为0.0。
  sheenRoughness: 0.8, //光泽层的粗糙度，由0.0到1.0。默认值是1.0。
  sheenRoughnessMap: texture1, //此纹理的RGB通道会与.sheenColor光泽颜色相乘，最终作为光泽颜色结果，默认为null。

  specularColor: 0xffffff, //非金属材质在垂直于法线方向观看时的高光反射颜色。默认值为0xffffff，白色。
  specularColorMap: texture, //此纹理的alpha通道将与.specularColor相乘，用于逐像素地控制高光颜色。默认值为null。
  specularIntensity: 1, //用于控制非金属材质高光反射强度的浮点值。漫反射材质对应的值为0。范围从0.0到1.0。 默认值为0.0。
  specularIntensityMap: texture, //此纹理的alpha通道将与.specularIntensity相乘，用于逐像素地控制高光强度。默认值为null。

  thickness: 0, //表面下的体积的厚度。这个值是在网格的坐标空间中给出的。如果该值为0，材料是薄壁的。否则，材料是一个体积边界。默认值是0
  thicknessMap: texture, //一个定义了厚度的纹理，存储在G通道中。这将被乘以.厚度。默认为空

  side: THREE.DoubleSide, //定义将要渲染哪一面,正面，背面或两者。 默认为THREE.FrontSide。其他选项有THREE.BackSide和THREE.DoubleSide。
  wireframe: false, //将几何体渲染为线框。默认值为false（即渲染为平面多边形）。
  flatShading: false, //定义材质是否使用平面着色进行渲染。默认值为false。false表示光滑着色
  fog: true, //材质是否受雾影响。默认为true。
  colorWrite: true, //是否渲染材质的颜色。 这可以与网格的renderOrder属性结合使用，以创建遮挡其他对象的不可见对象。默认值为true。
  depthTest: true, //是否在渲染此材质时启用深度测试。默认为 true。
  depthWrite: true, //渲染此材质是否对深度缓冲区有任何影响。默认为true。
  alphaTest: 0, //设置运行alphaTest时要使用的alpha值。如果不透明度低于此值，则不会渲染材质。默认值为0。
  vertexColors: false, //是否使用顶点着色。默认值为false。
  visible: true, //此材质是否可见。默认为true。
});

export { universalMaterial ,textureRepeat };
