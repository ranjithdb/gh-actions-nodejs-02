const express = require("express");
const fs = require("fs");
const { nanoid } = require("nanoid");

const app = express();
const PORT = 3000;
const DATA_FILE = "urls.json";

app.use(express.json());

// Load URLs from file
const loadURLs = () => {
    if (!fs.existsSync(DATA_FILE)) return {};
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
};

// Save URLs to file
const saveURLs = (urls) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(urls, null, 2));
};

// Shorten URL
app.post("/shorten", (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const urls = loadURLs();
    const id = nanoid(6);
    urls[id] = url;
    saveURLs(urls);

    res.json({ shortUrl: `http://localhost:${PORT}/${id}` });
});

// Redirect to Original URL
app.get("/:id", (req, res) => {
    const urls = loadURLs();
    const originalUrl = urls[req.params.id];

    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).json({ error: "URL not found" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
