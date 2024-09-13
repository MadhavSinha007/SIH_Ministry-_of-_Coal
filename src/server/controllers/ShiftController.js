import PDFDocument from 'pdfkit';
import { saveShiftLog, getLatestShiftLog } from '../models/ShiftModel.js'; // Adjust path as necessary

// Function to save or update a shift log entry
export const saveLogEntry = async (req, res) => {
  try {
    const logData = req.body;
    const savedLog = await saveShiftLog(logData);
    res.status(200).json(savedLog);
  } catch (error) {
    res.status(500).json({ error: 'Error saving or updating shift log entry' });
  }
};

// Function to print log entries as a PDF
export const printLogEntries = async (req, res) => {
  const { shiftNumber } = req.params;
  
  try {
    const clockInLog = await getLatestShiftLog(shiftNumber, 'clock_in');
    const clockOutLog = await getLatestShiftLog(shiftNumber, 'clock_out');

    // Create a new PDF document
    const doc = new PDFDocument();
    const filename = `Shift_${shiftNumber}_Report.pdf`;
    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);

    // Title
    doc.fontSize(20).text(`Shift Report for Shift Number: ${shiftNumber}`, { align: 'center' });
    doc.moveDown();

    // Clock-in Section
    doc.fontSize(16).text('Clock-In Details', { underline: true });
    doc.moveDown();

    if (clockInLog) {
      doc.fontSize(12)
        .text(`Date: ${clockInLog.date}`)
        .text(`Shift Number: ${clockInLog.shiftNumber}`)
        .text(`Entry Time: ${clockInLog.time}`)
        .text(`Issues: ${clockInLog.issues || 'None'}`)
        .text(`Remarks: ${clockInLog.remarks || 'None'}`)
        .text(`Oxygen: ${clockInLog.oxygen || 'N/A'}`)
        .text(`Methane: ${clockInLog.methane || 'N/A'}`)
        .text(`Monoxide: ${clockInLog.monoxide || 'N/A'}`)
        .text(`Ventilation: ${clockInLog.ventilation || 'N/A'}`)
        .text(`Integrity: ${clockInLog.integrity || 'N/A'}`)
        .text(`Selected Employees: ${clockInLog.selectedEmployees || 'None'}`);
    } else {
      doc.fontSize(12).text('No clock-in log found for this shift.');
    }
    
    doc.moveDown(2); // Space between sections

    // Clock-out Section
    doc.fontSize(16).text('Clock-Out Details', { underline: true });
    doc.moveDown();

    if (clockOutLog) {
      doc.fontSize(12)
        .text(`Date: ${clockOutLog.date}`)
        .text(`Shift Number: ${clockOutLog.shiftNumber}`)
        .text(`Exit Time: ${clockOutLog.time}`)
        .text(`Issues: ${clockOutLog.issues || 'None'}`)
        .text(`Remarks: ${clockOutLog.remarks || 'None'}`)
        .text(`Oxygen: ${clockOutLog.oxygen || 'N/A'}`)
        .text(`Methane: ${clockOutLog.methane || 'N/A'}`)
        .text(`Monoxide: ${clockOutLog.monoxide || 'N/A'}`)
        .text(`Ventilation: ${clockOutLog.ventilation || 'N/A'}`)
        .text(`Integrity: ${clockOutLog.integrity || 'N/A'}`)
        .text(`Selected Employees: ${clockOutLog.selectedEmployees || 'None'}`);
    } else {
      doc.fontSize(12).text('Shift not clocked out yet.');
    }

    doc.end();

  } catch (error) {
    res.status(500).json({ error: 'Error generating PDF report' });
  }
};
