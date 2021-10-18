import express from 'express';
import justify from "./routes/justify.js";
import token from "./routes/token.js";

const app = express()
app.use(express.text())
app.use(express.json())

app.all("/api/justify", justify);
app.all("/api/token", token);
app.all("/api", (req, res) => res.send("Welcome to the Justify API!"));
app.all("*", (req, res) => res.send("Error : You've tried reaching a route that doesn't exist."));

app.listen(8080, () => {
    console.log('Serveur à l\'écoute')
})