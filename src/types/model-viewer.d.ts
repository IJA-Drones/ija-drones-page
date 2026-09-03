import React from "react";

type ModelViewerAttributes = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement> & {
    src?: string;
    alt?: string;
    "shadow-intensity"?: string;
    "shadow-softness"?: string;
    exposure?: string;
    "environment-image"?: string;
    "camera-orbit"?: string;
    "min-camera-orbit"?: string;
    "max-camera-orbit"?: string;
    "field-of-view"?: string;
    "disable-zoom"?: boolean;
    "interaction-prompt"?: string;
    loading?: string;
    ar?: boolean;
    autoplay?: boolean;
    "camera-controls"?: boolean;
    "auto-rotate"?: boolean;
    "auto-rotate-delay"?: number;
    "rotation-per-second"?: string;
  },
  HTMLElement
>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerAttributes;
    }
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerAttributes;
    }
  }
}