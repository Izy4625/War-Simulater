import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
      
        <Container>
          <Routes>
            <Route 
              path="/" 
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
