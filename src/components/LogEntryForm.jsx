import React, { useState } from 'react';
import { TextField, TextareaAutosize, MenuItem, Select, FormControl, InputLabel, Checkbox, FormControlLabel, Button, Typography, Box, Snackbar, Alert } from '@mui/material';
import { saveLog, printLog } from '../axios';

const ShiftLogForm = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [logEntry, setLogEntry] = useState({
    date: '',
    shiftNumber: '',
    entryTime: '',
    exitTime: '',
    issues: '',
    remarks: '',
    selectedEmployees: []
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const employees = [
    { name: 'Employee 1', id: '001' },
    { name: 'Employee 2', id: '002' },
    { name: 'Employee 3', id: '003' },
  ];

  const handleSelectChange = (event) => {
    setSelectedEmployees(event.target.value);
    setLogEntry(prevEntry => ({
      ...prevEntry,
      selectedEmployees: event.target.value
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLogEntry(prevEntry => ({
      ...prevEntry,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await saveLog(logEntry);
    setSnackbarOpen(true); // Show the Snackbar on successful submission
  };

  const handlePrint = async () => {
    await printLog();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Log Entry
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Date"
          type="date"
          name="date"
          value={logEntry.date}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="Shift Number"
          type="number"
          name="shiftNumber"
          value={logEntry.shiftNumber}
          onChange={handleInputChange}
          fullWidth
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Entry Time"
            type="time"
            name="entryTime"
            value={logEntry.entryTime}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Exit Time"
            type="time"
            name="exitTime"
            value={logEntry.exitTime}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Box>
        <TextField
          minRows={3}
          placeholder="Issues Encountered"
          name="issues"
          value={logEntry.issues}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '8px' }}
        />
        <TextField
          minRows={3}
          placeholder="Remarks"
          name="remarks"
          value={logEntry.remarks}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '8px' }}
        />
        <FormControl fullWidth>
          <InputLabel>Employee Attendance</InputLabel>
          <Select
            multiple
            value={selectedEmployees}
            onChange={handleSelectChange}
            renderValue={(selected) => selected.join(', ')}
          >
            {employees.map((employee) => (
              <MenuItem key={employee.id} value={employee.name}>
                <FormControlLabel
                  control={<Checkbox checked={selectedEmployees.indexOf(employee.name) > -1} />}
                  label={`${employee.name} (ID: ${employee.id})`}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        <Button variant="contained" color="secondary" onClick={handlePrint}>
          Print
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ShiftLogForm;
