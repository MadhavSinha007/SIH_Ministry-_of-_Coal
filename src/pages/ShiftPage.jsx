import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WorkerJobLog() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs'); // Replace with your API endpoint
        setJobs(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching job data: {error.message}</div>;
  }

  return (
    <div>
      <h2>Worker Job Log</h2>
      <table>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Job Title</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.title}</td>
              <td>{job.startTime}</td>
              <td>{job.endTime}</td>
              <td>{job.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkerJobLog;