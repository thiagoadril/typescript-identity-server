CREATE TABLE IF NOT EXISTS voissr_identity.oauth_access_tokens (
    access_token text,
    client_id uuid,
    created timestamp,
    expires timestamp,
    scope text,
    updated timestamp,
    user_id uuid,
    PRIMARY KEY (access_token)
);
