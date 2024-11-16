BEGIN;

INSERT INTO specialty (name) VALUES
('Cardiology'),
('Neurology'),
('Pediatrics'),
('Dermatology');

INSERT INTO doctor (name, age, email, password, specialty_id) VALUES
('Dr. John Doe', 45, 'johndoe@example.com', 'password123', 1),
('Dr. Jane Smith', 38, 'janesmith@example.com', 'password123', 2),
('Dr. Emily White', 40, 'emilywhite@example.com', 'password123', 3),
('Dr. Michael Brown', 50, 'michaelbrown@example.com', 'password123', 4);

INSERT INTO patient (name, age, email, password) VALUES
('Alice Cooper', 30, 'alicecooper@example.com', 'password123'),
('Bob Martin', 42, 'bobmartin@example.com', 'password123'),
('Charlie Black', 25, 'charlieblack@example.com', 'password123'),
('Diana Blue', 33, 'dianablue@example.com', 'password123');

INSERT INTO medical_appointment (date, hour, patient_id, doctor_id) VALUES
('2024-11-20', '10:00:00', 1, 1),
('2024-11-20', '11:00:00', 2, 2),
('2024-11-21', '14:00:00', 3, 3),
('2024-11-21', '16:00:00', 4, 4);

COMMIT;