import db from '../config/database.js';

export class PatientModel {
  async findByEmail(email) {
    const result = await db.query(
      'SELECT * FROM patient WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }
}
