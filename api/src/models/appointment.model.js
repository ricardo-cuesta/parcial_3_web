import db from '../config/database.js';

export class AppointmentModel {
  async findByPatient(patientId, date) {
    let query = 'SELECT * FROM medical_appointment WHERE patient_id = $1';
    const params = [patientId];

    if (date) {
      query += ' AND date = $2';
      params.push(date);
    }

    const result = await db.query(query + ' ORDER BY date, hour', params);
    return result.rows;
  }

  async findByDoctor(doctorId) {
    const result = await db.query(
      'SELECT * FROM medical_appointment WHERE doctor_id = $1 ORDER BY date, hour',
      [doctorId]
    );
    return result.rows;
  }

  async checkConflicts(patientId, doctorId, date, hour, excludeId = null) {
    let query = `
      SELECT COUNT(*) FROM medical_appointment 
      WHERE ((patient_id = $1) OR (doctor_id = $2))
      AND date = $3 AND hour = $4
    `;
    const params = [patientId, doctorId, date, hour];

    if (excludeId) {
      query += ' AND id != $5';
      params.push(excludeId);
    }

    const result = await db.query(query, params);
    return result.rows[0].count > 0;
  }

  async create(appointmentData) {
    const result = await db.query(
      `INSERT INTO medical_appointment (patient_id, doctor_id, date, hour)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [appointmentData.patientId, appointmentData.doctorId, appointmentData.date, appointmentData.hour]
    );
    return result.rows[0];
  }

  async update(id, appointmentData) {
    const result = await db.query(
      `UPDATE medical_appointment 
       SET doctor_id = $1, date = $2, hour = $3
       WHERE id = $4 AND patient_id = $5
       RETURNING *`,
      [appointmentData.doctorId, appointmentData.date, appointmentData.hour, id, appointmentData.patientId]
    );
    return result.rows[0];
  }

  async delete(id, patientId) {
    const result = await db.query(
      'DELETE FROM medical_appointment WHERE id = $1 AND patient_id = $2',
      [id, patientId]
    );
    return result.rowCount > 0;
  }
}