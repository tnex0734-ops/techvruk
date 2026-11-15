"use client";

import React, { Component, ReactNode, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { MascotPixelShaderPlane } from "./MascotPixelShader";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class MascotCanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("Mascot Canvas WebGL Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export interface MascotCanvasProps {
  introProgress?: number;
  scrollExitProgress?: number;
  reducedMotion?: boolean;
  pointerX?: number;
  pointerY?: number;
  isHeroActive?: boolean;
  className?: string;
}

function ImageFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src="/mascot-hero/taushik-mascot-hero-cutout.webp"
        alt="Taushik Chandana 3D Mascot"
        className="h-full w-auto max-h-[78svh] object-contain select-none drop-shadow-sm"
      />
    </div>
  );
}

export function MascotCanvas({
  introProgress = 1.0,
  scrollExitProgress = 0.0,
  reducedMotion = false,
  pointerX = 0,
  pointerY = 0,
  isHeroActive = true,
  className = "w-full h-full",
}: MascotCanvasProps) {
  // If user prefers reduced motion or WebGL is disabled, show clean static image
  if (reducedMotion) {
    return <ImageFallback />;
  }

  return (
    <MascotCanvasErrorBoundary fallback={<ImageFallback />}>
      <Canvas
        className={className}
        frameloop={isHeroActive ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, 6.2],
          fov: 30,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <MascotPixelShaderPlane
            introProgress={introProgress}
            scrollExitProgress={scrollExitProgress}
            reducedMotion={reducedMotion}
            pointerX={pointerX}
            pointerY={pointerY}
          />
        </Suspense>
      </Canvas>
    </MascotCanvasErrorBoundary>
  );
}

