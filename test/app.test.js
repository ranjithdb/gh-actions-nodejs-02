const request = require("supertest");
const app = require("../index");  // Import the app instance

describe("URL Shortener API", () => {
    it("should shorten a URL", async () => {
        const res = await request(app)
            .post("/shorten")
            .send({ url: "https://example.com" });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("shortUrl");
    });

    it("should return 404 for unknown short URL", async () => {
        const res = await request(app).get("/unknown123");
        expect(res.statusCode).toBe(404);
    });
});
