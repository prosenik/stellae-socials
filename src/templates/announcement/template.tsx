import { BrandConfig } from "@/lib/brands";
import React from "react";

interface Props {
  brand: BrandConfig;
  variables: {
    headline: string;
    subheadline?: string;
    cta?: string;
  };
  width: number;
  height: number;
}

export function AnnouncementTemplate({ brand, variables, width, height }: Props) {
  const isVertical = height > width;
  const scale = width / 1200;

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${brand.colors.background} 0%, ${brand.colors.muted} 50%, ${brand.colors.background} 100%)`,
        padding: `${60 * scale}px`,
        fontFamily: "Inter",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: `-${100 * scale}px`,
          right: `-${100 * scale}px`,
          width: `${400 * scale}px`,
          height: `${400 * scale}px`,
          borderRadius: "50%",
          background: brand.colors.primary,
          opacity: 0.1,
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: `-${80 * scale}px`,
          left: `-${80 * scale}px`,
          width: `${300 * scale}px`,
          height: `${300 * scale}px`,
          borderRadius: "50%",
          background: brand.colors.primary,
          opacity: 0.08,
          display: "flex",
        }}
      />

      {/* Brand name */}
      <div
        style={{
          display: "flex",
          fontSize: `${18 * scale}px`,
          fontWeight: 400,
          color: brand.colors.primary,
          letterSpacing: "0.1em",
          textTransform: "uppercase" as const,
          marginBottom: `${isVertical ? 40 : 24}px`,
        }}
      >
        {brand.name}
      </div>

      {/* Headline */}
      <div
        style={{
          display: "flex",
          fontSize: `${isVertical ? 56 : 64}px`,
          fontWeight: 700,
          color: brand.colors.foreground,
          textAlign: "center",
          lineHeight: 1.1,
          maxWidth: `${width * 0.85}px`,
          marginBottom: `${20 * scale}px`,
        }}
      >
        {variables.headline}
      </div>

      {/* Subheadline */}
      {variables.subheadline && (
        <div
          style={{
            display: "flex",
            fontSize: `${24 * scale}px`,
            fontWeight: 400,
            color: brand.colors.mutedForeground,
            textAlign: "center",
            maxWidth: `${width * 0.7}px`,
            marginBottom: `${32 * scale}px`,
            lineHeight: 1.4,
          }}
        >
          {variables.subheadline}
        </div>
      )}

      {/* CTA Button */}
      {variables.cta && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: `${14 * scale}px ${40 * scale}px`,
            background: brand.colors.primary,
            color: "#FFFFFF",
            borderRadius: `${12 * scale}px`,
            fontSize: `${20 * scale}px`,
            fontWeight: 700,
          }}
        >
          {variables.cta}
        </div>
      )}
    </div>
  );
}
