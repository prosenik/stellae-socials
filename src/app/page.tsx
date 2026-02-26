"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";

interface Template {
  id: string;
  name: string;
  description: string;
  type: string;
  variableSchema: Record<string, { label: string; default?: string }>;
}

interface Brand {
  id: string;
  name: string;
  config: { colors: { primary: string } };
}

export default function TemplateBrowser() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/templates").then((r) => r.json()),
      fetch("/api/brands").then((r) => r.json()),
    ]).then(([t, b]) => {
      setTemplates(t);
      setBrands(b);
      setLoading(false);
    });
  }, []);

  const types = [...new Set(templates.map((t) => t.type))];

  const filtered = templates.filter((t) => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.description?.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterType && t.type !== filterType) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading templates...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Templates</h1>
        <p className="text-muted-foreground text-sm">Choose a template to create branded social media assets</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <Input
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">All types</option>
          {types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </Select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((template) => (
          <Link
            key={template.id}
            href={`/editor/${template.id}`}
            className="group border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors bg-card"
          >
            {/* Preview thumbnail */}
            <div className="aspect-video bg-muted relative overflow-hidden flex items-center justify-center">
              <div className="text-4xl opacity-20">◫</div>
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex gap-1 flex-wrap">
                  {brands.slice(0, 4).map((b) => (
                    <div
                      key={b.id}
                      className="w-3 h-3 rounded-full border border-border/50"
                      style={{ background: b.config.colors.primary }}
                      title={b.name}
                    />
                  ))}
                  {brands.length > 4 && (
                    <span className="text-xs text-muted-foreground">+{brands.length - 4}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                  {template.name}
                </h3>
                <Badge variant="secondary" className="text-[10px]">{template.type}</Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{template.description}</p>
              <div className="mt-3 text-xs text-muted-foreground">
                {Object.keys(template.variableSchema).length} variables · 5 platforms
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
