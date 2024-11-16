import express from 'express';
import patientRoutes from './routes/patient.routes.js';
import doctorRoutes from './routes/doctor.routes.js';

const app = express();
app.use(express.json());

app.use('/patient', patientRoutes);
app.use('/doctor', doctorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));