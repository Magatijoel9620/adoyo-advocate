"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function ScaleObject() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      state.pointer.x * 0.23,
      2.2,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -state.pointer.y * 0.12,
      2.2,
      delta,
    );
  });
  const brass = new THREE.MeshStandardMaterial({
    color: "#ad8751",
    metalness: 0.76,
    roughness: 0.26,
  });
  const dark = new THREE.MeshStandardMaterial({
    color: "#343a38",
    metalness: 0.48,
    roughness: 0.32,
  });
  return (
    <Float speed={0.7} rotationIntensity={0.06} floatIntensity={0.12}>
      <group ref={group} position={[0, -0.1, 0]} scale={0.94}>
        <mesh position={[0, -1.23, 0]} material={dark}>
          <cylinderGeometry args={[1.02, 1.18, 0.18, 64]} />
        </mesh>
        <mesh position={[0, -1.1, 0]} material={brass}>
          <cylinderGeometry args={[0.76, 0.9, 0.1, 64]} />
        </mesh>
        <mesh position={[0, -0.32, 0]} material={brass}>
          <cylinderGeometry args={[0.12, 0.2, 1.55, 32]} />
        </mesh>
        <mesh position={[0, 0.49, 0]} material={brass}>
          <sphereGeometry args={[0.2, 32, 32]} />
        </mesh>
        <mesh
          position={[0, 0.42, 0]}
          rotation={[0, 0, Math.PI / 2]}
          material={brass}
        >
          <cylinderGeometry args={[0.075, 0.075, 2.55, 24]} />
        </mesh>
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.98, 0.22, 0]}>
            <mesh position={[0, -0.48, 0]} material={brass}>
              <cylinderGeometry args={[0.025, 0.025, 0.9, 16]} />
            </mesh>
            <mesh position={[0, -0.96, 0]} material={dark}>
              <cylinderGeometry args={[0.43, 0.51, 0.1, 48]} />
            </mesh>
            <mesh position={[0, -0.9, 0]} material={brass}>
              <torusGeometry args={[0.43, 0.025, 10, 48]} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 1.05, 0]} material={brass}>
          <octahedronGeometry args={[0.16, 0]} />
        </mesh>
      </group>
    </Float>
  );
}
export default function ThreeScene() {
  return (
    <div
      className="scene-canvas"
      aria-label="Interactive three-dimensional balance scales illustration"
      role="img"
    >
      <Canvas
        dpr={[1, 1.35]}
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 5, 4]} intensity={3.2} />
        <pointLight position={[-3, 0, 3]} intensity={35} color="#d9b779" />
        <ScaleObject />
        <ContactShadows
          position={[0, -1.48, 0]}
          opacity={0.34}
          scale={4}
          blur={2.5}
          far={3}
        />
      </Canvas>
    </div>
  );
}
