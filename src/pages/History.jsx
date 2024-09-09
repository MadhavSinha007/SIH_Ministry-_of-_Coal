import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';   


function WorkerHistory() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Fetch history data from the database
    fetchHistoryData().then((data) => setHistoryData(data));
  }, []);

  const fetchHistoryData = async () => {
    // Replace with your actual database query
    const response = await fetch('/api/worker-history');
    const data = await response.json();
    return data;
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Tasks</TableCell>   

            <TableCell>Safety Incidents</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {historyData.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.startTime}</TableCell>
              <TableCell>{entry.endTime}</TableCell>
              <TableCell>{entry.tasks}</TableCell>
              <TableCell>{entry.safetyIncidents}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WorkerHistory;