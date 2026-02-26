export interface BrandConfig {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
  };
  fonts: {
    heading: { family: string; weight: string; source?: string };
    body: { family: string; weight: string; source?: string };
  };
  logo: { light: string; dark: string; icon: string };
}

export const brands: BrandConfig[] = [
  {
    id: "stellae-design",
    name: "stellae.design",
    colors: {
      primary: "#6366F1",
      secondary: "#818CF8",
      accent: "#4F46E5",
      background: "#0F0D1A",
      foreground: "#F8FAFC",
      muted: "#1E1B2E",
      mutedForeground: "#94A3B8",
    },
    fonts: {
      heading: { family: "Inter", weight: "700" },
      body: { family: "Inter", weight: "400" },
    },
    logo: { light: "/logos/stellae-design-light.svg", dark: "/logos/stellae-design-dark.svg", icon: "/logos/stellae-design-icon.svg" },
  },
  {
    id: "stellae-tokens",
    name: "stellae.tokens",
    colors: {
      primary: "#10B981",
      secondary: "#34D399",
      accent: "#059669",
      background: "#0D1A14",
      foreground: "#F8FAFC",
      muted: "#1B2E24",
      mutedForeground: "#94A3B8",
    },
    fonts: {
      heading: { family: "Inter", weight: "700" },
      body: { family: "Inter", weight: "400" },
    },
    logo: { light: "/logos/stellae-tokens-light.svg", dark: "/logos/stellae-tokens-dark.svg", icon: "/logos/stellae-tokens-icon.svg" },
  },
  {
    id: "stellae-drift",
    name: "stellae.drift",
    colors: {
      primary: "#F97316",
      secondary: "#FB923C",
      accent: "#EA580C",
      background: "#1A130D",
      foreground: "#F8FAFC",
      muted: "#2E231B",
      mutedForeground: "#94A3B8",
    },
    fonts: {
      heading: { family: "Inter", weight: "700" },
      body: { family: "Inter", weight: "400" },
    },
    logo: { light: "/logos/stellae-drift-light.svg", dark: "/logos/stellae-drift-dark.svg", icon: "/logos/stellae-drift-icon.svg" },
  },
  {
    id: "stellae-import",
    name: "stellae.import",
    colors: {
      primary: "#3B82F6",
      secondary: "#60A5FA",
      accent: "#2563EB",
      background: "#0D131A",
      foreground: "#F8FAFC",
      muted: "#1B252E",
      mutedForeground: "#94A3B8",
    },
    fonts: {
      heading: { family: "Inter", weight: "700" },
      body: { family: "Inter", weight: "400" },
    },
    logo: { light: "/logos/stellae-import-light.svg", dark: "/logos/stellae-import-dark.svg", icon: "/logos/stellae-import-icon.svg" },
  },
  {
    id: "stellae-studio",
    name: "stellae.studio",
    colors: {
      primary: "#8B5CF6",
      secondary: "#A78BFA",
      accent: "#7C3AED",
      background: "#120D1A",
      foreground: "#F8FAFC",
      muted: "#231B2E",
      mutedForeground: "#94A3B8",
    },
    fonts: {
      heading: { family: "Inter", weight: "700" },
      body: { family: "Inter", weight: "400" },
    },
    logo: { light: "/logos/stellae-studio-light.svg", dark: "/logos/stellae-studio-dark.svg", icon: "/logos/stellae-studio-icon.svg" },
  },
  {
    id: "stellae-scale",
    name: "stellae.scale",
    colors: {
      primary: "#F43F5E",
      secondary: "#FB7185",
      accent: "#E11D48",
      background: "#1A0D11",
      foreground: "#F8FAFC",
      muted: "#2E1B21",
      mutedForeground: "#94A3B8",
    },
    fonts: {
      heading: { family: "Inter", weight: "700" },
      body: { family: "Inter", weight: "400" },
    },
    logo: { light: "/logos/stellae-scale-light.svg", dark: "/logos/stellae-scale-dark.svg", icon: "/logos/stellae-scale-icon.svg" },
  },
  {
    id: "stellae-flow",
    name: "stellae.flow",
    colors: {
      primary: "#06B6D4",
      secondary: "#22D3EE",
      accent: "#0891B2",
      background: "#0D171A",
      foreground: "#F8FAFC",
      muted: "#1B282E",
      mutedForeground: "#94A3B8",
    },
    fonts: {
      heading: { family: "Inter", weight: "700" },
      body: { family: "Inter", weight: "400" },
    },
    logo: { light: "/logos/stellae-flow-light.svg", dark: "/logos/stellae-flow-dark.svg", icon: "/logos/stellae-flow-icon.svg" },
  },
  {
    id: "stellae-theme",
    name: "stellae.theme",
    colors: {
      primary: "#F59E0B",
      secondary: "#FBBF24",
      accent: "#D97706",
      background: "#1A150D",
      foreground: "#F8FAFC",
      muted: "#2E261B",
      mutedForeground: "#94A3B8",
    },
    fonts: {
      heading: { family: "Inter", weight: "700" },
      body: { family: "Inter", weight: "400" },
    },
    logo: { light: "/logos/stellae-theme-light.svg", dark: "/logos/stellae-theme-dark.svg", icon: "/logos/stellae-theme-icon.svg" },
  },
];

export function getBrand(id: string): BrandConfig | undefined {
  return brands.find((b) => b.id === id);
}
