import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api', 
  responseType: 'arraybuffer' // Add this to handle binary data
});

export const saveLog = async (logEntry) => {
  try {
    const response = await api.post('/save', logEntry);
    console.log(response.data);
  } catch (error) {
    console.error('Error saving log entry:', error);
  }
};

export const printLog = async () => {
  try {
    const response = await api.get('/print');
    return response; // Return the response to handle in the component
  } catch (error) {
    console.error('Error fetching log entries:', error);
  }
};
