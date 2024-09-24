// Modal.js
import React from 'react';
import { Link } from 'react-router-dom';

const Modal = ({ show, onClose, events }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" style={{position:"absolute",bottom:0,left:0,width:"100%",zIndex:'9999999'}} >
      <div className="modal-content" style={{height: '200px',
    overflow: 'scroll',
    padding: '16px',position:"relative"}}>
      <a onClick={onClose}  style={{position:"absolute",top:0,right:0, border:'2px solid #f00',borderRadius:'50px',
   width:'30px',height:'30px',lineHeight:"20px" ,fontSize:'14px',textAlign:'center'

      }}><i class="nav-icon fas fa fa fa-close"></i></a>
        <h2>Event Details</h2>
        {events.map((event, index) => (
          <div key={index}>
            <div>{event?.title}</div>
            <div>{event?.start && new Date(event.start).toLocaleString()}</div>
            <div>
              Client: <Link to={`/followupleads/${event.original._id}`}>{event.original.full_name}</Link>
            </div>
            <div>
              Agent: <Link to={`/followupleads/${event.original._id}`}>{event.original?.agent_details[0]?.agent_name}</Link>
            </div>
            <hr />
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default Modal;
