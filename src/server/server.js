import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

const app = express();
const port = 8081;

app.use(cors());
app.use(bodyParser.json());

// Path setup
const logDir = path.join(__dirname, 'logs');
const filePrefix = 'log-entries';
const maxFiles = 3;

const getFilePath = (index) => path.join(logDir, `${filePrefix}-${index}.json`);

const rotateFiles = (logData) => {
  const filePaths = Array.from({ length: maxFiles }, (_, i) => getFilePath(i));
  filePaths.reverse().forEach((filePath, i) => {
    if (fs.existsSync(filePath)) {
      if (i === maxFiles - 1) {
        fs.unlinkSync(filePath);
      } else {
        fs.renameSync(filePath, getFilePath(i + 1));
      }
    }
  });

  // Save new data to the latest file
  fs.writeFileSync(filePaths[0], JSON.stringify([logData], null, 2));
};

app.post('/save', (req, res) => {
  const logData = req.body;
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  rotateFiles(logData);

  res.status(200).json({ message: 'Log entry saved successfully' });
});

app.get('/print', (req, res) => {
  const filePaths = Array.from({ length: maxFiles }, (_, i) => getFilePath(i)).reverse();
  const latestFilePath = filePaths.find(filePath => fs.existsSync(filePath));

  if (!latestFilePath) {
    return res.status(404).json({ error: 'No log files found' });
  }

  fs.readFile(latestFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read log file' });
    }

    const logEntries = JSON.parse(data);
    const doc = new PDFDocument();
    let filename = 'log-entries.pdf';
    filename = encodeURIComponent(filename);

    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);

    doc.fontSize(20).text('Log Entries', { align: 'center' });
    doc.moveDown();

    logEntries.forEach((entry, index) => {
      doc.fontSize(14).text(`Entry ${index + 1}`, { underline: true });
      doc.fontSize(12).text(`Date: ${entry.date}`);
      doc.fontSize(12).text(`Shift Number: ${entry.shiftNumber}`);
      doc.fontSize(12).text(`Entry Time: ${entry.entryTime}`);
      doc.fontSize(12).text(`Exit Time: ${entry.exitTime}`);
      doc.fontSize(12).text(`Issues Encountered: ${entry.issues}`);
      doc.fontSize(12).text(`Remarks: ${entry.remarks}`);
      doc.fontSize(12).text(`Employee Attendance: ${entry.selectedEmployees.join(', ')}`);
      doc.moveDown();
    });

    doc.end();
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
