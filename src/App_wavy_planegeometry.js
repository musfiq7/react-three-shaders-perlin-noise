import React, { useRef } from 'react'
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// const fragmentShader = `...`;
const fragmentShader = `
uniform float testParam;
void main() {
  // infinite color transformation animation
  vec4 pixel = gl_FragCoord;
  //  gl_FragColor = vec4(sin(pixel.x+testParam)  ,cos(pixel.y+testParam), sin(pixel.z +testParam), 1.0);
   gl_FragColor = vec4(fract(sin(pixel.x *0.01 )),1.0 +testParam , fract(cos(pixel.z * 0.01+testParam)), 1.0);
   
  // gl_FragColor = vec4( 0.0,max(sin(testParam), 0.0), 0.0, 1.0);
}`;


// const vertexShader = `...`;




//======= default vertexShader =====
const vertexShader = `
uniform float testParam;
// void main() {
//   vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//   vec4 viewPosition = viewMatrix * modelPosition;
//   vec4 projectedPosition = projectionMatrix * viewPosition;

//   gl_Position = projectedPosition;
// } 


void main() {
  
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
modelPosition.x += sin(modelPosition.y * 4.0 + testParam) * 0.2;

vec4 viewPosition = viewMatrix * modelPosition;

vec4 projectedPosition = projectionMatrix * viewPosition ;

gl_Position = projectedPosition;
}

`

const Flag = () =>{
  const ref = useRef();

  const uniforms = {
    testParam: {type: 'f', value: 1.0}
};

  useFrame((state) => {
    const { clock } = state;
    // ref.current.material.uniforms.testParam.value = clock.getElapsedTime()/20;
    ref.current.material.uniforms.testParam.value +=0.05;
  });
  return(
    <>
    <ambientLight/>
    <directionalLight position={[0,0,-2]} intensity={0.5}/>
    <mesh ref={ref} position={[0,0,0]} scale={2}>
       <planeGeometry args={[1, 1, 32, 32]}/> 
      
      {/* <boxGeometry args={[1.5,1.5,1.5]}/> */}
      {/* <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader}
       wireframe /> */}
      <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader}
         uniforms={uniforms} transparent={true}/>
         
    </mesh>
    </>
  )
}

function App() {
  return (
    <div className='container'>
      <Canvas camera={{ fov: 15, position: [-10, 5,30]}}>
        <Flag/>
        <OrbitControls autoRotate/>
      </Canvas>
    </div>
  )
}

export default App