import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Layout/Navbar';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Box, Container } from '@mui/material';
import Register from './components/Auth/Register'
import Login from "./components/Auth/Login"
import BasicTable from './components/controlpanel/ControlPanel.compo';
import AttackTable from './components/controlpanel/AttackPanel.Compo';
function App() {


  return (
    <Router>
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        {/* <Navbar /> */}
        <Container>
          <Routes>
            <Route 
              path="/login" 
              element={  <Login /> } 
            />
             <Route 
              path="/register" 
              element={<Register /> } 
            />
             <Route 
              path="/controlPanel" 
              element={<BasicTable /> } 
            />
            <Route 
              path="/attackPanel" 
              element={<AttackTable /> } 
            />
    </Routes>
        </Container>
      </Box>
    </Router>
  )
}

export default App
