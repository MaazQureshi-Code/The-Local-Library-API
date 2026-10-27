import http from "http"
import dotenv from 'dotenv';
import fs from 'fs'

dotenv.config()
 // we study the req and the res
const server = http.createServer((req, res) => { 
    console.log(req.method)
    console.log("hi")
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end("Hello Library!")
})


// HERE WE PUT IT process.env.PORT
const PORT =  3000;
server.listen(PORT, () => { console.log(`Server is listening port ${PORT}`)})