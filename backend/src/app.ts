import express from "express";
import projectRoutes from "./routes/projectRoutes.js";

const app = express(); 

app.use(express.json()); 

app.use("/projects", projectRoutes); 

app.get("/", (req, res) =>{ 

    res.send("API de levantamento de requisitos") 
    
}) 

app.listen(3000, () =>{ 

    console.log("Servidor rodando na porta 3000"); 

});