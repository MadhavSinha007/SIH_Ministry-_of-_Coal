import { saveLog, getLatestLog } from '../models/ShiftModel.js';
import PDFDocument from 'pdfkit';

const saveLogEntry = async (req, res) => {
  try {
    const logData = req.body;
    const log = await saveLog(logData);
    res.status(200).json({ message: 'Log entry saved successfully', log });
  } catch (error) {
    console.error('Error saving log entry:', error);
    res.status(500).json({ error: 'Failed to save log entry' });
  }
};

const printLogEntries = async (req, res) => {
  try {
    const logEntry = await getLatestLog();

    if (!logEntry) {
      return res.status(404).json({ error: 'No log entries found' });
    }

    const doc = new PDFDocument();
    let filename = 'log-entries.pdf';
    filename = encodeURIComponent(filename);

    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);

    doc.fontSize(20).text('Log Entries', { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text('Latest Log Entry', { underline: true });
    doc.fontSize(12).text(`Date: ${logEntry.date}`);
    doc.fontSize(12).text(`Shift Number: ${logEntry.shiftnumber}`);
    doc.fontSize(12).text(`Entry Time: ${logEntry.entrytime}`);
    doc.fontSize(12).text(`Exit Time: ${logEntry.exittime}`);
    doc.fontSize(12).text(`Issues Encountered: ${logEntry.issues}`);
    doc.fontSize(12).text(`Remarks: ${logEntry.remarks}`);
    doc.fontSize(12).text(`Employee Attendance: ${logEntry.selectedemployees.join(', ')}`);
    doc.moveDown();

    doc.end();
  } catch (error) {
    console.error('Error fetching log entries:', error);
    res.status(500).json({ error: 'Failed to fetch log entries' });
  }
};

export { saveLogEntry, printLogEntries };
