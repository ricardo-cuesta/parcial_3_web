import { validationResult } from 'express-validator';
import { PatientService } from '../services/patient.service.js';

export class PatientController {
  constructor() {
    this.patientService = new PatientService();
  }

  login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const token = await this.patientService.login(req.body);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  getAppointments = async (req, res) => {
    try {
      const appointments = await this.patientService.getAppointments(req.user.id, req.query.date);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  createAppointment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const appointment = await this.patientService.createAppointment(req.user.id, req.body);
      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  updateAppointment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const appointment = await this.patientService.updateAppointment(
        req.user.id,
        req.params.appointmentId,
        req.body
      );
      res.json(appointment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  deleteAppointment = async (req, res) => {
    try {
      await this.patientService.deleteAppointment(req.user.id, req.params.appointmentId);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}