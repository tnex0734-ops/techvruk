"use client";

import React, { Component, ReactNode, Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { RoomScene, RoomSceneProps } from "./RoomScene";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("Room Canvas WebGL error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export interface RoomCanvasProps extends RoomSceneProps {
  className?: string;
  fallback?: ReactNode;
}

export function RoomCanvas({
  cameraPreset,
  activeTarget = null,
  hoveredTarget = null,
  onSelect,
  onHover,
  enableOrbit = false,
  className = "w-full h-full",
  fallback = null,
}: RoomCanvasProps) {
  return (
    <CanvasErrorBoundary fallback={fallback}>
      <Canvas
        className={className}
        frameloop="demand" // On-demand rendering: static scene renders only on resize or state change
        dpr={[1, 1.75]}   // Capped device pixel ratio for performance
        shadows={{ type: THREE.PCFSoftShadowMap }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <RoomScene
            cameraPreset={cameraPreset}
            activeTarget={activeTarget}
            hoveredTarget={hoveredTarget}
            onSelect={onSelect}
            onHover={onHover}
            enableOrbit={enableOrbit}
          />
        </Suspense>
      </Canvas>
    </CanvasErrorBoundary>
  );
}
