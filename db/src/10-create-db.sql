
CREATE TABLE specialty (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    public BOOLEAN DEFAULT true
);

CREATE TABLE doctor (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INTEGER,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    specialty_id INTEGER,
    public BOOLEAN DEFAULT true,
    FOREIGN KEY (specialty_id) REFERENCES specialty(id)
);

CREATE TABLE patient (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INTEGER,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    public BOOLEAN DEFAULT true
);

CREATE TABLE medical_appointment (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    hour TIME NOT NULL,
    patient_id INTEGER NOT NULL,
    doctor_id INTEGER NOT NULL,
    public BOOLEAN DEFAULT true,
    FOREIGN KEY (patient_id) REFERENCES patient(id),
    FOREIGN KEY (doctor_id) REFERENCES doctor(id)
);

CREATE INDEX idx_doctor_specialty ON doctor(specialty_id);
CREATE INDEX idx_appointment_patient ON medical_appointment(patient_id);
CREATE INDEX idx_appointment_doctor ON medical_appointment(doctor_id);