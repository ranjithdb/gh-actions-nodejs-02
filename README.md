# gh-actions-nodejs-02

## URL Shortener with GitHub Actions

A simple URL shortener built with Node.js and Express.js that stores shortened URLs in a JSON file.

## Features

- Shorten long URLs into short links
- Redirect users from short links to the original URL
- Store URL mappings in a JSON file (no database needed)

## Installation

Clone the repository

install dependencies:

```sh
npm ci
```

## Running the Application

Start the server locally:

```sh
npm start
```

The server will run on `http://localhost:3000`.

## API Usage

### Shorten a URL

To shorten a URL, use the following curl command:

```sh
curl -X POST http://localhost:3000/shorten \
     -H "Content-Type: application/json" \
     -d '{"url": "https://example.com"}'
```

#### Response

```json
{
  "shortUrl": "http://localhost:3000/abc123"
}
```

## Testing

Run the tests using Jest:

```sh
npm test
```

## GitHub Actions CI

Every push to `main` triggers an automated build and test using GitHub Actions.

---
