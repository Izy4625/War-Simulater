
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ResponsiveAppBar from './Heder.compo';
import { useSelector, UseSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { RootState } from '../../store/store';
import{ User}  from '../../types/index';


import { useSocket } from '../../hooks/useSocket';
import { AppDispatch } from '../../store/store';
import { joinRoom ,sendRocket} from '../../store/features/socket/socketSlice';

import missile from '../../../missile.json';


export default function AttackTable() {
  const [users, setUser] = useState<User | null>(null);
  const {socketInstance }= useSocket();
  socketInstance.on('defend', (data: string) => {
    console.log(data);
  })

  useEffect(() => {
    const newuser = localStorage.getItem('user');
    console.log(newuser);
    setUser(JSON.parse(newuser!));
  },[])

//   console.log(user);

  const missiles = missile.filter((missile) => users?.resources?.some((resource) => resource.name === missile.name));
  console.log(missiles);
  
  const dispatch = useDispatch<AppDispatch>();

//   const value = useSelector((state: RootState) => state.auth.user);
 
  

    return (
      <>
        <ResponsiveAppBar />
      
      
        <button onClick={()=>{ dispatch(sendRocket({  room: 'north', rocket: missiles[0].name,  }))}} >send Rocket</button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Launches</TableCell>
                <TableCell align="right">Rocket</TableCell>
                <TableCell align="right">Time TO hit</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {missiles.map((missile) => (
                <TableRow
                  key={missile.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {missile.name}
                  </TableCell>
                  <TableCell align="right">{missile.description}</TableCell>
                  <TableCell align="right">{missile.speed}</TableCell>
                  <TableCell align="right">{missile.intercepts}</TableCell>
                  <TableCell align="right">{missile.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }