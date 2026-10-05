import { pool } from "../db/pool.js";
import type { Project } from "../types/project.js";

interface CreateProjectData {
    name: string;
    description: string;
}

export async function createProject(
    data: CreateProjectData
): Promise<Project> {

    const result = await pool.query(
        `gi
        INSERT INTO projects (name, description)
        VALUES ($1, $2)
        RETURNING id, name, description
        `,
        [data.name, data.description]
    );

    return result.rows[0];
}

export async function getProjects(): Promise<Project[]> {

    const result = await pool.query(
        ` 
            SELECT id, name, description
            FROM projects
            ORDE BY created_at ASC
        `
    );

    return result.rowns;
}