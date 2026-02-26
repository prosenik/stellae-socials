"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Asset {
  id: string;
  templateId: string;
  brandId: string;
  platform: string;
  format: string;
  width: number;
  height: number;
  url: string;
  createdAt: string;
}

export default function ExportsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/exports")
      .then((r) => r.json())
      .then((data) => {
        setAssets(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading exports...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Exports</h1>
        <p className="text-muted-foreground text-sm">Your generated assets ready for download</p>
      </div>

      {assets.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <div className="text-4xl mb-3">↓</div>
          <p>No exports yet. Generate assets from the editor.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-card"
            >
              <div className="flex items-center gap-3">
                <div className="w-16 h-10 rounded bg-muted flex items-center justify-center overflow-hidden">
                  {asset.url && (
                    <img src={asset.url} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{asset.templateId}</div>
                  <div className="text-xs text-muted-foreground">
                    {asset.brandId} · {asset.width}×{asset.height}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">{asset.platform}</Badge>
                <Badge variant="outline" className="text-xs">{asset.format.toUpperCase()}</Badge>
                <Button variant="ghost" size="sm" asChild>
                  <a href={asset.url} target="_blank" rel="noopener">↓</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
