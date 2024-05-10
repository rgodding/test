import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import jwt from "jsonwebtoken";
import { cwd } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Use public folder
const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/login", (req, res) => {
    const secretKey = "SZBNheG6DYChL2oyIo6Q3dAiK4sREZGPX6orWfH2Mk=";
    const audience = "OnlineShoppen.dk";
    const issuer = "OnlineShoppen.dk";
    const guid = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    // Generate a JWT token payload
    var token = jwt.sign({ guid: guid, audience: audience, issuer: issuer }, secretKey, { expiresIn: "1h" });
    console.log(token);

    res.cookie("jwtToken", token, { httpOnly: true });
    // 
    res.send("Login successful");
});

const PORT = 3000;
app.listen(PORT, () => console.log("Server is running on port", PORT));