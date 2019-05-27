CREATE TABLE IF NOT EXISTS voissr_identity.oauth_users (
    user_id uuid,
    created timestamp,
    name text,
    "password" text,
    updated timestamp,
    username text,
    verified boolean,
    PRIMARY KEY (user_id)
);
---
CREATE INDEX idx_oauth_users_username ON voissr_identity.oauth_users (username);
