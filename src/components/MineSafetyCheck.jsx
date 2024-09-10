import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import './MineSafetyCheck.css'; // Import the CSS file




// Safety Page Component
const Safety = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                This Will Be The Safety Page
            </Typography>
            <Typography variant="body1" style={{ marginTop: '16px' }}>
                <span className="red-asterisk-span">*</span> Ensure all safety checks are completed accurately.
            </Typography>
        </Container>
    );
};

// Mine Safety Check Component
const MineSafetyCheck = () => {
    const [shiftNumber, setShiftNumber] = useState('');
    const [checkType, setCheckType] = useState('');
    const [beforeChecks, setBeforeChecks] = useState({
        oxygen: '',
        methane: '',
        carbonMonoxide: '',
        ventilation: '',
        structuralIntegrity: '',
    });

    const [afterChecks, setAfterChecks] = useState({
        oxygen: '',
        methane: '',
        carbonMonoxide: '',
        ventilation: '',
        structuralIntegrity: '',
    });

    const [result, setResult] = useState('');

    const handleChange = (e, type) => {
        const { name, value } = e.target;
        if (type === 'before') {
            setBeforeChecks({ ...beforeChecks, [name]: value });
        } else {
            setAfterChecks({ ...afterChecks, [name]: value });
        }
    };

    const handleSubmit = () => {
        const issues = [];
        if (beforeChecks.oxygen !== afterChecks.oxygen) issues.push('Oxygen levels mismatch');
        if (beforeChecks.methane !== afterChecks.methane) issues.push('Methane levels mismatch');
        if (beforeChecks.carbonMonoxide !== afterChecks.carbonMonoxide) issues.push('Carbon Monoxide levels mismatch');
        if (beforeChecks.ventilation !== afterChecks.ventilation) issues.push('Ventilation issues');
        if (beforeChecks.structuralIntegrity !== afterChecks.structuralIntegrity) issues.push('Structural Integrity issues');

        if (issues.length > 0) {
            setResult(`Not safe to enter the mine. Issues: ${issues.join(', ')}`);
        } else {
            setResult('Safe to enter the mine.');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Mine Safety Check
            </Typography>
            <FormControl fullWidth margin="normal">
                <InputLabel id="shift-number-label">Shift Number</InputLabel>
                <Select
                    labelId="shift-number-label"
                    value={shiftNumber}
                    onChange={(e) => setShiftNumber(e.target.value)}
                    required
                >
                    <MenuItem value={1}>Shift 1</MenuItem>
                    <MenuItem value={2}>Shift 2</MenuItem>
                    <MenuItem value={3}>Shift 3</MenuItem>
                </Select>
            </FormControl>
            {shiftNumber && (
                <div>
                    <Button variant="contained" color="primary" onClick={() => setCheckType('preshift')} style={{ marginRight: '8px' }}>
                        Preshift
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => setCheckType('postshift')}>
                        Postshift
                    </Button>
                </div>
            )}
            {checkType === 'preshift' && (
                <Grid container spacing={3} style={{ marginTop: '16px' }}>
                    <Grid item xs={12}>
                        <Paper elevation={3} style={{ padding: '16px' }}>
                            <Typography variant="h6">Before Checks</Typography>
                            <TextField
                                label="Oxygen Levels"
                                name="oxygen"
                                value={beforeChecks.oxygen}
                                onChange={(e) => handleChange(e, 'before')}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Methane Levels"
                                name="methane"
                                value={beforeChecks.methane}
                                onChange={(e) => handleChange(e, 'before')}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Carbon Monoxide Levels"
                                name="carbonMonoxide"
                                value={beforeChecks.carbonMonoxide}
                                onChange={(e) => handleChange(e, 'before')}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Ventilation"
                                name="ventilation"
                                value={beforeChecks.ventilation}
                                onChange={(e) => handleChange(e, 'before')}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Structural Integrity"
                                name="structuralIntegrity"
                                value={beforeChecks.structuralIntegrity}
                                onChange={(e) => handleChange(e, 'before')}
                                fullWidth
                                margin="normal"
                                required
                            />
                        </Paper>
                    </Grid>
                </Grid>
            )}
            {checkType === 'postshift' && (
                <Grid container spacing={3} style={{ marginTop: '16px' }}>
                    <Grid item xs={12}>
                        <Paper elevation={3} style={{ padding: '16px' }}>
                            <Typography variant="h6">After Checks</Typography>
                            <TextField
                                label="Oxygen Levels"
                                name="oxygen"
                                value={afterChecks.oxygen}
                                onChange={(e) => handleChange(e, 'after')}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Methane Levels"
                                name="methane"
                                value={afterChecks.methane}
                                onChange={(e) => handleChange(e, 'after')}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Carbon Monoxide Levels"
                                name="carbonMonoxide"
                                value={afterChecks.carbonMonoxide}
                                onChange={(e) => handleChange(e, 'after')}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Ventilation"
                                name="ventilation"
                                value={afterChecks.ventilation}
                                onChange={(e) => handleChange(e, 'after')}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Structural Integrity"
                                name="structuralIntegrity"
                                value={afterChecks.structuralIntegrity}
                                onChange={(e) => handleChange(e, 'after')}
                                fullWidth
                                margin="normal"
                                required
                            />
                        </Paper>
                    </Grid>
                </Grid>
            )}
            <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '16px' }}>
                Submit
            </Button>
            {result && (
                <Typography variant="h6" color="error" style={{ marginTop: '16px' }}>
                    {result}
                </Typography>
            )}
            <Typography variant="body1" style={{ marginTop: '16px' }}>
                <span className="red-asterisk-span">*</span> Ensure all safety checks are completed accurately.
            </Typography>
        </Container>
    );
};

// Main Component to Toggle Between Safety and MineSafetyCheck
const MainComponent = () => {
    const [showSafety, setShowSafety] = useState(true);

    return (
        <Container>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setShowSafety(!showSafety)}
                style={{ margin: '16px 0' }}
            >
                {showSafety ? 'Go to Mine Safety Check' : 'Go to Safety Page'}
            </Button>
            {showSafety ? <Safety /> : <MineSafetyCheck />}
        </Container>
    );
};

export default MainComponent;
