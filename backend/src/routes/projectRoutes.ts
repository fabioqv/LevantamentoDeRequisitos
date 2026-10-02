import { Router } from "express";
import { createProject, getProjects } from "../services/projectService.js";

const router = Router();

router.post("/", ( req, res)=>{
    const { name, description }= req.body;

    if(!name || !description){
        res.status(400).json({
            error: "Nome e descrição precisam ter preenchimento."
        });
        return;
    }

    const project = createProject(name, description);
    res.status(201).json(project);

});

router.get("/", (req, res)=>{
    const projects = getProjects();

    res.json(projects);
});

export default router;