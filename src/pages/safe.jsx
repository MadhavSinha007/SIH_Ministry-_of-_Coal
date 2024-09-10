import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function IndeterminateCheckbox() {
  // State for checkboxes
  const [checked, setChecked] = React.useState([true, false]);
  
  // State for threshold values
  const [thresholds, setThresholds] = React.useState({
    min: 0,
    max: 100
  });

  // State for input values
  const [inputValues, setInputValues] = React.useState({
    preshift: '',
    postshift: ''
  });

  // Handle checkbox change
  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  // Handle input changes and validation
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const numValue = parseFloat(value);
    setInputValues(prevState => ({ ...prevState, [name]: value }));

    // Validate input value
    if (!isNaN(numValue) && numValue >= thresholds.min && numValue <= thresholds.max) {
      console.log(`${name} value is within the valid range.`);
    } else {
      console.log(`${name} value is out of the valid range.`);
    }
  };

  // Render checkboxes and input fields
  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Child 1"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
      <TextField
        label="Preshift Value"
        name="preshift"
        value={inputValues.preshift}
        onChange={handleInputChange}
        type="number"
        InputProps={{ inputProps: { min: thresholds.min, max: thresholds.max } }}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Postshift Value"
        name="postshift"
        value={inputValues.postshift}
        onChange={handleInputChange}
        type="number"
        InputProps={{ inputProps: { min: thresholds.min, max: thresholds.max } }}
        sx={{ mt: 2 }}
      />
      <Typography variant="body2" sx={{ mt: 2 }}>
        Thresholds: {thresholds.min} - {thresholds.max}
      </Typography>
    </Box>
  );

  return (
    <div>
      <FormControlLabel
        label="Parent"
        control={
          <Checkbox
            checked={checked[0] && checked[1]}
            indeterminate={checked[0] !== checked[1]}
            onChange={handleChange1}
          />
        }
      />
      {children}
    </div>
  );
}
