import React from "react";
import '../style/crime.css';
import '../style/Contact.css';
import avatarImg from "../assets/officer.jpg";

function Contact() {
  const prisons = [
    {
      name: "سجن رومية",
      phones: ["+961 01 234567"],
      emails: ["roumieh@lb.gov"]
    },
    {
      name: "سجن يارزة",
      phones: ["+961 01 345678"],
      emails: ["yarze@lb.gov"]
    },
    {
      name: "سجن القبة (طرابلس)",
      phones: ["+961 06 765432"],
      emails: ["qubba@lb.gov"]
    },
    {
      name: "سجن زحلة",
      phones: ["+961 08 987654"],
      emails: ["zahle@lb.gov"]
    }
  ];

  return (
    <div className="crime-container">
      <img src={avatarImg} alt="Officer photo" className="profile-avatar" />
      <h1 className="crime-title">Contact Information of Prisons in Lebanon</h1>
      <table className="crime-table">
        <thead>
          <tr>
            <th>Prison Name</th>
            <th>Phone Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {prisons.map((prison, index) => (
            <tr key={index}>
              <td>{prison.name}</td>
              <td>{prison.phones.join(", ")}</td>
              <td>{prison.emails.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Contact;