CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(120) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    password_hash TEXT NOT NULL,

    role VARCHAR(20) NOT NULL DEFAULT 'CLIENT',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT users_role_check
        CHECK (role IN('ADMIN','CLIENT'))

);

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    owner_user_id UUID,

    name VARCHAR(150) NOT NULL,

    description TEXT NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT projects_status_check
        CHECK (status IN('ACTIVE','ARCHIVED')),

    CONSTRAINT project_owner_fk
        FOREIGN KEY (owner_user_id)
        REFERENCES users(id)

);

CREATE TABLE project_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    project_id UUID NOT NULL,

    version_number INTEGER NOT NULL,

    base_version_id UUID,

    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',

    created_by UUID,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT project_versions_project_fk
        FOREIGN KEY (project_id)
        REFERENCES projects(id),

    CONSTRAINT project_versions_base_fk
        FOREIGN KEY (base_version_id)
        REFERENCES project_versions(id),

    CONSTRAINT project_versions_created_by_fk
        FOREIGN KEY (created_by)
        REFERENCES users(id),

    CONSTRAINT project_versions_status_check
        CHECK(
            status IN(
                'DRAFT',
                'IN_PROGRESS',
                'COMPLETED',
                'ARCHIVED'
            )
        ),

    CONSTRAINT project_versions_unique_number
        UNIQUE (project_id, version_number)

);
