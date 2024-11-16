import db from '../config/database.js';

export class DoctorModel {
  async findById(id) {
    const result = await db.query(
      'SELECT id, name, age, email, specialty_id FROM doctor WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }
}