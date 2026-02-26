import React from "react";
import { BrandConfig } from "./brands";
import { AnnouncementTemplate } from "@/templates/announcement/template";
import { FeatureHighlightTemplate } from "@/templates/feature-highlight/template";
import { StatCardTemplate } from "@/templates/stat-card/template";
import { TestimonialTemplate } from "@/templates/testimonial/template";
import { ComparisonTemplate } from "@/templates/comparison/template";
import { ProductLaunchTemplate } from "@/templates/product-launch/template";

export type TemplateComponent = (props: {
  brand: BrandConfig;
  variables: Record<string, string>;
  width: number;
  height: number;
}) => React.ReactElement;

const registry: Record<string, TemplateComponent> = {
  announcement: AnnouncementTemplate as unknown as TemplateComponent,
  "feature-highlight": FeatureHighlightTemplate as unknown as TemplateComponent,
  "stat-card": StatCardTemplate as unknown as TemplateComponent,
  testimonial: TestimonialTemplate as unknown as TemplateComponent,
  comparison: ComparisonTemplate as unknown as TemplateComponent,
  "product-launch": ProductLaunchTemplate as unknown as TemplateComponent,
};

export function getTemplateComponent(id: string): TemplateComponent | undefined {
  return registry[id];
}

export function getAllTemplateIds(): string[] {
  return Object.keys(registry);
}
