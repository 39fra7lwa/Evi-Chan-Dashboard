const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";
const PUBLIC_DIR = path.join(__dirname, "public");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
};

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-cache",
  });
  res.end(body);
}

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath);
  const clean = path.normalize(decoded).replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = path.join(PUBLIC_DIR, clean === "/" ? "index.html" : clean);
  if (!filePath.startsWith(PUBLIC_DIR)) return null;
  return filePath;
}

const server = http.createServer((req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

    if (url.pathname === "/health" || url.pathname === "/api/health") {
      return send(res, 200, JSON.stringify({
        ok: true,
        name: "Evi-Chan Dashboard",
        status: "online"
      }), "application/json; charset=utf-8");
    }

    if (url.pathname === "/api/stats") {
      return send(res, 200, JSON.stringify({
        name: "Evi-Chan",
        status: "online",
        commands: 28,
        servers: 0,
        users: 0
      }), "application/json; charset=utf-8");
    }

    let filePath = safePath(url.pathname);
    if (!filePath) return send(res, 403, "Forbidden");

    // Serve index.html for the homepage.
    if (url.pathname === "/") {
      filePath = path.join(PUBLIC_DIR, "index.html");
    }

    fs.stat(filePath, (err, stat) => {
      if (!err && stat.isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, {
          "Content-Type": MIME[ext] || "application/octet-stream",
          "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=3600",
        });
        return fs.createReadStream(filePath).pipe(res);
      }

      // SPA fallback for non-file routes.
      const indexPath = path.join(PUBLIC_DIR, "index.html");
      fs.createReadStream(indexPath)
        .on("error", () => send(res, 500, "Dashboard files are missing."))
        .pipe(res);
    });
  } catch (error) {
    console.error(error);
    send(res, 500, "Internal Server Error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Evi-Chan Dashboard running on http://${HOST}:${PORT}`);
  console.log(`Health check: /health`);
});
