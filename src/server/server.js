import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logRoutes from './routes/ShiftRoutes.js';
import { createShiftLogsTable } from './models/ShiftModel.js'; // Update the path if needed

const app = express();
const port = 8081;

app.use(cors());
app.use(bodyParser.json());

// Set up the API routes
app.use('/api', logRoutes);

// Initialize the database table
const initializeDatabase = async () => {
  try {
    await createShiftLogsTable(); // Create shift_logs table
    console.log('Database tables initialized.');
  } catch (error) {
    console.error('Error initializing database tables:', error);
  }
};

// Initialize the database tables when the server starts
initializeDatabase();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
