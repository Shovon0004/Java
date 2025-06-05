const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json({ limit: "5mb" }));

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

app.post("/upload", (req, res) => {
  const base64Image = req.body.image.replace(/^data:image\/png;base64,/, "");
  const filename = `photo_${Date.now()}.png`;
  const filepath = path.join(uploadsDir, filename);

  fs.writeFile(filepath, base64Image, "base64", (err) => {
    if (err) {
      return res.status(500).json({ error: "Error saving photo" });
    }
    console.log("Photo captured:", filename);
    res.json({ filename });
  });
});

app.listen(PORT, () => {
  console.log(`📡 Server running on http://localhost:${PORT}`);
});
