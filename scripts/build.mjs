import { build } from "vite";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

process.chdir(fileURLToPath(new URL("../", import.meta.url)));
await build();
await build({
  build: {
    ssr: "src/render.tsx",
    outDir: ".build",
    manifest: false,
    rollupOptions: {
      input: "src/render.tsx",
      output: { entryFileNames: "render.js" },
    },
  },
});
const { render, projects, metadata } = await import(
  pathToFileURL(path.resolve(".build/render.js"))
);
const manifest = JSON.parse(await readFile("docs/.vite/manifest.json", "utf8"));
const entry = manifest["src/client.tsx"].file;
await cp("public", "docs", { recursive: true });
await mkdir("docs/styles", { recursive: true });
await cp("src/styles/global.css", "docs/styles/global.css");
await cp("src/styles/portfolio.css", "docs/styles/portfolio.css");
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const pages = [
  {
    slug: "",
    root: "./",
    directory: "docs",
    title: metadata.title,
    description: metadata.description,
  },
  ...projects.map((p) => ({
    slug: p.slug,
    root: "../../",
    directory: path.join("docs/projects", p.slug),
    title: p.document.title.ru + " — Egor",
    description: p.document.description.ru,
  })),
];
for (const page of pages) {
  if (page.slug && /[\/\\]|^\.{1,2}$/.test(page.slug))
    throw new Error("Invalid project path");
  const { root, slug, title, description } = page;
  const html = `<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)}</title><meta name="description" content="${escape(description)}">
<link rel="icon" href="${root}favicon.svg?v=eg2" type="image/svg+xml">
<link rel="stylesheet" href="${root}styles/global.css">
${!slug ? `<link rel="stylesheet" href="${root}styles/portfolio.css">` : ""}
<script type="module" src="${root}${entry}"></script></head>
<body><div id="root" data-slug="${escape(slug)}" data-root="${root}">${render({ slug, root })}</div></body></html>`;
  await mkdir(page.directory, { recursive: true });
  await writeFile(path.join(page.directory, "index.html"), html);
}
await writeFile("docs/.nojekyll", "");
await rm("docs/.vite", { recursive: true });
await rm(".build", { recursive: true });
console.log(
  `Static export complete: ${pages.length} HTML pages, ${projects.length} projects.`,
);
