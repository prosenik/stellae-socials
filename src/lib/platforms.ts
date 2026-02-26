export const platforms = {
  twitter: { name: "Twitter", width: 1200, height: 675 },
  linkedin: { name: "LinkedIn", width: 1200, height: 627 },
  "instagram-post": { name: "Instagram Post", width: 1080, height: 1080 },
  "instagram-story": { name: "Instagram Story", width: 1080, height: 1920 },
  facebook: { name: "Facebook", width: 1200, height: 630 },
} as const;

export type PlatformId = keyof typeof platforms;
export const platformIds = Object.keys(platforms) as PlatformId[];
