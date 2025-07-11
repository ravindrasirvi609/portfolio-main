"use client";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Globe() {
  const globeRef = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.1;
  });

  const globe = new ThreeGlobe()
    .globeImageUrl(
      "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
    )
    //     .bumpImageUrl(
    //       "https://unpkg.com/three-globe/example/img/earth-topology.png"
    //     )
    //     .nightImageUrl("https://unpkg.com/three-globe/example/img/earth-night.jpg")
    .atmosphereColor("#3a92ff")
    .atmosphereAltitude(0.25);

  return (
    <group ref={globeRef} scale={1.2}>
      <primitive object={globe} />
    </group>
  );
}

export default function GlobeSceneClient() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[1, 1, 1]} />
        <Stars radius={300} depth={60} count={5000} factor={7} saturation={0} />
        <ScrollControls pages={5} damping={0.25}>
          <Globe />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
