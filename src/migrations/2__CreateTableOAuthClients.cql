CREATE TABLE IF NOT EXISTS voissr_identity.oauth_clients (
    client_id uuid,
    client_secret text,
    created timestamp,
    name text,
    trusted boolean,
    updated timestamp,
    user_id uuid,
    PRIMARY KEY (client_id)
);
