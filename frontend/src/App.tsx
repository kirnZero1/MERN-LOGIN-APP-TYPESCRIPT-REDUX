import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Home from './pages/Home'
import View from './pages/View';
import Create from './pages/Create';
import Update from './pages/Update';
function App() {
  return (
    <Router >
          <Routes>  
                <Route path='/' element={<Home />} />
                <Route path='/create' element={<Create />} />
                <Route path='/view/:id' element={<View />} />
                <Route path='/update/:id' element={<Update />} />
                <Route path='*' element={<div className='w-100 vh-100 d-flex align-items-center justify-content-center'> back to home page<Link to='/' className='btn btn-sm btn-danger px-5 ms-2'>HomePage</Link></div>} />
          </Routes>
    </Router>
  );
}

export default App;
