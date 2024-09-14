import express from 'express';
import { saveLogEntry, printLogEntries } from '../controllers/ShiftController.js';

const router = express.Router();

router.post('/save', async (req, res) => {
  try {
    console.log("the router function for save works");
    
    const logData = req.body;
    console.log(logData);
    
    const savedLog = await saveLogEntry(req,res); 
    console.log("Saved log\n",savedLog);
    
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
