import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081',
});

const saveLog = async (logEntry) => {
  try {
    const response = await api.post('/save', logEntry);
    console.log('Save Response:', response.data);
  } catch (error) {
    console.error('Error saving log entry:', error);
  }
};

const printLog = async () => {
  try {
    const response = await api.get('/print', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'log-entries.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Error fetching log entries:', error);
  }
};

export{
  saveLog,
  printLog,
}