import React , {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { licenceactive } from '../../features/licenceSlice';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
export default function Licenceform() {
   const navigate=useNavigate();
  const message=useSelector((state)=>state.app); 
  const formRef = React.useRef(null); 
   const dispatch=useDispatch();
   const [data,setData]=useState({});
  const saveData= async (e)=>{  
      e.preventDefault();   
     const formData = {...data,  states: formRef.current.states.value};
     const dddd={...formData, _id:message?.hostings[0]?._id}
      const licencee=await dispatch(licenceactive(dddd))   
     if(licencee.payload.success===true){
      toast.success("Activated Successfully!");
     // window.location.reload();
      setTimeout(()=>{ 
        window.location.reload(false);
    }, 500);
      //  navigate('/');   
  }else{  
   toast.warn(licencee?.payload); 
  }  
  
   }
  
  return (
    <div>
      <>
  {/* MultiStep Form */}
  <div className="container-fluid" id="grad1">
    <div className="row  ">
      <div className="col-12 col-sm-4 col-md-4 offset-4 col-lg-4 text-center p-0 mt-3 mb-2">
        <div className="card px-0 margintop  pb-0   mb-3">
          <h2>
            <strong>Set Database Account</strong>
          </h2>
          
              <form id="msform"  onSubmit={saveData} ref={formRef}>
              
                  <div className="form-card">
                    <h2 className="fs-title">Account Information</h2>
                    <div className="form-group">
                    <input type="text" name="username" className="form-control"
                    required
                    onChange={e => setData({...data, username: e.target.value})}
                    placeholder="database username" />
                    </div>
                     <div className="form-group">
                    <input type="password" className="form-control"
                    required
                    onChange={e => setData({...data, password: e.target.value})}
                    name="password" placeholder="Database Password" />
                   </div>
                   <div className="form-group">
                     <input type="hidden" className="form-control"
                    required
                    value={message.hostings[0]?._id}
                    onChange={e => setData({...data, _id: e.target.value})}
                    name="_id" placeholder="_id" />
                    </div>
                    <div className="form-group">
                    <input type="text" className="form-control"
                    required
                    onChange={e => setData({...data, database: e.target.value})}
                    name="name" placeholder="Database Name" />
                     </div>
                     <div className="form-group">
                    <input type="hidden" className="form-control"
                    required
                   value="active"
                    name="states"  /> 
                   
                    </div> 
                    
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">Activate </button>
                </div>
               
              </form>
            
        </div>
      </div>
    </div>
  </div>
</>

    </div>
  )
}
