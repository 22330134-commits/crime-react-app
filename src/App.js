import './App.css';
import CrimeReport from './components/crimeReport';
import Contact from './pages/contact';
import Reports from './components/reports';
import Profile from './pages/profile';
import Messages from './pages/messages';
import Login from './pages/Login'; // Import the new Login component
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // We call the URL of our Express server
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((data) => setMessage(data))
      .catch((err) => console.log(err));
  }, []);


  
  return (
    <Router>
      <div className="App">
        <header className="main-header">
          <nav className="nav-bar">
          <Link to="/login" className="nav-link">Login</Link>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/reports" className="nav-link">Reports</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/messages" className="nav-link">Messages</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
           {/* Add a link to the Login page */}
          </nav>
        </header>
        <main style={{ paddingTop: '300px' }}>
          <Routes>
          <Route path="/login" element={<Login />} />
            <Route path="/" element={<CrimeReport />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
            {/* Add the route for the Login page */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
