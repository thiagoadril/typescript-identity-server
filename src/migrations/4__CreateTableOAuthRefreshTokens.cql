CREATE TABLE IF NOT EXISTS voissr_identity.oauth_refresh_tokens (
    refresh_token text,
    client_id uuid,
    created timestamp,
    expires timestamp,
    scope text,
    updated timestamp,
    user_id uuid,
    PRIMARY KEY (refresh_token)
);
