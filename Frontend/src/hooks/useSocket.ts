
const SERVER_URL = 'http://localhost:4000';
export function useSocket() {
   


  
      const socketInstance = io(SERVER_URL);
  
    
    console.log('connected to the server')
    
     

   
  
    return { socketInstance };
  }