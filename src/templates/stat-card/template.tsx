import { BrandConfig } from "@/lib/brands";
import React from "react";

interface Props {
  brand: BrandConfig;
  variables: {
    stat1Value: string;
    stat1Label: string;
    stat2Value?: string;
    stat2Label?: string;
    stat3Value?: string;
    stat3Label?: string;
    tagline?: string;
  };
  width: number;
  height: number;
}

export function StatCardTemplate({ brand, variables, width, height }: Props) {
  const scale = width / 1200;
  const isVertical = height > width;

  const stats = [
    { value: variables.stat1Value, label: variables.stat1Label },
    ...(variables.stat2Value ? [{ value: variables.stat2Value, label: variables.stat2Label || "" }] : []),
    ...(variables.stat3Value ? [{ value: variables.stat3Value, label: variables.stat3Label || "" }] : []),
  ];

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
        padding: `${50 * scale}px`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: `${6 * scale}px`,
          background: `linear-gradient(90deg, ${brand.colors.primary}, ${brand.colors.secondary})`,
          display: "flex",
        }}
      />

      {/* Brand */}
      <div
        style={{
          display: "flex",
          fontSize: `${16 * scale}px`,
          fontWeight: 400,
          color: brand.colors.primary,
          letterSpacing: "0.1em",
          textTransform: "uppercase" as const,
          marginBottom: `${isVertical ? 40 : 20}px`,
        }}
      >
        {brand.name}
      </div>

      {/* Tagline */}
      {variables.tagline && (
        <div
          style={{
            display: "flex",
            fontSize: `${28 * scale}px`,
            fontWeight: 700,
            color: brand.colors.foreground,
            marginBottom: `${isVertical ? 60 : 40}px`,
          }}
        >
          {variables.tagline}
        </div>
      )}

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
          gap: `${isVertical ? 40 : 60}px`,
          alignItems: "center",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: `${8 * scale}px`,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: `${isVertical ? 72 : 80}px`,
                fontWeight: 700,
                color: brand.colors.primary,
                lineHeight: 1,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: `${20 * scale}px`,
                fontWeight: 400,
                color: brand.colors.mutedForeground,
                textTransform: "uppercase" as const,
                letterSpacing: "0.05em",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
