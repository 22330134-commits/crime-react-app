import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/crime.css';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [report, setReport] = useState({
    report_id:'',
    assigned_officer: '',
    notes: '',
    status: 'Open'
  });

  // Load data from updae_crime table (via backend) on page load
 

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:5000/update_crime");
        setReports(res.data);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchReports();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
    
  };

  // Add new report
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/update_crime", report);
      alert("Added successfully!");
      setReports(); // refresh table data
      setReport({
        report_id:'',
        assigned_officer: '',
        notes: '',
        status: 'Open'
      });
    } catch (err) {
      console.error("Error saving report:", err);
      alert("Failed to save.");
    }
  };

  // Delete report
  const removeReport = async (report_id) => {
    try {
      await axios.delete(`http://localhost:5000/delete-update/${report_id}`);
      alert("Deleted successfully!");
      //fetchReports(); // refresh table data
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <div className="crime-container">
      <h2 className="crime-title">Crime Update Management</h2>

      <section className="report-section">
        <h2>Add New Assignment</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="assigned_officer"
              value={report.assigned_officer}
              onChange={handleInputChange}
              placeholder="Officer Name"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="notes"
              value={report.notes}
              onChange={handleInputChange}
              placeholder="Notes"
              required
            />
          </div>

          <div className="form-group">
            <select
              name="status"
              value={report.status}
              onChange={handleInputChange}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <button type="submit">Add Assignment</button>
        </form>
      </section>

      <table className="crime-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Officer</th>
            <th>Notes</th>
            <th>Status</th>
            <th>Action</th>
            
          </tr>
        </thead>

        <tbody>
          {reports.length > 0 ? (
            reports.map((r) => (
              <tr key={r.report_id}>
                <td>{r.report_id}</td>
                <td>{r.assigned_officer}</td>
                <td>{r.notes}</td>
                <td>{r.status}</td>
                <td>
                  <button onClick={() => removeReport(r.report_id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
