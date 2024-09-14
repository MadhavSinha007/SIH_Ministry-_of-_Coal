import React, { useState } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel, Checkbox, FormControlLabel, Button, Typography, Box, Snackbar, Divider, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { saveLog, printLog } from '../axios';

const ShiftLogForm = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [logEntry, setlogEntry] = useState({
    date: '',
    shiftNumber: '',
    exitTime: '',
    issues: '',
    remarks: '',
    oxygen: '',
    methane: '',
    monoxide: '',
    ventilation: '',
    integrity: '',
    selectedEmployees: []
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const navigate = useNavigate();

  const employees = [
    { name: 'Employee 1', id: '001', img: 'https://via.placeholder.com/50' },
    { name: 'Employee 2', id: '002', img: 'https://via.placeholder.com/50' },
    { name: 'Employee 3', id: '003', img: 'https://via.placeholder.com/50' },
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
    try {
      await saveLog(logEntry);
      setSnackbarMessage('Log entry submitted successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage('Failed to submit log entry.');
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
  };

  const handlePrint = async () => {
    try {
      const response = await printLog(); // Ensure this function fetches the PDF correctly
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'log-entries.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
      setSnackbarMessage('Failed to fetch log entries.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleEmployeeClick = (id) => {
    navigate(`/employee/${id}`);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Shift Clock-Out
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <img
                    src={employee.img}
                    alt={employee.name}
                    style={{ width: 50, height: 50, borderRadius: '50%', cursor: 'pointer' }}
                    onClick={() => handleEmployeeClick(employee.id)}
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedEmployees.includes(employee.name)} />}
                    label={`${employee.name} (ID: ${employee.id})`}
                    sx={{ ml: 'auto' }}
                  />
                </Box>
              </MenuItem>
            ))}
          </Select>
          <Typography variant="h4" gutterBottom mt={4}>
            Safety Checks
          </Typography>
          <TextField
          minRows={3}
          placeholder="Oxygen Level"
          name="oxygen"
          value={logEntry.oxygen}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '8px' }}
          />
          <TextField
          minRows={3}
          placeholder="Methane Level"
          name="oxygen"
          value={logEntry.methane}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '8px' }}
          />
          <TextField
          minRows={3}
          placeholder="Carbon Monoxide Level"
          name="oxygen"
          value={logEntry.monoxide}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '8px' }}
          />
          <TextField
          minRows={3}
          placeholder="Ventilation Level"
          name="oxygen"
          value={logEntry.ventilation}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '8px' }}
          />
          <TextField
          minRows={3}
          placeholder="Structural Integrity Level"
          name="oxygen"
          value={logEntry.integrity}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '8px' }}
          />
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ShiftLogForm;