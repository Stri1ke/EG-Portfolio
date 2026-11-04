import { createContext, useContext } from "react";
import media from "./data/media.json";
import type { Language } from "./content/site";

/** Relative prefix is emitted per HTML page; no repository name is needed. */
export const SiteRoot = createContext("./");
export function useSitePaths() {
  const root = useContext(SiteRoot);
  return {
    assetUrl: (path: string) => root + path,
    homeUrl: (language: Language) => root + "?lang=" + language,
    projectUrl: (slug: string, language: Language) =>
      root + "projects/" + encodeURIComponent(slug) + "/?lang=" + language,
    mediaUrl: (id: string) => {
      const filename = (media as Record<string, string>)[id];
      if (!filename) throw new Error("Missing exported media: " + id);
      return root + "media/" + filename;
    },
  };
}
