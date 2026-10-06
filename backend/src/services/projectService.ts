import {
    createProject as createProjectRepository,
    getProjects as getProjectsRepository
} from "../repositories/projectRepository.js";

import type { Project } from "../types/project.js";

export async function createProject(
    name: string, 
    description: string

): Promise<Project> {

    return createProjectRepository({
        name,
        description
    });
}

export async function getProjects(): Promise<Project[]> {
    return getProjectsRepository();
}