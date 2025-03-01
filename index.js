const express = require("express");
const fs = require("fs");
const { nanoid } = require("nanoid");

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/shorten", (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const id = nanoid(6);
    const shortUrl = `http://localhost:${PORT}/${id}`;

    fs.writeFileSync("urls.json", JSON.stringify({ [id]: url }, null, 2));
    res.json({ shortUrl });
});

app.get("/:id", (req, res) => {
    const urls = JSON.parse(fs.readFileSync("urls.json", "utf8"));
    const longUrl = urls[req.params.id];

    if (!longUrl) return res.sendStatus(404);
    res.redirect(longUrl);
});

// Start the server only when running normally
if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

// Export app for testing
module.exports = app;
