import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import Loader from "../Loader";
import axios from "axios";
import DataTable from "react-data-table-component";

import jsPDF from "jspdf";
export const AllCallLogForReport = ({props}) => {
   const DBuUrl = process.env.REACT_APP_DB_URL;
  const apiUrl = process.env.REACT_APP_API_URL;
   
    const   _id = useParams();
    const [leads, setleads] = useState([]);
    const [search, setsearch] = useState("");
    const [filterleads, setfilterleads] = useState([]);
    const getAllCallLog = async (id) => {
      try {
        const responce = await axios.get(
          `${apiUrl}/get_call_log_by_id/${id}`,{
            headers: {
              "Content-Type": "application/json",
              "mongodb-url":DBuUrl,
            },
          }
        );
       console.log(responce?.data);  
        setleads(responce?.data?.call_log); 
        setfilterleads(responce?.data?.call_log);
      } catch (error) {
        const message=await error?.response?.data?.message;
      if(message=='Client must be connected before running operations'){
        getAllCallLog(props);
      }
        console.log(error);
        setfilterleads();
      }
    };
  
 
    useEffect(() => {
       if(props){    
        getAllCallLog(props);     
       }
    }, [props]);
  
    useEffect(() => {
      const result = leads.filter((lead) => {    
        return (
          lead.name.toLowerCase().match(search.toLowerCase()) ||
          lead?.user_id
            .toLowerCase()
            .match(search.toLowerCase()) ||
          lead?.type
            .toLowerCase()
            .match(search.toLowerCase()) ||
          lead?.phone_number
            .toString().toLowerCase().includes(search.toLowerCase()) ||
          lead?.datetime
            .toLowerCase()
            .match(search.toLowerCase()) 
        );
      });
      setfilterleads(result);
    }, [search]);
  

    const converttime=(ffgfgf)=>{
      const second=ffgfgf;
      const hours = Math.floor(second / 3600);
         const minutes = Math.floor((second % 3600) / 60);
         const remainingSeconds = second % 60;
        const timeconverted= hours+'h '+minutes+'m '+remainingSeconds+'s';
        return timeconverted;
     }

    const columns = [
      {
        name: "Sr. No.",
        selector: (row,index) =>index+1,
        sortable: true,
      },
    //   {
    //     name: "Operated By",
    //     selector: (row) => row?.user_id,
    //     sortable: true,
    //   },
      {  
        name: "Client Name",
        selector: (row) => row?.name,
        sortable: true,
      },
      {
        name: "Mobile No.",
        selector: (row) => row?.phone_number,
        sortable: true,
      },
      {
        name: "Call Date Time",
        selector: (row) => row?.datetime,
        sortable: true,
       },
      {
        name: "Duration",
        selector: (row) => converttime(row?.duration),
        sortable: true,
       },
       {
        name: "Call Type",
        selector: (row) => row?.type!=="UNKNOWN"?row?.type:"REJECTED",
        // selector: (row) => row?.type,
        sortable: true,
        style: (row)=> ({
          color: row.type="UNKNOWN"?'red':row.type="INCOMING"?'green':row.type="OUTGOING"?'yellow':'red', 
        })  
       },  
      
    ];
  
    
    
  
   
  
    const customStyles = {
      cells: {
        style: {
          border: "1px solid #ddd", // Set the cell border
          fontSize: "14px",
        },
      },
      headCells: {
        style: {
          border: "1px solid #111", // Set the header cell border
          fontSize: "14px",
        },
      },
    };
  
    if (leads.length === 0) {
      //return <Loader />;
    }
  
       return(
        <div>
        {leads.length === 0 ? (
          <div className="table-responsive">
         <table id="example" className="table table-striped pt-3" style={{width: '100%'}}>
         <thead>
           <tr>
             <th>Sr. No.</th>
             <th>Operated By</th>
             <th>Client Name</th>
             <th>Mobile No.</th>
             <th>Call Date Time</th>
             <th>Duration</th> 
             <th>Call Type</th>
             <th>RawType</th>
           </tr> 
         </thead>
         <tbody>
           <tr>
          <p className="text-center">No Call Log Founds</p>
           </tr>
        
         </tbody>
       </table>
       </div>
        ) : (
          <>
          {/* <button className="btn btn-sm btn-info" onClick={exportToPDF}>Export PDF</button> */}
          <DataTable
          responsive 
          id="table-to-export"
          columns={columns}
          data={filterleads}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="550px"
          
          selectableRowsHighlight
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search here"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              className="form-control w-25 "
            />
          }
          customStyles={customStyles} 
        />
          </>
          
        )}
        
      
       
       
        
        
      </div>
       )
}
