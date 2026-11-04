/** Общие типы кейса. Эти поля совпадают с существующими данными в базе и API. */
export type Localized = { ru: string; en: string };
export type DemoArtworkData = {
  kind: string;
  number: string;
  label: string;
  title: string;
  glyphs: string[];
};
export type DemoProject = DemoArtworkData & {
  name: string;
  type: "ui" | "graphic";
  desc: [string, string];
};
export type BlockImage = { id: string; alt: string; caption: Localized };
export type Block = {
  id: string;
  type: "text" | "image" | "gallery" | "video" | "divider";
  text: Localized;
  images: BlockImage[];
  url: string;
  background: string;
  width: "normal" | "wide" | "full";
  padding: number;
};
// Сохраняем имя Document для совместимости импортов; это документ кейса, не DOM браузера.
export type Document = {
  title: Localized;
  description: Localized;
  slug: string;
  category: "ui" | "graphic";
  cover: string;
  coverAlt: string;
  blocks: Block[];
  demo?: DemoArtworkData;
};
export type PublicProject = { id: string; slug: string; document: Document };

export function videoEmbed(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    let videoId = "";
    if (
      ["youtube.com", "www.youtube.com", "m.youtube.com"].includes(url.hostname)
    )
      videoId = url.pathname.startsWith("/embed/")
        ? url.pathname.split("/")[2]
        : url.searchParams.get("v") || "";
    if (url.hostname === "youtu.be") videoId = url.pathname.slice(1);
    if (/^[\w-]{11}$/.test(videoId))
      return "https://www.youtube-nocookie.com/embed/" + videoId;
    if (
      ["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(url.hostname)
    ) {
      const numericId = url.pathname.split("/").filter(Boolean).pop();
      if (numericId && /^\d+$/.test(numericId))
        return "https://player.vimeo.com/video/" + numericId;
    }
    return null;
  } catch {
    return null;
  }
}
