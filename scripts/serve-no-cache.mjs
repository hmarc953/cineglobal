import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 3000);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp"
};

function toSafePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]);
  const requested = cleanPath === "/" ? "/index.html" : cleanPath;
  const normalized = path.normalize(requested).replace(/^([.][.][/\\])+/, "");
  return path.join(rootDir, normalized);
}

function buildHeaders(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const isHtml = ext === ".html";

  return {
    "Content-Type": mimeTypes[ext] || "application/octet-stream",
    "Cache-Control": isHtml
      ? "no-store, no-cache, must-revalidate, proxy-revalidate"
      : "public, max-age=0, must-revalidate",
    Expires: "0",
    Pragma: "no-cache",
    "Surrogate-Control": "no-store"
  };
}

const server = createServer(async (req, res) => {
  try {
    const requestedPath = toSafePath(req.url || "/");

    if (!requestedPath.startsWith(rootDir)) {
      res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Forbidden");
      return;
    }

    const content = await readFile(requestedPath);
    res.writeHead(200, buildHeaders(requestedPath));
    res.end(content);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not Found");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`CineGlobal server running at http://127.0.0.1:${port}/ (no-cache HTML)`);
});
