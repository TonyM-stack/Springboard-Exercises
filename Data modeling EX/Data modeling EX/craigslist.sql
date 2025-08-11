-- Regions
CREATE TABLE regions (
  id   INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL
);

-- Categories
CREATE TABLE categories (
  id   INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL
);

-- Users
CREATE TABLE users (
  id                   INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username             VARCHAR NOT NULL,
  encryted_password    VARCHAR NOT NULL,            -- spelled as in your diagram
  preferred_region_id  INTEGER REFERENCES regions(id) ON DELETE SET NULL
);

-- Posts
CREATE TABLE posts (
  id          INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title       VARCHAR NOT NULL,
  text        TEXT,                                  -- column name "text" is OK in Postgres
  location    TEXT,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  region_id   INTEGER REFERENCES regions(id) ON DELETE SET NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL
);

-- Helpful indexes (speed up joins/filters)
CREATE INDEX ON posts (user_id);
CREATE INDEX ON posts (region_id);
CREATE INDEX ON posts (category_id);
CREATE INDEX ON users (preferred_region_id);

-- (Optional but sensible)
-- ALTER TABLE users ADD CONSTRAINT users_username_uniq UNIQUE (username);
-- ALTER TABLE regions ADD CONSTRAINT regions_name_uniq UNIQUE (name);
-- ALTER TABLE categories ADD CONSTRAINT categories_name_uniq UNIQUE (name);
