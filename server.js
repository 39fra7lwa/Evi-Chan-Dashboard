const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/stats", (req, res) => {
  res.json({
    name: "Evi-Chan",
    status: "online",
    commands: 29,
    servers: 0,
    users: 0
  });
});

app.get("*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Evi-Chan website running on port ${PORT}`);
});