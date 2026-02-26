import { BrandConfig } from "@/lib/brands";
import React from "react";

interface Props {
  brand: BrandConfig;
  variables: {
    title?: string;
    leftLabel: string;
    leftItems?: string;
    rightLabel: string;
    rightItems?: string;
  };
  width: number;
  height: number;
}

export function ComparisonTemplate({ brand, variables, width, height }: Props) {
  const scale = width / 1200;
  const isVertical = height > width;
  const leftItems = variables.leftItems?.split("\n").filter(Boolean) || [];
  const rightItems = variables.rightItems?.split("\n").filter(Boolean) || [];

  const Column = ({ label, items, isRight }: { label: string; items: string[]; isRight: boolean }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: `${30 * scale}px`,
        background: isRight ? `${brand.colors.primary}15` : `${brand.colors.muted}`,
        borderRadius: `${16 * scale}px`,
        gap: `${16 * scale}px`,
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: `${24 * scale}px`,
          fontWeight: 700,
          color: isRight ? brand.colors.primary : brand.colors.mutedForeground,
          marginBottom: `${8 * scale}px`,
        }}
      >
        {label}
      </div>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: `${10 * scale}px` }}>
          <div
            style={{
              display: "flex",
              fontSize: `${16 * scale}px`,
              color: isRight ? brand.colors.primary : brand.colors.mutedForeground,
            }}
          >
            {isRight ? "✓" : "✗"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: `${18 * scale}px`,
              color: isRight ? brand.colors.foreground : brand.colors.mutedForeground,
              textDecoration: isRight ? "none" : "line-through",
            }}
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  );

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
        gap: `${30 * scale}px`,
      }}
    >
      {/* Brand */}
      <div
        style={{
          display: "flex",
          fontSize: `${14 * scale}px`,
          color: brand.colors.primary,
          letterSpacing: "0.1em",
          textTransform: "uppercase" as const,
        }}
      >
        {brand.name}
      </div>

      {/* Title */}
      {variables.title && (
        <div
          style={{
            display: "flex",
            fontSize: `${isVertical ? 36 : 42}px`,
            fontWeight: 700,
            color: brand.colors.foreground,
            textAlign: "center",
          }}
        >
          {variables.title}
        </div>
      )}

      {/* Columns */}
      <div
        style={{
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
          gap: `${20 * scale}px`,
          width: "100%",
          flex: 1,
          maxHeight: `${height * 0.6}px`,
        }}
      >
        <Column label={variables.leftLabel} items={leftItems} isRight={false} />
        <Column label={variables.rightLabel} items={rightItems} isRight={true} />
      </div>
    </div>
  );
}
