"use client";

import {
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import { META } from "@/lib/content";

const SOCIAL_ICON: Record<
  string,
  React.ComponentType<{ size?: number; weight?: "regular" | "bold" | "fill" }>
> = {
  linkedin: LinkedinLogoIcon,
  github: GithubLogoIcon,
  x: XLogoIcon,
  instagram: InstagramLogoIcon,
};

export function Socials() {
  return (
    <div className="grid h-full grid-cols-4 gap-2">
      {META.links.map((l) => {
        const Icon = SOCIAL_ICON[l.label];
        return (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.label}
            title={l.label}
            className="flex items-center justify-center rounded-md bg-bg text-fg-soft transition-colors hover:bg-accent hover:text-accent-fg"
          >
            {Icon ? <Icon size={24} weight="regular" /> : null}
          </a>
        );
      })}
    </div>
  );
}
