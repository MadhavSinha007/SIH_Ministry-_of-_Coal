import express from 'express';
import { saveLogEntry, printLogEntries } from '../controllers/ShiftController.js';

const router = express.Router();

router.post('/save', saveLogEntry);
router.get('/print', printLogEntries);

export default router;
