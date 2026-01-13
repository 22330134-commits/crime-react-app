import React, { useState } from "react";
import "../style/crime.css";
import avatarImg from "../assets/officer.jpg";

function Messages() {
  const [messages] = useState([
    { id: 1, sender: "Ministry of Interior", role: "Ministry", content: "Quarterly report deadline is next Monday.", timestamp: "2025-11-20 08:30" },
    { id: 2, sender: "Officer Karim", role: "Officer", content: "Patrol schedule updated for Sector A.", timestamp: "2025-11-21 12:10" },
    { id: 3, sender: "Department Head - Investigations", role: "DepartmentHead", content: "New SOP for evidence handling deployed.", timestamp: "2025-11-18 09:45" },
    { id: 4, sender: "Ministry of Interior", role: "Ministry", content: "Annual training registration opens tomorrow.", timestamp: "2025-11-15 15:00" },
    { id: 5, sender: "Officer Lina", role: "Officer", content: "Briefing at 07:30 in Room 3.", timestamp: "2025-11-22 07:00" },
    { id: 6, sender: "Department Head - Patrol", role: "DepartmentHead", content: "Shift handover forms must be signed daily.", timestamp: "2025-11-19 17:20" }
  ]);

  const grouped = {
    Ministry: messages.filter(m => m.role === "Ministry"),
    Officers: messages.filter(m => m.role === "Officer"),
    DepartmentHeads: messages.filter(m => m.role === "DepartmentHead")
  };

  return (
    <div className="crime-container">
      <img src={avatarImg} alt="Officer photo" className="profile-avatar" />
      <h2 className="crime-title">Messages</h2>
        <br></br>
      <section className="report-section">
        <h3>From Ministry</h3>
        <ul className="messages-list">
          {grouped.Ministry.map(msg => (
            <li key={msg.id} className="message-item">
              <strong>{msg.sender}:</strong> {msg.content}
              <div className="message-timestamp">{msg.timestamp}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="report-section">
        <h3>From Other Officers</h3>
        <ul className="messages-list">
          {grouped.Officers.map(msg => (
            <li key={msg.id} className="message-item">
              <strong>{msg.sender}:</strong> {msg.content}
              <div className="message-timestamp">{msg.timestamp}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="report-section">
        <h3>From Department Heads</h3>
        <ul className="messages-list">
          {grouped.DepartmentHeads.map(msg => (
            <li key={msg.id} className="message-item">
              <strong>{msg.sender}:</strong> {msg.content}
              <div className="message-timestamp">{msg.timestamp}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Messages;
