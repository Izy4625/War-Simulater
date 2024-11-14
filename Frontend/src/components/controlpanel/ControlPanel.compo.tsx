
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
const SERVER_URL = 'http://localhost:4000';
import { useSocket } from '../../hooks/useSocket';
import { AppDispatch } from '../../store/store';
import { joinRoom ,sendRocket} from '../../store/features/socket/socketSlice';




export default function BasicTable() {
  const [rockets, setRockets] = useState<>([]);

  const dispatch = useDispatch<AppDispatch>();

  const value = useSelector((state: RootState) => state.auth.user);
  const {socketInstance }= useSocket();
  socketInstance.emit('sendMessage', { message: 'hello' });
  socketInstance.on('roomData'  , (data: string) => {
    console.log(data);
  })
  socketInstance.on("someevent", (data: string) => {console.log(data);})  
  console.log(value);
  socketInstance.on("rocket", (data: {rocket:string,room:string}) => {

    console.log(data);})
  useEffect(() => {
    

  socketInstance.on('message', (data: string) => {
    console.log(data);
  });
 
},[]);


      
    

    return (
      <>
        <ResponsiveAppBar />
      
        <button onClick={()=>{ dispatch(joinRoom( 'north' ))}} >join Room</button>
        <button onClick={()=>{ dispatch(sendRocket({ name: 'sara', room: 'north', rocket: 'north' }))}} >send Rocket</button>
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
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }