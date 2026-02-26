"use client";

import { useEffect, useState, useCallback, use } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface VariableField {
  type: string;
  label: string;
  required?: boolean;
  default?: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  variableSchema: Record<string, VariableField>;
}

interface Brand {
  id: string;
  name: string;
  config: { colors: { primary: string } };
}

const PLATFORMS = [
  { id: "twitter", name: "Twitter", w: 1200, h: 675 },
  { id: "linkedin", name: "LinkedIn", w: 1200, h: 627 },
  { id: "instagram-post", name: "Instagram Post", w: 1080, h: 1080 },
  { id: "instagram-story", name: "Instagram Story", w: 1080, h: 1920 },
  { id: "facebook", name: "Facebook", w: 1200, h: 630 },
];

export default function EditorPage({ params }: { params: Promise<{ templateId: string }> }) {
  const { templateId } = use(params);
  const [template, setTemplate] = useState<Template | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("twitter");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedAssets, setGeneratedAssets] = useState<Array<{ id: string; url: string; platform: string }>>([]);
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);
  const [allPreviews, setAllPreviews] = useState<Record<string, string>>({});

  useEffect(() => {
    Promise.all([
      fetch(`/api/templates/${templateId}`).then((r) => r.json()),
      fetch("/api/brands").then((r) => r.json()),
    ]).then(([t, b]) => {
      setTemplate(t);
      setBrands(b);
      if (b.length > 0) setSelectedBrand(b[0].id);

      // Set defaults
      const defaults: Record<string, string> = {};
      for (const [key, field] of Object.entries(t.variableSchema as Record<string, VariableField>)) {
        defaults[key] = field.default || "";
      }
      setVariables(defaults);
    });
  }, [templateId]);

  const generatePreview = useCallback(async () => {
    if (!template || !selectedBrand) return;
    setPreviewLoading(true);
    try {
      const res = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: template.id,
          brandId: selectedBrand,
          platform: selectedPlatform,
          variables,
        }),
      });
      if (res.ok) {
        const blob = await res.blob();
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(URL.createObjectURL(blob));
      }
    } catch (e) {
      console.error("Preview failed:", e);
    }
    setPreviewLoading(false);
  }, [template, selectedBrand, selectedPlatform, variables, previewUrl]);

  useEffect(() => {
    if (template && selectedBrand) {
      const timeout = setTimeout(generatePreview, 500);
      return () => clearTimeout(timeout);
    }
  }, [template, selectedBrand, selectedPlatform, variables, generatePreview]);

  const handleGenerate = async () => {
    if (!template || !selectedBrand) return;
    setGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: template.id,
          brandId: selectedBrand,
          platform: selectedPlatform,
          variables,
          format: "png",
        }),
      });
      const data = await res.json();
      if (data.id) {
        setGeneratedAssets((prev) => [data, ...prev]);
      }
    } catch (e) {
      console.error("Generate failed:", e);
    }
    setGenerating(false);
  };

  const handleBatchGenerate = async () => {
    if (!template || !selectedBrand) return;
    setGenerating(true);
    try {
      const res = await fetch("/api/generate/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: template.id,
          brandId: selectedBrand,
          variables,
          format: "png",
        }),
      });
      const data = await res.json();
      if (data.assets) {
        setGeneratedAssets((prev) => [...data.assets, ...prev]);
      }
    } catch (e) {
      console.error("Batch generate failed:", e);
    }
    setGenerating(false);
  };

  const handleShowAllPlatforms = async () => {
    if (!template || !selectedBrand) return;
    setShowAllPlatforms(true);
    const previews: Record<string, string> = {};
    for (const p of PLATFORMS) {
      try {
        const res = await fetch("/api/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ templateId: template.id, brandId: selectedBrand, platform: p.id, variables }),
        });
        if (res.ok) {
          const blob = await res.blob();
          previews[p.id] = URL.createObjectURL(blob);
        }
      } catch {}
    }
    setAllPreviews(previews);
  };

  if (!template) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading editor...</div>
      </div>
    );
  }

  const currentPlatform = PLATFORMS.find((p) => p.id === selectedPlatform)!;

  return (
    <div className="flex h-full">
      {/* Left panel - Variables */}
      <div className="w-80 border-r border-border p-4 overflow-y-auto bg-card dark:bg-zinc-950">
        <h2 className="text-lg font-semibold text-foreground mb-1">{template.name}</h2>
        <p className="text-xs text-muted-foreground mb-4">{template.description}</p>

        {/* Brand selector */}
        <div className="mb-4">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Brand</label>
          <div className="flex flex-wrap gap-2">
            {brands.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBrand(b.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs transition-colors border ${
                  selectedBrand === b.id
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-primary/30"
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: b.config.colors.primary }} />
                {b.name.replace("stellae.", "")}
              </button>
            ))}
          </div>
        </div>

        {/* Variable inputs */}
        <div className="space-y-3">
          {Object.entries(template.variableSchema).map(([key, field]) => (
            <div key={key}>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                {field.label}
                {field.required && <span className="text-red-400 ml-0.5">*</span>}
              </label>
              {key.includes("Items") || key === "bullets" ? (
                <Textarea
                  value={variables[key] || ""}
                  onChange={(e) => setVariables((v) => ({ ...v, [key]: e.target.value }))}
                  rows={3}
                  placeholder={field.default}
                />
              ) : (
                <Input
                  value={variables[key] || ""}
                  onChange={(e) => setVariables((v) => ({ ...v, [key]: e.target.value }))}
                  placeholder={field.default}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Center - Preview */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-muted/30">
        {showAllPlatforms ? (
          <div className="w-full max-w-5xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-foreground">All Platforms</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowAllPlatforms(false)}>
                Back to single
              </Button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {PLATFORMS.map((p) => (
                <div key={p.id} className="bg-card rounded-lg border border-border overflow-hidden">
                  <div className="p-2 border-b border-border flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">{p.name}</span>
                    <span className="text-xs text-muted-foreground">{p.w}×{p.h}</span>
                  </div>
                  <div className="p-2">
                    {allPreviews[p.id] ? (
                      <img src={allPreviews[p.id]} alt={p.name} className="w-full rounded" />
                    ) : (
                      <div className="aspect-video bg-muted rounded flex items-center justify-center text-muted-foreground text-xs">
                        Loading...
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="mb-3 flex items-center gap-2">
              <Badge variant="outline" className="text-xs">{currentPlatform.name}</Badge>
              <span className="text-xs text-muted-foreground">{currentPlatform.w} × {currentPlatform.h}</span>
            </div>
            <div
              className="relative bg-card rounded-lg border border-border overflow-hidden shadow-lg"
              style={{
                maxWidth: "100%",
                maxHeight: "calc(100vh - 250px)",
              }}
            >
              {previewLoading && (
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
                  <div className="text-sm text-muted-foreground">Rendering...</div>
                </div>
              )}
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-full max-h-[calc(100vh-250px)] object-contain"
                />
              ) : (
                <div className="w-[600px] h-[337px] flex items-center justify-center text-muted-foreground">
                  Preview will appear here
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Right panel - Platform & Export */}
      <div className="w-64 border-l border-border p-4 bg-card dark:bg-zinc-950 flex flex-col">
        <h3 className="text-sm font-semibold text-foreground mb-3">Platform</h3>
        <div className="space-y-1 mb-6">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              onClick={() => { setSelectedPlatform(p.id); setShowAllPlatforms(false); }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs transition-colors ${
                selectedPlatform === p.id && !showAllPlatforms
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50"
              }`}
            >
              <span>{p.name}</span>
              <span className="text-muted-foreground">{p.w}×{p.h}</span>
            </button>
          ))}
        </div>

        <Button variant="outline" size="sm" className="mb-6" onClick={handleShowAllPlatforms}>
          Preview all platforms
        </Button>

        <div className="border-t border-border pt-4 mt-auto space-y-2">
          <h3 className="text-sm font-semibold text-foreground mb-2">Export</h3>
          <Button className="w-full" size="sm" onClick={handleGenerate} disabled={generating}>
            {generating ? "Generating..." : `Export ${currentPlatform.name}`}
          </Button>
          <Button variant="outline" className="w-full" size="sm" onClick={handleBatchGenerate} disabled={generating}>
            {generating ? "Generating..." : "Export All Platforms"}
          </Button>
        </div>

        {/* Generated assets */}
        {generatedAssets.length > 0 && (
          <div className="mt-4 border-t border-border pt-4">
            <h4 className="text-xs font-medium text-muted-foreground mb-2">Generated ({generatedAssets.length})</h4>
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {generatedAssets.map((asset) => (
                <a
                  key={asset.id}
                  href={asset.url}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center justify-between px-2 py-1.5 rounded text-xs bg-muted hover:bg-accent/50 transition-colors"
                >
                  <span className="text-foreground">{asset.platform}</span>
                  <span className="text-primary">↓</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
