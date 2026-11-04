import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("../docs/", import.meta.url)));
const port = Number(process.env.PORT || 4173);
const prefix = process.env.SITE_PREFIX || "";
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
};
http
  .createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");
      if (prefix && !url.pathname.startsWith(prefix + "/")) {
        res.writeHead(404).end();
        return;
      }
      const pathname = decodeURIComponent(url.pathname.slice(prefix.length));
      let filename = path.resolve(root, "." + pathname);
      if (filename !== root && !filename.startsWith(root + path.sep)) {
        res.writeHead(403).end();
        return;
      }
      if ((await stat(filename)).isDirectory()) {
        if (!url.pathname.endsWith("/")) {
          res
            .writeHead(301, { Location: url.pathname + "/" + url.search })
            .end();
          return;
        }
        filename = path.join(filename, "index.html");
      }
      const data = await readFile(filename);
      res.writeHead(200, {
        "Content-Type":
          types[path.extname(filename)] || "application/octet-stream",
      });
      res.end(req.method === "HEAD" ? undefined : data);
    } catch {
      res.writeHead(404).end("Not found");
    }
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`Portfolio: http://127.0.0.1:${port}${prefix}/`),
  );
