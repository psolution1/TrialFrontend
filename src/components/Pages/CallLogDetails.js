import React , { Fragment,useState ,useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAgent } from "../../features/agentSlice";
import { Link } from "react-router-dom";
import { AllCallLogtable } from "./AllCallLogtable";
export default function CallLogDetails() {

    var {message, agent,loading}=useSelector((state)=>state.agent);
    const dispatch=useDispatch();
    
    useEffect(()=>{
       //  dispatch(getAllAgent())
   },[])  ;
  return (
    <div>
    <div className="content-wrapper">
      {/* Main content */}
      <section className="content py-2">
        <div className="container">
        
     
        <div className="panel panel-bd lobidrag lobipanel">
          <div className="panel-heading">
            <div className="btn-group">
              <p>Manage Employees </p>
            </div>
               </div>
<div classname="panel-body">
<div className="panel-bodyes">
   <div className="cards-body">
       <div className="">
          

     <AllCallLogtable/>

           
     
      </div>
    </div>
 </div>
</div>

</div>
         
  </div>
         
    </section>  
    </div>
   
  </div>
  )
}
