import http from "http";
import dotenv from 'dotenv';
import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

// Modern way to get __dirname in ES Modules
// we start here 
const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

const server = http.createServer((req, res) => { 
    if (req.url === "/") {
        try {
            // 1. Fixed the variable name to 'filePath'
            const filePath = path.join(__dirname, "Public", "index.html");
            
            // 2. Now filePath exists, so this will work!
            const htmlData = fs.readFileSync(filePath, 'utf8');
            
            res.writeHead(200, { 'content-type': 'text/html' });
            res.end(htmlData);
            
        } catch (err) {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end("Internal Server Error"); 
        }
    } else { 
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("Not Found");
    }

    // If you we  leave it here, Node crashes because the response was already ended above.
});

const PORT = 3000;
server.listen(PORT, () => { 
    console.log(`Server is listening port ${PORT}`);
});