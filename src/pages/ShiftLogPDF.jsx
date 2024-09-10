import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Checkbox, FormControlLabel } from '@mui/material';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
    padding: 10,
    border: '1px solid #ccc',
    borderRadius: 5,
  },
  text: {
    marginBottom: 5,
  },
});

const ShiftLogPDF = ({ shifts }) => (
  <Document>
    <Page style={styles.page}>
      {shifts.map((shift, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.text}>Shift Number: {shift.number}</Text>
          <Text style={styles.text}>Manager Name: {shift.manager}</Text>
          <Text style={styles.text}>Signature: {shift.signature}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

const ShiftLogHistory = () => {
  const [selectedShift, setSelectedShift] = useState(null);

  const shifts = [
    { number: 1, manager: 'John Doe', signature: 'JD' },
    { number: 2, manager: 'Jane Smith', signature: 'JS' },
    // Add more shifts as needed
  ];

  const handleShiftSelection = (number) => {
    setSelectedShift(number);
  };

  const filteredShifts = selectedShift 
    ? shifts.filter(shift => shift.number === selectedShift) 
    : shifts;

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Shift Log History
      </Typography>
      <Grid container spacing={2}>
        {shifts.map((shift) => (
          <Grid item xs={12} sm={6} md={4} key={shift.number}>
            <Box p={2} border={1} borderColor="grey.300" borderRadius={2}>
              <Typography variant="h6">Shift Number: {shift.number}</Typography>
              <Typography>Manager Name: {shift.manager}</Typography>
              <Typography>Signature: {shift.signature}</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedShift === shift.number}
                    onChange={() => handleShiftSelection(shift.number)}
                  />
                }
                label="Select"
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box mt={2}>
        <PDFDownloadLink
          document={<ShiftLogPDF shifts={filteredShifts} />}
          fileName="shift_log_history.pdf"
          style={{ textDecoration: 'none' }}
        >
          {({ loading }) => (
            <Button variant="contained" color="primary">
              {loading ? 'Loading document...' : 'Download as PDF'}
            </Button>
          )}
        </PDFDownloadLink>
      </Box>
    </Box>
  );
};

export default ShiftLogHistory;
