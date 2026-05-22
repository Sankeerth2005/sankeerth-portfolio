"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Animated Point Grid ─────────────────────────────────────
function PointGrid() {
  const pointsRef = useRef<THREE.Points>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  const [geometry, count] = useMemo(() => {
    const size = 28;
    const divisions = 48;
    const positions: number[] = [];
    const step = size / divisions;
    for (let i = 0; i <= divisions; i++) {
      for (let j = 0; j <= divisions; j++) {
        positions.push(
          -size / 2 + i * step,
          -size / 2 + j * step,
          0
        );
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return [geo, (divisions + 1) * (divisions + 1)];
  }, []);

  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    void main() {
      vec3 pos = position;
      float wave1 = sin(pos.x * 0.45 + uTime * 0.28) * 0.22;
      float wave2 = cos(pos.y * 0.35 + uTime * 0.20) * 0.18;
      float wave3 = sin((pos.x + pos.y) * 0.25 + uTime * 0.15) * 0.12;
      pos.z = wave1 + wave2 + wave3;
      
      // Subtle mouse repulsion
      vec2 diff = pos.xy - uMouse * 12.0;
      float dist = length(diff);
      float strength = smoothstep(4.0, 0.0, dist) * 0.6;
      pos.z += strength;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      float size = 1.2 + (pos.z + 0.5) * 0.5;
      gl_PointSize = clamp(size, 0.6, 2.2);
    }
  `;

  const fragmentShader = `
    void main() {
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;
      float alpha = (0.5 - dist) * 2.0;
      gl_FragColor = vec4(0.063, 0.725, 0.506, alpha * 0.18);
    }
  `;

  useFrame(({ clock, mouse }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uMouse.value.set(mouse.x, mouse.y);
    if (pointsRef.current) {
      pointsRef.current.rotation.x = -0.25 + mouse.y * 0.04;
      pointsRef.current.rotation.y = mouse.x * 0.04;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

// ─── Ambient Glow Sphere ─────────────────────────────────────
function AmbientGlow() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#10b981") },
    }),
    []
  );

  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor;
    uniform float uTime;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
      float pulse = 0.5 + 0.5 * sin(uTime * 0.4);
      float alpha = fresnel * 0.12 * (0.8 + pulse * 0.2);
      gl_FragColor = vec4(uColor, alpha);
    }
  `;

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.03;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <mesh ref={meshRef} position={[2, 0.5, -3]}>
      <sphereGeometry args={[3.5, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

// ─── Second Glow (offset for depth) ──────────────────────────
function AmbientGlow2() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#0ea5e9") },
    }),
    []
  );

  const vertexShader = `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor;
    uniform float uTime;
    varying vec3 vNormal;
    void main() {
      float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
      float pulse = 0.5 + 0.5 * sin(uTime * 0.3 + 1.5);
      float alpha = fresnel * 0.06 * (0.7 + pulse * 0.3);
      gl_FragColor = vec4(uColor, alpha);
    }
  `;

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = -clock.getElapsedTime() * 0.025;
    }
  });

  return (
    <mesh ref={meshRef} position={[-3, -1, -4]}>
      <sphereGeometry args={[2.8, 24, 24]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

// ─── Scene Wrapper ────────────────────────────────────────────
function Scene() {
  return (
    <>
      <PointGrid />
      <AmbientGlow />
      <AmbientGlow2 />
    </>
  );
}

// ─── Mouse Spotlight ──────────────────────────────────────────
function CursorSpotlight() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty(
        "--mouse-x",
        `${e.clientX}px`
      );
      document.documentElement.style.setProperty(
        "--mouse-y",
        `${e.clientY}px`
      );
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div className="cursor-spotlight pointer-events-none" />;
}

// ─── Premium Background ───────────────────────────────────────
export default function PremiumBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#050505]">
      {/* Radial gradient blobs (CSS) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 60% 40%, rgba(16,185,129,0.035) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 20% 70%, rgba(14,165,233,0.025) 0%, transparent 65%)",
        }}
      />

      {/* Three.js Canvas */}
      {mounted && (
        <Canvas
          className="three-bg"
          camera={{ position: [0, 0, 6], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: "high-performance",
          }}
        >
          <Scene />
        </Canvas>
      )}

      {/* Mouse cursor spotlight */}
      <CursorSpotlight />
    </div>
  );
}
