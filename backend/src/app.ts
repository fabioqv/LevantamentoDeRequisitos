import express from "express";



const app = express(); 

app.use(express.json()); 

app.get("/", (req, res) =>{ 
    
    res.send("API de levantamento de requisitos") 
}) 

app.post("/projects", (req, res) =>{ 
    
    const { name, description } = req.body; 
    
    res.json({ name, description }); 
}); 

app.listen(3000, () =>{ 

    console.log("Servidor rodando na porta 3000"); 

});