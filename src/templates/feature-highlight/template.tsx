import { BrandConfig } from "@/lib/brands";
import React from "react";

interface Props {
  brand: BrandConfig;
  variables: {
    title: string;
    description?: string;
    bullets?: string;
  };
  width: number;
  height: number;
}

export function FeatureHighlightTemplate({ brand, variables, width, height }: Props) {
  const scale = width / 1200;
  const isVertical = height > width;
  const bulletList = variables.bullets?.split("\n").filter(Boolean) || [];

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        background: brand.colors.background,
        fontFamily: "Inter",
        overflow: "hidden",
      }}
    >
      {/* Left / Top - Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: `${50 * scale}px`,
          flex: isVertical ? "1" : "1.2",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: `${16 * scale}px`,
            fontWeight: 700,
            color: brand.colors.primary,
            textTransform: "uppercase" as const,
            letterSpacing: "0.15em",
            marginBottom: `${16 * scale}px`,
          }}
        >
          {brand.name}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: `${isVertical ? 40 : 48}px`,
            fontWeight: 700,
            color: brand.colors.foreground,
            lineHeight: 1.15,
            marginBottom: `${16 * scale}px`,
          }}
        >
          {variables.title}
        </div>

        {variables.description && (
          <div
            style={{
              display: "flex",
              fontSize: `${20 * scale}px`,
              color: brand.colors.mutedForeground,
              lineHeight: 1.5,
              marginBottom: `${24 * scale}px`,
            }}
          >
            {variables.description}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: `${12 * scale}px` }}>
          {bulletList.map((bullet, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: `${10 * scale}px` }}>
              <div
                style={{
                  width: `${8 * scale}px`,
                  height: `${8 * scale}px`,
                  borderRadius: "50%",
                  background: brand.colors.primary,
                  flexShrink: 0,
                  display: "flex",
                }}
              />
              <div style={{ display: "flex", fontSize: `${18 * scale}px`, color: brand.colors.foreground }}>
                {bullet}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right / Bottom - Visual area */}
      <div
        style={{
          display: "flex",
          flex: "1",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${brand.colors.muted} 0%, ${brand.colors.background} 100%)`,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            width: `${200 * scale}px`,
            height: `${200 * scale}px`,
            borderRadius: `${24 * scale}px`,
            background: `linear-gradient(135deg, ${brand.colors.primary}33 0%, ${brand.colors.accent}33 100%)`,
            border: `2px solid ${brand.colors.primary}44`,
            alignItems: "center",
            justifyContent: "center",
            fontSize: `${48 * scale}px`,
          }}
        >
          ✦
        </div>
      </div>
    </div>
  );
}
