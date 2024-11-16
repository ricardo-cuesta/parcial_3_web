import { Router } from 'express';
import { DoctorController } from '../controllers/doctor.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();
const doctorController = new DoctorController();

router.get('/:doctorId',
  authMiddleware,
  doctorController.getDoctorById
);

router.get('/:doctorId/appointment',
  authMiddleware,
  doctorController.getDoctorAppointments
);

export default router;