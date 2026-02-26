import { BrandConfig } from "@/lib/brands";
import React from "react";

interface Props {
  brand: BrandConfig;
  variables: {
    productName: string;
    tagline: string;
    launchDate?: string;
    cta?: string;
  };
  width: number;
  height: number;
}

export function ProductLaunchTemplate({ brand, variables, width, height }: Props) {
  const scale = width / 1200;
  const isVertical = height > width;

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `radial-gradient(ellipse at center, ${brand.colors.muted} 0%, ${brand.colors.background} 70%)`,
        fontFamily: "Inter",
        padding: `${60 * scale}px`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid dots decoration */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          opacity: 0.05,
          backgroundImage: `radial-gradient(${brand.colors.primary} 1px, transparent 1px)`,
          backgroundSize: `${30 * scale}px ${30 * scale}px`,
        }}
      />

      {/* Launch badge */}
      {variables.launchDate && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: `${8 * scale}px`,
            padding: `${8 * scale}px ${20 * scale}px`,
            borderRadius: `${999}px`,
            border: `1px solid ${brand.colors.primary}44`,
            background: `${brand.colors.primary}15`,
            marginBottom: `${24 * scale}px`,
          }}
        >
          <div style={{ display: "flex", fontSize: `${14 * scale}px`, color: brand.colors.primary, fontWeight: 700 }}>
            🚀 Launching {variables.launchDate}
          </div>
        </div>
      )}

      {/* Product Name */}
      <div
        style={{
          display: "flex",
          fontSize: `${isVertical ? 60 : 72}px`,
          fontWeight: 700,
          color: brand.colors.foreground,
          textAlign: "center",
          lineHeight: 1.05,
          marginBottom: `${16 * scale}px`,
        }}
      >
        {variables.productName}
      </div>

      {/* Tagline */}
      <div
        style={{
          display: "flex",
          fontSize: `${24 * scale}px`,
          color: brand.colors.mutedForeground,
          textAlign: "center",
          maxWidth: `${width * 0.7}px`,
          lineHeight: 1.4,
          marginBottom: `${36 * scale}px`,
        }}
      >
        {variables.tagline}
      </div>

      {/* CTA */}
      {variables.cta && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: `${8 * scale}px`,
            padding: `${16 * scale}px ${48 * scale}px`,
            background: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.accent})`,
            color: "#FFFFFF",
            borderRadius: `${14 * scale}px`,
            fontSize: `${20 * scale}px`,
            fontWeight: 700,
          }}
        >
          {variables.cta}
        </div>
      )}

      {/* Brand */}
      <div
        style={{
          position: "absolute",
          bottom: `${24 * scale}px`,
          display: "flex",
          fontSize: `${14 * scale}px`,
          color: brand.colors.primary,
          opacity: 0.5,
        }}
      >
        {brand.name}
      </div>
    </div>
  );
}
