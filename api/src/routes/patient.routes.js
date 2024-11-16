import { Router } from 'express';
import { body, query } from 'express-validator';
import { PatientController } from '../controllers/patient.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();
const patientController = new PatientController();

router.post('/login',
  [
    body('email').isEmail(),
    body('password').notEmpty()
  ],
  patientController.login
);

router.get('/appointment',
  authMiddleware,
  query('date').optional().isDate(),
  patientController.getAppointments
);

router.post('/appointment',
  authMiddleware,
  [
    body('doctorId').isInt(),
    body('date').isDate(),
    body('hour').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  ],
  patientController.createAppointment
);

router.put('/appointment/:appointmentId',
  authMiddleware,
  [
    body('doctorId').isInt(),
    body('date').isDate(),
    body('hour').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  ],
  patientController.updateAppointment
);

router.delete('/appointment/:appointmentId',
  authMiddleware,
  patientController.deleteAppointment
);

export default router;