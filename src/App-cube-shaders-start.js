import React, { useRef } from 'react'
import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// const fragmentShader = `...`;
const fragmentShader = `void main() {
  gl_FragColor = vec4(0.0, 0.8, 1.0, 1.0);
}`;

// const vertexShader = `...`;
// const vertexShader = `void main() {
//   vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//   modelPosition.y += sin(modelPosition.x * 6.0) * 0.2;

//   vec4 viewPosition = viewMatrix * modelPosition;
//   vec4 projectedPosition = projectionMatrix * viewPosition;

//   gl_Position = projectedPosition;
// }
// `; 


//======= default vertexShader =====
const vertexShader = `
void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}

`

const Cube = () =>{
  const ref = useRef();
  return(
    <>
    <ambientLight/>
    <mesh ref={ref} position={[0,0,0]}>
      <boxGeometry/>
      <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} />
    </mesh>
    </>
  )
}

function App() {
  return (
    <div className='container'>
      <Canvas>
        <Cube/>
        <OrbitControls/>
      </Canvas>
    </div>
  )
}

export default App