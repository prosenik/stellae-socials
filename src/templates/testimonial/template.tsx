import { BrandConfig } from "@/lib/brands";
import React from "react";

interface Props {
  brand: BrandConfig;
  variables: {
    quote: string;
    author: string;
    role?: string;
  };
  width: number;
  height: number;
}

export function TestimonialTemplate({ brand, variables, width, height }: Props) {
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
        background: brand.colors.background,
        fontFamily: "Inter",
        padding: `${60 * scale}px`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent bar on left */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "15%",
          bottom: "15%",
          width: `${6 * scale}px`,
          background: brand.colors.primary,
          display: "flex",
        }}
      />

      {/* Quote mark */}
      <div
        style={{
          display: "flex",
          fontSize: `${120 * scale}px`,
          color: brand.colors.primary,
          opacity: 0.3,
          lineHeight: 0.8,
          marginBottom: `${isVertical ? 20 : 10}px`,
          fontWeight: 700,
        }}
      >
        &ldquo;
      </div>

      {/* Quote text */}
      <div
        style={{
          display: "flex",
          fontSize: `${isVertical ? 32 : 36}px`,
          fontWeight: 400,
          color: brand.colors.foreground,
          textAlign: "center",
          lineHeight: 1.4,
          maxWidth: `${width * 0.8}px`,
          marginBottom: `${32 * scale}px`,
        }}
      >
        {variables.quote}
      </div>

      {/* Divider */}
      <div
        style={{
          width: `${60 * scale}px`,
          height: `${3 * scale}px`,
          background: brand.colors.primary,
          marginBottom: `${24 * scale}px`,
          display: "flex",
        }}
      />

      {/* Author */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: `${6 * scale}px`,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: `${22 * scale}px`,
            fontWeight: 700,
            color: brand.colors.foreground,
          }}
        >
          {variables.author}
        </div>
        {variables.role && (
          <div
            style={{
              display: "flex",
              fontSize: `${16 * scale}px`,
              color: brand.colors.mutedForeground,
            }}
          >
            {variables.role}
          </div>
        )}
      </div>

      {/* Brand */}
      <div
        style={{
          position: "absolute",
          bottom: `${24 * scale}px`,
          display: "flex",
          fontSize: `${14 * scale}px`,
          color: brand.colors.primary,
          opacity: 0.6,
        }}
      >
        {brand.name}
      </div>
    </div>
  );
}
