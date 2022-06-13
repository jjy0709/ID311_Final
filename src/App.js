import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Floorplan from './floorplan/Floorplan';
import Simulation from './simulation/Simulation';
import Home from './home/Home';
import Select from './select/Select';
import Select_2 from './select_2/Select_2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<Select />} />
        <Route path="/room" element={<Simulation />} />
        <Route path="/select_2" element={<Select_2 />}/>
        <Route path="/floorplan" element={<Floorplan/>}/>
      </Routes>
    </Router>
  );
}

export default App;
