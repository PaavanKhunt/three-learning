import {
  softShadows,
  MeshWobbleMaterial,
  OrbitControls,
  MeshDistortMaterial,
  Sphere,
} from '@react-three/drei';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';

softShadows();
interface BoxProps {
  boxsize: [number, number, number];
  color?: string;
  speed?: number;
  position?: [number, number, number];
}
const Box = (props: BoxProps) => {
  const mesh = useRef<any>(null);
  const [expand, setExpand] = useState(false);

  useFrame(
    () => (mesh.current.rotation.x = mesh.current.rotation.y += props.speed)
  );
  return (
    <mesh
      onClick={() => setExpand(!expand)}
      scale={expand ? [1, 2, 5] : [2, 1, 1]}
      castShadow
      position={props.position}
      ref={mesh}
    >
      <boxBufferGeometry attach="geometry" args={props.boxsize} />
      <MeshWobbleMaterial
        color={props.color}
        speed={props.speed}
        attach="material"
        factor={0.6}
      />
    </mesh>
  );
};
interface CircleProps {
  speed?: number;
  circleSize?: [number, number];
  color?: string;
  position?: [number, number, number];
}
const CircleShape = (props: CircleProps) => {
  const circleMesh = useRef<any>(null);
  const [expand, setExpand] = useState(false);

  useFrame(
    () =>
      (circleMesh.current.rotation.x = circleMesh.current.rotation.y +=
        props.speed)
  );
  return (
    <mesh
      onClick={() => setExpand(!expand)}
      castShadow
      ref={circleMesh}
      scale={expand ? [1, 2, 5] : [2, 1, 1]}
      position={props.position}
    >
      <dodecahedronGeometry attach="geometry" args={props.circleSize} />
      <MeshWobbleMaterial color={props.color} attach="material" factor={0.2} />
    </mesh>
  );
};

function App(props: any) {
  return (
    <>
      <Canvas shadows camera={{ position: [-5, 2, 10], fov: 100 }}>
        <group>
          <ambientLight intensity={0.3} />
          <pointLight position={[-10, 0, -20]} intensity={0.4} />
          <pointLight position={[0, -10, 0]} intensity={1.4} />
          <directionalLight
            castShadow
            position={[0, 10, 0]}
            intensity={0.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-left={-10}
            shadow-camera-right={-10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} color="red" />
          </mesh>
          <Box
            boxsize={[3, 2, 1]}
            color={'yellow'}
            speed={0.002}
            position={[-6, 1, 0]}
          />
          <Box
            boxsize={[-2, 1, -5]}
            position={[-1, 1, 0]}
            color={'pink'}
            speed={0.001}
          />
          <Box
            boxsize={[3, 2, 1]}
            color={'green'}
            speed={0.001}
            position={[8, 1, 0]}
          />
          <CircleShape
            circleSize={[3, 2]}
            speed={0.01}
            color="hotpink"
            position={[2, 7, 1]}
          />
          <mesh>
            <extrudeGeometry attach="geometry" args={[[]]} />
          </mesh>

          <Sphere
            receiveShadow
            visible
            position={[3, -6, 0]}
            args={[1, 16, 200]}
            castShadow
          >
            <MeshDistortMaterial
              color="#00A38D"
              attach="material"
              distort={0.5}
              speed={5}
              roughness={0}
            />
          </Sphere>
        </group>
        <OrbitControls />
      </Canvas>
      <canvas></canvas>
    </>
  );
}

export default App;
