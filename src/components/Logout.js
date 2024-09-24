import React ,{ useEffect }from 'react'
import { useNavigate } from 'react-router-dom';
export default function Logout() {

    

       const Logout = (e) => {
        // e.preventDefault();
        //const navigate = useNavigate();
         
        localStorage.removeItem('token');
      
     // navigate('/')
    };
    
  return (
    <div>
        <button onClick={Logout}>Logout</button>
    </div>
  )
}
