import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logRoutes from './routes/ShiftRoutes.js';
import { createTable } from './models/ShiftModel.js';

const app = express();
const port = 8081;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', logRoutes);

// Initialize the database table
createTable();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
