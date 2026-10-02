import type { Project } from "../types/project.js";

const projects : Project[] = [];

export function createProject(name: string, description: string): Project{

    const project: Project = {
        id: projects.length + 1,
        name,
        description
    };
    projects.push(project);
    return project;

}

export function getProjects(): Project[] {
    return projects;
}