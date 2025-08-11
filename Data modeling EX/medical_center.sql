-- Doctors
CREATE TABLE doctors (
  id         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       VARCHAR NOT NULL,
  specialty  VARCHAR
);

-- Patients
CREATE TABLE patients (
  id         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       VARCHAR NOT NULL,
  insurance  TEXT,
  birthday   DATE NOT NULL
);

-- Visits  (one doctor, one patient)
CREATE TABLE visits (
  id         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  doctor_id  INTEGER NOT NULL REFERENCES doctors(id),
  patient_id INTEGER NOT NULL REFERENCES patients(id),
  "date"     TIMESTAMP NOT NULL
);
CREATE INDEX ON visits (doctor_id);
CREATE INDEX ON visits (patient_id);
CREATE INDEX ON visits ("date");

-- Diseases
CREATE TABLE diseases (
  id          INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        VARCHAR NOT NULL,
  description TEXT
);

-- Diagnoses (visit ↔ disease)
CREATE TABLE diagnoses (
  id         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  visit_id   INTEGER NOT NULL REFERENCES visits(id) ON DELETE CASCADE,
  disease_id INTEGER NOT NULL REFERENCES diseases(id),
  notes      TEXT,
  -- recommended to prevent duplicates per visit:
  UNIQUE (visit_id, disease_id)
);
CREATE INDEX ON diagnoses (visit_id);
CREATE INDEX ON diagnoses (disease_id);
