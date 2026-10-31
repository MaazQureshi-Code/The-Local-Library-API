import http from "http";
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from "path";
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

// Modern way to get __dirname in ES Modules
const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

const server = http.createServer( async (req, res) => { 
    console.log("Method:", req.method, "| URL:", req.url);
    if (req.url === "/") {
        try {
            // 1. Fixed the variable name to 'filePath'
            const filePath = path.join(__dirname, "public", "index.html");
            
            // 2. Now filePath exists, so this will work!
            const htmlData = await fs.readFile(filePath, 'utf8');
            
            res.writeHead(200, { 'content-type': 'text/html' });
            res.end(htmlData);
            
        } catch (err) {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end("Internal Server Error"); 
        }
    }else if(req.url === "/api/books" && req.method === "GET"){
        try{
            const filePath = path.join(__dirname,"data","books.json")
            const data = await fs.readFile(filePath,"utf-8")
            res.writeHead(200,{"content-type":'application/json'})
            res.end(data)
        }catch(err){
            console.error(err)
            res.writeHead(500,{"content-type":"text/plain"})
            res.end("Internal Server Error")
        }
    }else if(req.url === "/api/books" && req.method === "POST"){
        try{
              // 1. Collect the incoming data chunks 
            let body ="";

            req.on("data" , (chunk) => {
                body += chunk
            });
            req.on('end', async () => {
                  // 1. Parse the body
                const parsedBody = JSON.parse(body);
                const { title, author } = parsedBody; 
                 // 2. Sanitize input
                if (!title || !author) {
                    res.writeHead(400, { "Content-Type": "text/plain" });
                    return res.end("Bad Request: Title and Author are required.");
                }
                // create new book till here we get the user data
                const newBook ={
                    id:uuidv4(),
                    title:title,
                    author:author
                }
                 // 4. Read existing data
                const filePath = path.join(__dirname, "data", "books.json");
                const data = await fs.readFile(filePath, "utf-8")
                const books = JSON.parse(data)
                // 5. Push new book and write back to file we have 
                books.push(newBook)
                await fs.writeFile(filePath,JSON.stringify(books,null,2))
                // 6. Send success response to the user
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify(newBook));

            });
        }catch(err){
            console.error(err)
            res.writeHead(500,{"content-type":"text/plain"})
            res.end("Internal Server Error")
        }
    }else if(req.url === "/api/books"){
        // If we reach here, it means the URL is correct, but the method wasn't GET or POST
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Method Not Allowed" }));

    }
    else  { 
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Route not found" }));
    }

    // If you we  leave it here, Node crashes because the response was already ended above.
});

const PORT = process.env.PORT || 3000; 
server.listen(PORT, () => { 
    console.log(`Server is listening port ${PORT}`);
});