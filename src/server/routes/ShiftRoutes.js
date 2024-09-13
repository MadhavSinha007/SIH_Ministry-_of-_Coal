import express from 'express';
import { saveLogEntry, printLogEntries } from '../controllers/ShiftController.js';

const router = express.Router();

router.post('/save', async (req, res) => {
  try {
    const logData = req.body;
    const savedLog = await saveLogEntry(logData);
    res.status(200).json(savedLog);
  } catch (error) {
    res.status(500).json({ error: 'Error saving log entry' });
  }
});

router.get('/print/:shiftNumber', async (req, res) => {
  const { shiftNumber } = req.params;
  
  try {
    await printLogEntries(shiftNumber, res);
  } catch (error) {
    res.status(500).json({ error: 'Error generating PDF report' });
  }
});

export default router;
