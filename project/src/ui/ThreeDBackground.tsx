import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Dodecahedron } from '@react-three/drei';
import * as THREE from 'three';

function Shape({ position, color, speed, factor }: { position: THREE.Vector3; color: string; speed: number; factor: number; }) {
  const ref = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() * speed;
      ref.current.rotation.x += 0.005 * speed; // slower rotation
      ref.current.rotation.y += 0.007 * speed;
      ref.current.position.x = position.x + Math.cos(t) * factor;
      ref.current.position.y = position.y + Math.sin(t) * factor;
    }
  });

  return (
    <Dodecahedron ref={ref} args={[1, 0]} position={position}>
      <meshStandardMaterial color={color} roughness={0} emissive={color} emissiveIntensity={0} />
    </Dodecahedron>
  );
}

export default function ThreeDBackground() {
  const shapes = useMemo(() => {
    const temp = [];
    const shapeColors = ['#0b0b0bff', '#0f0f10ff', '#151516ff'];
    for (let i = 0; i < 12; i++) { // fewer shapes
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 30, // smaller spread
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      const color = shapeColors[Math.floor(Math.random() * shapeColors.length)];
      const speed = 0.05 + Math.random() * 0.1; // slower speed
      const factor = 0.5 + Math.random() * 1;    // smaller float
      temp.push({ position, color, speed, factor });
    }
    return temp;
  }, []);

  return (
    <Canvas 
      camera={{ position: [0, 0, 20], fov: 75 }}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, background: '#0a0a1a' }}
    >
      <ambientLight intensity={0} /> {/* softer ambient light */}
      <pointLight position={[20, 20, 20]} intensity={0} color="#080709ff" />
      <pointLight position={[-20, -20, -20]} intensity={0} color="#0c0c0dff" />
      {shapes.map((shapeProps, i) => (
        <Shape key={i} {...shapeProps} />
      ))}
    </Canvas>
  );
}
