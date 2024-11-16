import { DoctorModel } from '../models/doctor.model.js';
import { AppointmentModel } from '../models/appointment.model.js';

export class DoctorService {
  constructor() {
    this.doctorModel = new DoctorModel();
    this.appointmentModel = new AppointmentModel();
  }

  async getDoctorById(doctorId) {
    return this.doctorModel.findById(doctorId);
  }

  async getDoctorAppointments(doctorId) {
    return this.appointmentModel.findByDoctor(doctorId);
  }
}
