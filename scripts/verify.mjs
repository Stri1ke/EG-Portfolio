import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

process.chdir(fileURLToPath(new URL("../", import.meta.url)));
const root = path.resolve("docs");
const projects = JSON.parse(await readFile("src/data/projects.json", "utf8"));
const media = JSON.parse(await readFile("src/data/media.json", "utf8"));
async function walk(dir) {
  const rows = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      rows.map((row) =>
        row.isDirectory()
          ? walk(path.join(dir, row.name))
          : path.join(dir, row.name),
      ),
    )
  ).flat();
}
const files = await walk(root);
assert.equal(
  files.filter((file) => file.endsWith(".html")).length,
  projects.length + 1,
);
assert.equal((await stat(path.join(root, ".nojekyll"))).size, 0);
for (const prefix of ["/", "/sample-repository/"]) {
  let checked = 0;
  for (const filename of files.filter((file) => /\.(html|css)$/.test(file))) {
    const text = await readFile(filename, "utf8");
    assert(
      !/localhost|127\.0\.0\.1|\/api\/|\/admin\b|cloudflare:|signin-with-chatgpt/.test(
        text,
      ),
      filename,
    );
    const relative = path
      .relative(root, filename)
      .split(path.sep)
      .map(encodeURIComponent)
      .join("/");
    const pageUrl = new URL(prefix + relative, "https://example.github.io");
    const refs = filename.endsWith(".html")
      ? [...text.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) =>
          m[1].replaceAll("&amp;", "&"),
        )
      : [...text.matchAll(/url\(["']?([^)'"\s]+)["']?\)/g)].map((m) => m[1]);
    for (const ref of refs) {
      if (/^(?:https?:|data:|mailto:|tel:|#)/.test(ref)) continue;
      assert(!ref.startsWith("/"), `Root-absolute URL: ${ref}`);
      const url = new URL(ref, pageUrl);
      assert(
        url.pathname.startsWith(prefix),
        `Escaped deployment prefix: ${ref}`,
      );
      let target = path.join(
        root,
        decodeURIComponent(url.pathname.slice(prefix.length)),
      );
      if ((await stat(target)).isDirectory())
        target = path.join(target, "index.html");
      assert((await stat(target)).isFile(), `Missing resource: ${ref}`);
      checked++;
    }
  }
  console.log(`${prefix}: ${checked} local links and resources verified`);
}
for (const project of projects) {
  assert.deepEqual(Object.keys(project).sort(), ["document", "id", "slug"]);
  const doc = project.document;
  const ids = new Set(
    [doc.cover, ...doc.blocks.flatMap((b) => b.images.map((i) => i.id))].filter(
      Boolean,
    ),
  );
  for (const id of ids)
    assert((await stat(path.join(root, "media", media[id]))).isFile());
  const html = await readFile(
    path.join(root, "projects", project.slug, "index.html"),
    "utf8",
  );
  assert(
    html.includes(doc.title.ru.replaceAll("&", "&amp;")),
    "Case content must be prerendered",
  );
}
const home = await readFile(path.join(root, "index.html"), "utf8");
assert.equal((home.match(/class="project"/g) || []).length, projects.length);
assert(!home.includes("reveal"), "Cover reveal animation must not return");
const bundle = (
  await Promise.all(
    files.filter((f) => f.endsWith(".js")).map((f) => readFile(f, "utf8")),
  )
).join("\n");
assert(
  !/127\.0\.0\.1|\/api\/projects|\/admin\b|cloudflare:workers/.test(bundle),
);
const sizes = await Promise.all(files.map(async (f) => (await stat(f)).size));
assert(
  Math.max(...sizes) < 25 * 1024 * 1024,
  "Files must fit GitHub browser upload limit",
);
assert(
  sizes.reduce((a, b) => a + b, 0) < 1024 ** 3,
  "Site must fit Pages size limit",
);
console.log(
  `Passed: ${projects.length} projects, ${Object.keys(media).length} media files, no server dependencies.`,
);
