import jwt from 'jsonwebtoken';
import { PatientModel } from '../models/patient.model.js';
import { AppointmentModel } from '../models/appointment.model.js';

export class PatientService {
  constructor() {
    this.patientModel = new PatientModel();
    this.appointmentModel = new AppointmentModel();
  }

  async login(credentials) {
    const patient = await this.patientModel.findByEmail(credentials.email);
    if (!patient || patient.password !== credentials.password) {
      throw new Error('Invalid credentials');
    }

    return jwt.sign(
      { id: patient.id, role: 'patient' },
      process.env.JWT_SECRET,
      { expiresIn: '30m' }
    );
  }

  async getAppointments(patientId, date) {
    return this.appointmentModel.findByPatient(patientId, date);
  }

  async createAppointment(patientId, appointmentData) {
    const hasConflict = await this.appointmentModel.checkConflicts(
      patientId,
      appointmentData.doctorId,
      appointmentData.date,
      appointmentData.hour
    );

    if (hasConflict) {
      throw new Error('Appointment time conflict');
    }

    return this.appointmentModel.create({
      patientId,
      ...appointmentData
    });
  }

  async updateAppointment(patientId, appointmentId, appointmentData) {
    const hasConflict = await this.appointmentModel.checkConflicts(
      patientId,
      appointmentData.doctorId,
      appointmentData.date,
      appointmentData.hour,
      appointmentId
    );

    if (hasConflict) {
      throw new Error('Appointment time conflict');
    }

    return this.appointmentModel.update(appointmentId, {
      patientId,
      ...appointmentData
    });
  }

  async deleteAppointment(patientId, appointmentId) {
    return this.appointmentModel.delete(appointmentId, patientId);
  }
}