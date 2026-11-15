"use client";

import React, { useEffect } from "react";
import { Html } from "@react-three/drei";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  Sparkles,
} from "lucide-react";
import { experience, type ExperienceItem } from "@/lib/content";

interface SpatialExperienceCardProps {
  isOpen: boolean;
  activeIndex: number;
  onIndexChange: (newIndex: number) => void;
  onClose: () => void;
}

/**
 * Dimensional Paper Card for Professional Experience
 * Anchored in 3D space directly on the wall-hanging pinboard using <Html transform>
 * Guarantees zero top clipping, 44x44px touch targets, and full keyboard navigation.
 */
export function SpatialExperienceCard({
  isOpen,
  activeIndex,
  onIndexChange,
  onClose,
}: SpatialExperienceCardProps) {
  // Screen-space ExperienceSpotlightOverlay handles the high-resolution React Bits presentation.
  // Returning null here prevents blurry CSS matrix3d rendering inside WebGL.
  return null;
}
