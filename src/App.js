import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Simulation from './simulation/Simulation';
import Home from './home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room" element={<Simulation />} />
      </Routes>
    </Router>
  );
}

export default App;
