import { DoctorService } from '../services/doctor.service.js';

export class DoctorController {
  constructor() {
    this.doctorService = new DoctorService();
  }

  getDoctorById = async (req, res) => {
    try {
      const doctor = await this.doctorService.getDoctorById(req.params.doctorId);
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.json(doctor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  getDoctorAppointments = async (req, res) => {
    try {
      const appointments = await this.doctorService.getDoctorAppointments(req.params.doctorId);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}