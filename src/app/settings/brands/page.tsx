"use client";

import { useEffect, useState } from "react";

interface BrandConfig {
  id: string;
  name: string;
  config: {
    colors: Record<string, string>;
    fonts: { heading: { family: string }; body: { family: string } };
  };
}

export default function BrandSettingsPage() {
  const [brands, setBrands] = useState<BrandConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/brands")
      .then((r) => r.json())
      .then((data) => {
        setBrands(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading brands...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Brand Settings</h1>
        <p className="text-muted-foreground text-sm">All Stellae brand configurations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {brands.map((brand) => (
          <div key={brand.id} className="border border-border rounded-lg bg-card overflow-hidden">
            {/* Color bar */}
            <div
              className="h-2"
              style={{
                background: `linear-gradient(90deg, ${brand.config.colors.primary}, ${brand.config.colors.secondary || brand.config.colors.accent})`,
              }}
            />
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: brand.config.colors.primary }}
                >
                  {brand.name.split(".")[1]?.[0]?.toUpperCase() || "S"}
                </div>
                <div>
                  <div className="font-medium text-sm text-foreground">{brand.name}</div>
                  <div className="text-xs text-muted-foreground">{brand.id}</div>
                </div>
              </div>

              {/* Colors */}
              <div className="mb-3">
                <div className="text-xs font-medium text-muted-foreground mb-1.5">Colors</div>
                <div className="flex gap-1.5 flex-wrap">
                  {Object.entries(brand.config.colors).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-1">
                      <div
                        className="w-5 h-5 rounded border border-border"
                        style={{ background: value }}
                        title={`${key}: ${value}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Fonts */}
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">Fonts</div>
                <div className="text-xs text-foreground">
                  Heading: {brand.config.fonts.heading.family} · Body: {brand.config.fonts.body.family}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
