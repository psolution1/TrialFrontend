import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AgentDetail } from '../../features/licenceSlice';
export default function Newloginpage() {

   const {id}=useParams();
const dispatch=useDispatch()
   const navigate = useNavigate();
  const Logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('agent_name');
    localStorage.removeItem('agent_email');
    localStorage.removeItem('agent_mobile');
    localStorage.removeItem('role');

    const aaaaa=await dispatch(AgentDetail(id));

    await navigate('/')
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  };
   
    useEffect(() => {

        Logout();

        
           
      }, [id]);

  return (
    <div>
      
    </div>
  )
}
