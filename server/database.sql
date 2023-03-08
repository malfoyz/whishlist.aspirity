create TABLE wish(
    id SERIAL PRIMARY KEY,
    content TEXT,
    image_url VARCHAR(255),
    priority SMALLINT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);