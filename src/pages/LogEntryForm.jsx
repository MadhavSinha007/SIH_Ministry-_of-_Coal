import React, { useState } from 'react';
import { TextField, TextareaAutosize, MenuItem, Select, FormControl, InputLabel, Checkbox, FormControlLabel, Button, Typography, Grid } from '@mui/material';

const LogEntryForm = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedEmployees(event.target.value);
  };

  return (
    <form>
      <Typography variant="h4" gutterBottom>
        Log Entry
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Shift Number"
            type="number"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Entry Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Exit Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            minRows={3}
            placeholder="Issues Encountered"
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            minRows={3}
            placeholder="Remarks"
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Employee Attendance</InputLabel>
            <Select
              multiple
              value={selectedEmployees}
              onChange={handleSelectChange}
              renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value="Employee 1">
                <FormControlLabel
                  control={<Checkbox checked={selectedEmployees.indexOf("Employee 1") > -1} />}
                  label="Employee 1 (ID: 001)"
                />
              </MenuItem>
              <MenuItem value="Employee 2">
                <FormControlLabel
                  control={<Checkbox checked={selectedEmployees.indexOf("Employee 2") > -1} />}
                  label="Employee 2 (ID: 002)"
                />
              </MenuItem>
              <MenuItem value="Employee 3">
                <FormControlLabel
                  control={<Checkbox checked={selectedEmployees.indexOf("Employee 3") > -1} />}
                  label="Employee 3 (ID: 003)"
                />
              </MenuItem>

            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LogEntryForm;
