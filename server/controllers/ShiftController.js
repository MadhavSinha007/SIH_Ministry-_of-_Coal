import { saveShiftLog, getLogsByShiftNumber } from '../models/ShiftModel.js';
import PDFDocument from 'pdfkit';

export const saveLogEntry = async (req, res) => {
  console.log("The controller function starts here!");
  
  // Log the entire request body for debugging
  console.log('Received log entry data:', req.body);

  const {
    date,
    shiftNumber,
    time,
    issues,
    remarks,
    oxygen,
    methane,
    monoxide,
    ventilation,
    integrity,
    selectedEmployees,
    logType
  } = req.body;

  // Additional logging for each field
  console.log('date:', date);
  console.log('shiftNumber:', shiftNumber);
  console.log('time:', time);
  console.log('issues:', issues);
  console.log('remarks:', remarks);
  console.log('oxygen:', oxygen);
  console.log('methane:', methane);
  console.log('monoxide:', monoxide);
  console.log('ventilation:', ventilation);
  console.log('integrity:', integrity);
  console.log('selectedEmployees:', selectedEmployees);
  console.log('logType:', logType);

  // Basic validation
  if (
    !date || !shiftNumber || !time || !logType ||
    typeof date !== 'string' || typeof shiftNumber !== 'string' || 
    typeof time !== 'string' || typeof logType !== 'string'
  ) {
    console.log('Invalid input data:', req.body);
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    const logEntry = await saveShiftLog(req.body);
    res.status(200).json(logEntry);
  } catch (error) {
    console.error('Error saving log entry:', error);
    res.status(500).json({ error: 'Error saving log entry', details: error.message });
  }
};


export const printLogEntries = async (req, res) => {
  const { shiftNumber } = req.query;

  // Basic validation
  if (!shiftNumber || typeof shiftNumber !== 'string') {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  // Log shift number request
  console.log('Fetching logs for shift number:', shiftNumber);

  try {
    const logs = await getLogsByShiftNumber(shiftNumber);

    // Log the retrieved logs
    console.log('Retrieved logs:', logs);

    const doc = new PDFDocument();
    let buffers = [];
    
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      res.contentType('application/pdf');
      res.send(pdfData);
    });

    doc.fontSize(16).text(`Shift Log Report for Shift Number: ${shiftNumber}`, { align: 'center' });
    doc.moveDown();

    logs.forEach(log => {
      doc.fontSize(12).text(`Date: ${log.date}`);
      doc.fontSize(12).text(`Shift Number: ${log.shiftNumber}`);
      doc.fontSize(12).text(`Time: ${log.time}`);
      doc.fontSize(12).text(`Issues: ${log.issues}`);
      doc.fontSize(12).text(`Remarks: ${log.remarks}`);
      doc.fontSize(12).text(`Oxygen: ${log.oxygen}`);
      doc.fontSize(12).text(`Methane: ${log.methane}`);
      doc.fontSize(12).text(`Monoxide: ${log.monoxide}`);
      doc.fontSize(12).text(`Ventilation: ${log.ventilation}`);
      doc.fontSize(12).text(`Integrity: ${log.integrity}`);
      doc.fontSize(12).text(`Selected Employees: ${JSON.stringify(log.selectedEmployees)}`);
      doc.fontSize(12).text(`Log Type: ${log.logType}`);
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.error('Error printing log entries:', error);
    res.status(500).json({ error: 'Error printing log entries', details: error.message });
  }
};
