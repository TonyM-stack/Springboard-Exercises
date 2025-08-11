-- TEAMS
CREATE TABLE teams (
  id    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name  VARCHAR NOT NULL,
  city  VARCHAR
);

-- PLAYERS
CREATE TABLE players (
  id               INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name             VARCHAR NOT NULL,
  birthday         DATE,
  height           TEXT,
  current_team_id  INTEGER REFERENCES teams(id) ON DELETE SET NULL
);
CREATE INDEX ON players (current_team_id);

-- REFEREES
CREATE TABLE referees (
  id    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name  VARCHAR NOT NULL
);

-- SEASONS
CREATE TABLE season (
  id         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  start_date DATE NOT NULL,
  end_date   DATE   -- allow null until scheduled
);

-- MATCHES
CREATE TABLE matches (
  id                      INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  home_team_id            INTEGER NOT NULL REFERENCES teams(id),
  away_team_id            INTEGER NOT NULL REFERENCES teams(id),
  location                TEXT,
  date                    DATE,
  start_time              TIMESTAMP,
  season_id               INTEGER REFERENCES season(id),
  head_referee_id         INTEGER REFERENCES referees(id),
  assistant_referee_id_1  INTEGER REFERENCES referees(id),
  assistant_referee_id_2  INTEGER REFERENCES referees(id),
  CHECK (home_team_id <> away_team_id)
);
CREATE INDEX ON matches (season_id);
CREATE INDEX ON matches (home_team_id);
CREATE INDEX ON matches (away_team_id);

-- LINEUPS (which players appeared for which team in a match)
CREATE TABLE lineups (
  id         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  player_id  INTEGER REFERENCES players(id) ON DELETE SET NULL,
  match_id   INTEGER NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  team_id    INTEGER NOT NULL REFERENCES teams(id),
  UNIQUE (player_id, match_id)   -- a player listed at most once per match
);
CREATE INDEX ON lineups (match_id);
CREATE INDEX ON lineups (team_id);

-- GOALS (who scored in which match)
CREATE TABLE goals (
  id        INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  player_id INTEGER REFERENCES players(id) ON DELETE SET NULL,
  match_id  INTEGER NOT NULL REFERENCES matches(id) ON DELETE CASCADE
  -- add minute SMALLINT, body_part TEXT, etc. if you track them
);
CREATE INDEX ON goals (match_id);
CREATE INDEX ON goals (player_id);

-- RESULTS (result for a team in a given match)
CREATE TABLE results (
  id        INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  team_id   INTEGER NOT NULL REFERENCES teams(id),
  match_id  INTEGER NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  result    TEXT,  -- e.g., 'W', 'L', 'D', or '2–1'
  UNIQUE (team_id, match_id)
);
CREATE INDEX ON results (match_id);
CREATE INDEX ON results (team_id);
