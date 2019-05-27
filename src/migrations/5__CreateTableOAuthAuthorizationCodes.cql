CREATE TABLE IF NOT EXISTS voissr_identity.oauth_authorization_codes (
    authorization_code text,
    client_id uuid,
    created timestamp,
    redirect_uri text,
    scope text,
    updated timestamp,
    user_id uuid,
    PRIMARY KEY (authorization_code)
);