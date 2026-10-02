import { Router } from "express";
import type { Project } from "../types/project.js";

const router = Router();

const projects: Project[] = [];

router.post("/", ( req, res)=>{
    const { name, description }= req.body;

    if(!name || !description){
        res.status(400).json({
            error: "Nome e descrição precisam ter preenchimento."
        });
        return;
    }

    const project: Project = {
        id: projects.length + 1,
        name,
        description
    };

    projects.push(project);
    res.status(201).json(project);

});

router.get("/", (req, res)=>{
    res.json(projects);
});

export default router;