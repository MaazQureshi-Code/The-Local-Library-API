# Local Library API (Native Node.js)

This is a backend project built entirely with **Native Node.js** (no Express framework) to truly understand how HTTP servers work under the hood. 

Instead of using a database (which I haven't learned yet), this API uses the local file system (`fs` module) to read and write data to `.json` files.

## 🚀 Features & Concepts Practiced
*   **Pure Node.js HTTP Server:** Handling requests and routing manually.
*   **File System (`fs` & `path`):** Reading and writing data asynchronously.
*   **Static Assets:** Serving an `index.html` file to the browser.
*   **REST API Endpoints:** GET, POST, and handling Method Not Allowed (405).
*   **Async/Await:** Ensuring non-blocking I/O operations.
*   **Environment Variables:** Using `dotenv` to hide the port configuration.
*   **NPM Scripts:** Custom `start` and `dev` (nodemon) scripts.
*   **UUIDs:** Generating unique IDs for new books.
*   **Input Sanitization:** Basic validation to prevent bad data from being saved.

## 🛠️ Tech Stack
*   Node.js (Native `http` module)
*   `fs` and `path` (built-in modules)
*   `dotenv` (for environment variables)
*   `uuid` (for unique IDs)
*   `nodemon` (for development)

## 🏃‍♂️ How to Run Locally

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root directory and add: `PORT=3000`
4. Start the development server:
   ```bash
   npm run dev
