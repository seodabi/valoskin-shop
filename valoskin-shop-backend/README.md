# ValoSkin Shop - WEB700 Project Part 2 Backend

## Course & Project Information
- **Course:** WEB700 - Web Programming
- **Team Members:** Yasmin and Sophia
- **Project Title:** ValoSkin Shop Express Backend

## Project Description
This project is an Express.js backend application built for Project Part 2 of WEB700. It reads from a prepared local JSON dataset (`data/skins.json`) containing Valorant weapon skin information, serving both API JSON endpoints and EJS dynamic template views.

## Folder Structure
```
valoskin-shop-backend/
├── data/
│   └── skins.json
├── public/
│   └── css/
│       └── style.css
├── views/
│   ├── index.ejs
│   ├── skins.ejs
│   └── search.ejs
├── package.json
├── server.js
└── README.md
```

## How to Run the Project Locally
1. Clone or download the repository folder.
2. Open terminal in the project folder `valoskin-shop-backend`.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Open browser at `http://localhost:3000`.

## Implemented Express Routes

### HTML / Template Routes (EJS)
- `GET /` - Home landing page explaining project and routes.
- `GET /skins` - Render catalog view displaying skins.
- `GET /search` - Display search form view.
- `POST /search` - Process search form with validation and output matching skins or no-results message.

### JSON API Routes
- `GET /api/skins` - Returns all skin records as JSON.
- `GET /api/skins/:id` - Returns single skin object by ID or 404 message if not found.
- `GET /api/search?keyword=value` - Search skins via query string parameter.
