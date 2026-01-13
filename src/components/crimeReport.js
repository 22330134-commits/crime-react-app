import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/crime.css';

const CrimeReport = () => {
  const [reports, setReports] = useState([]);
  const [report, setReport] = useState({
    crime_id: '',
    repoter_name: '', 
    date: '',
    time: '',
    type_of_crime: ''
  });

  // Load existing reports from database when page opens
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:5000/addreport");
        setReports(res.data);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchReports();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the object to your backend
      await axios.post("http://localhost:5000/addreport", report);
      // Refresh to show the new list from the DB
      window.location.reload();
    } catch (err) {
      console.log("Error saving report:", err);
    }
  };
  const removeReport = (uniqueId) => {
    setReports(reports.filter(r => r.uniqueId !== uniqueId));
  };

  return (
 
        <div className="crime-container">
      <h2 className="crime-title">Crime Report Management</h2>
      <section class="report-section">
      <h2>Add New Report</h2>
      
      <form onSubmit={handleSubmit}>
        <div class="form-group">
        <input
          type="text"
          name="crime_id"
          value={report.crime_id}
          onChange={handleInputChange}
          placeholder="Report ID"
        />
        </div>
       
        <div class="form-group">
        <input
          type="text"
          name="repoter_name"
          value={report.repoter_name}
          onChange={handleInputChange}
          placeholder="Reporter Name"
        />
         </div>
       
        <div class="form-group">
        <input
          type="date"
          name="date"
          value={report.date}
          onChange={handleInputChange}
        />
         </div>
        
        <div class="form-group">
        <input
          type="time"
          name="time"
          value={report.time}
          onChange={handleInputChange}
        />
         </div>
        
        <div class="form-group">
        <input
          type="text"
          name="type_of_crime"
          value={report.type_of_crime} 
          onChange={handleInputChange}
          placeholder="Type of Crime"
        />
         </div>
        
        <div class="form-group"></div>
        <button type="submit">Add Report</button>
       
      </form>
      </section>

      <table className="crime-table">
        <thead>
          <tr>
            <th>ID</th><th>Reporter</th><th>Date</th><th>Time</th><th>Type</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.crime_id}>
              <td>{r.crime_id}</td>
              <td>{r.repoter_name}</td>
              <td>{r.date}</td>
              <td>{r.time}</td>
              <td>{r.type_of_crime}</td>
              <td>
                <button onClick={() => removeReport(r.uniqueId)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrimeReport;