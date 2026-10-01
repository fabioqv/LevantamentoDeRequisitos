import express from "express";

interface Project {
    id: number;
    name: string;
    description: string;
}


const app = express(); 
const projects: Project[] = [];

app.use(express.json()); 

app.get("/", (req, res) =>{ 
    
    res.send("API de levantamento de requisitos") 
}) 

app.post("/projects", (req, res) =>{ 
    
    const { name, description } = req.body; 
    
    if(!name || !description){

        res.status(400).json({

            error: "Nome e descrição são obrigatórios"

        });

        return;
    }

    const project = {
        
        id: projects.length + 1,
        name,
        description

    };

    projects.push(project);

    res.status(201).json(project);

}); 


app.get("/projects", (req, res)=>{
    res.json(projects);

});

app.listen(3000, () =>{ 

    console.log("Servidor rodando na porta 3000"); 

});