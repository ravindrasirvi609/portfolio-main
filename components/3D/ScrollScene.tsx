"use client"; // ← MUST be first line
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function StarField() {
  return (
    <Stars radius={300} depth={60} count={5000} factor={7} saturation={0} />
  );
}

function Globe() {
  const globeRef = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.1;
  });
  return (
    <group ref={globeRef} scale={1.2}>
      <primitive
        object={new ThreeGlobe()
          .globeImageUrl(
            "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          )
          //     .bumpImageUrl(
          //       "https://unpkg.com/three-globe/example/img/earth-topology.png"
          //     )
          //     .nightImageUrl(
          //       "https://unpkg.com/three-globe/example/img/earth-night.jpg"
          //     )
          .atmosphereColor("#3a92ff")
          .atmosphereAltitude(0.25)}
      />
    </group>
  );
}

export function ScrollScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      className="fixed top-0 left-0 w-full h-full -z-10"
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[1, 1, 1]} />
      <StarField />
      <ScrollControls pages={5} damping={0.25}>
        <Globe />
      </ScrollControls>
    </Canvas>
  );
}
