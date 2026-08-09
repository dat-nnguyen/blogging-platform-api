# Blogging Platform API 🚀

A RESTful API built with **Node.js** and **Express.js** for managing a personal blogging platform. This project fulfills the requirements from [roadmap.sh Blogging Platform API Project](https://roadmap.sh/projects/blogging-platform-api).

---

## 🔗 Project Reference

- **roadmap.sh Challenge**: [Blogging Platform API](https://roadmap.sh/projects/blogging-platform-api)
- **Difficulty**: Beginner / Backend Project

---

## 🎯 Project Goals

This project demonstrates core backend engineering concepts specified by roadmap.sh:
- Understanding **RESTful API** architecture, standards, and conventions.
- Implementing common **HTTP Methods** (`GET`, `POST`, `PUT`, `DELETE`).
- Handling **HTTP Status Codes** (`200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`).
- Implementing full **CRUD operations** for blog posts.
- Performing **wildcard filtering** on posts via query parameters.
- Maintaining file-based JSON persistence using asynchronous file I/O (`data/posts.json`).

---

## 📋 Features & Requirements

| Requirement | HTTP Method | Endpoint | Success Status | Error Status | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Create Post** | `POST` | `/api/posts` | `201 Created` | `400 Bad Request` | Creates a new post with `title`, `content`, `category`, and optional `tags`. |
| **Get All Posts** | `GET` | `/api/posts` | `200 OK` | `500 Server Error` | Retrieves all blog posts. |
| **Filter Posts** | `GET` | `/api/posts?term=...` | `200 OK` | `500 Server Error` | Wildcard search on `title`, `content`, and `category` fields. |
| **Get Single Post** | `GET` | `/api/posts/:id` | `200 OK` | `404 Not Found` | Retrieves a specific post by its unique ID. |
| **Update Post** | `PUT` | `/api/posts/:id` | `200 OK` | `400 Bad Request` / `404 Not Found` | Updates an existing post's fields and `updatedAt` timestamp. |
| **Delete Post** | `DELETE` | `/api/posts/:id` | `200 OK` / `204 No Content` | `404 Not Found` | Deletes an existing post by ID. |

---

## 📁 Project Structure

```text
blogging-platform-api/
├── data/
│   └── posts.json          # Persistent JSON file storage for posts
├── src/
│   ├── controllers/
│   │   └── postController.js # Request/response logic and status codes
│   ├── routes/
│   │   └── postRoutes.js     # Express router definition
│   ├── services/
│   │   └── postService.js    # Data persistence and CRUD operations
│   ├── utils/
│   │   └── validator.js      # Request body validation rules
│   └── app.js                # Express application configuration
├── server.js                 # HTTP server entry point
├── package.json              # Project configuration and npm scripts
├── .gitignore                # Git ignore rules
└── README.md                 # Project documentation
```

---

## 🛠️ Tech Stack & Prerequisites

- **Language & Runtime**: Node.js (`v18.11.0+` for native `--watch` support)
- **Framework**: Express.js (`v5.x`)
- **Module System**: ES Modules (`"type": "module"`)
- **Storage**: File-based JSON storage (`data/posts.json`)

---

## 🚀 Getting Started

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/dat-nnguyen/blogging-platform-api.git
cd blogging-platform-api
npm install
```

### 2. Running the Server

#### Development Mode (Auto-reload on save)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

Default server URL: `http://localhost:3000`

---

## 📡 API Contract & Examples

### 1. Create Blog Post (`POST /api/posts`)

**Request Body:**
```json
{
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"]
}
```

**cURL Command:**
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post.",
    "category": "Technology",
    "tags": ["Tech", "Programming"]
  }'
```

**Response (`201 Created`):**
```json
{
  "message": "Post created successfully",
  "post": {
    "id": "1786245761840",
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post.",
    "category": "Technology",
    "tags": ["Tech", "Programming"],
    "createdAt": "2026-08-09T03:22:41.840Z",
    "updatedAt": "2026-08-09T03:22:41.840Z"
  }
}
```

---

### 2. Get All Blog Posts (`GET /api/posts`)

**cURL Command:**
```bash
curl http://localhost:3000/api/posts
```

**Response (`200 OK`):**
```json
[
  {
    "id": "1786245761840",
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post.",
    "category": "Technology",
    "tags": ["Tech", "Programming"],
    "createdAt": "2026-08-09T03:22:41.840Z",
    "updatedAt": "2026-08-09T03:22:41.840Z"
  }
]
```

---

### 3. Filter Blog Posts by Search Term (`GET /api/posts?term=tech`)

Performs a case-insensitive search across post `title`, `content`, or `category`.

**cURL Command:**
```bash
curl "http://localhost:3000/api/posts?term=tech"
```

---

### 4. Get a Single Blog Post (`GET /api/posts/:id`)

**cURL Command:**
```bash
curl http://localhost:3000/api/posts/1786245761840
```

**Response (`404 Not Found`) if ID doesn't exist:**
```json
{
  "message": "Post not found"
}
```

---

### 5. Update Blog Post (`PUT /api/posts/:id`)

**cURL Command:**
```bash
curl -X PUT http://localhost:3000/api/posts/1786245761840 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Updated Blog Post",
    "content": "This is the updated content of my first blog post.",
    "category": "Technology",
    "tags": ["Tech", "Programming"]
  }'
```

**Response (`200 OK`):**
```json
{
  "message": "Post updated successfully",
  "post": {
    "id": "1786245761840",
    "title": "My Updated Blog Post",
    "content": "This is the updated content of my first blog post.",
    "category": "Technology",
    "tags": ["Tech", "Programming"],
    "createdAt": "2026-08-09T03:22:41.840Z",
    "updatedAt": "2026-08-09T03:25:00.000Z"
  }
}
```

---

### 6. Delete Blog Post (`DELETE /api/posts/:id`)

**cURL Command:**
```bash
curl -X DELETE http://localhost:3000/api/posts/1786245761840
```

**Response (`200 OK`):**
```json
{
  "message": "Post deleted successfully"
}
```

---

## 📜 License

This project is licensed under the [ISC License](LICENSE).
