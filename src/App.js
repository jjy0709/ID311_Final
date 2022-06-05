import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Floorplan from './floorplan/Floorplan';
import Simulation from './simulation/Simulation';
import Home from './home/Home';
import Select from './select/Select';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<Select />} />
        <Route path="/room" element={<Simulation />} />
      </Routes>
    </Router>
  );
}

export default App;
