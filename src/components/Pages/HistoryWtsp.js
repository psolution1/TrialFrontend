import axios from 'axios';
import React, { useEffect, useState }   from 'react'
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";


function HistoryWtsp() {
  const apiUrl = process.env.REACT_APP_API_URL;

      const [data,setdata]=useState([]);
      const getSmsReport=async()=>{
        try {
          const responce = await axios.get(
            `${apiUrl}/getAllSmsReport`,
          );
          setdata(responce.data.smsreport);
        } catch (error) {
          console.log(error);
        }
      }
    
      useEffect(()=>{
              getSmsReport();
      },[])


const columns =[
    {
      name: 'Message',
      selector: row => row.message,
      sortable:true
    },
    {
      name: 'No Of Person',
      selector: row => row.noofperson,
      sortable:true
    },
    {
      name: 'Date & Time',
      selector: row => (row.createdAt.split('T'))[0],
      sortable:true
    },
   
    
   ];
   
   
    const customStyles = {
      cells: {
        style: {
          border: "0px solid #ddd", // Set the cell border
          fontSize: "14px",
          // background: "#f4f3fe",
        },
      },
      headCells: {
        style: {
          border: "0px solid #111", // Set the header cell border
          fontSize: "14px",
          background: "#f0f0f0",
        },
      },
      rows: {
        style: {
          background: "#fdf1f1", // Set the default background color
        },
      },
      highlightOnHover: {
        style: {
          background: "#f4f3fe", // Set the background color on hover
        },
      },
      striped: {
        style: {
          background: "#f8f9fa", // Set the background color for striped rows
        },
      },
    };
  return (
    <div>
      <div className="content-wrapper">
        <section className="content content-header  py-5">
          <div className="container">
            <div className="panel panel-bd lobidrag lobipanel">
              <div className="panel-heading">
                <div className="btn-group bg-white ">
                  <h4>SMS Report </h4>
                </div>

               
              </div>

              <div className="panel-body bg-white ">
                 <div className="">
                 
                   <DataTable
                   responsive
                   customStyles={customStyles}
                    columns={columns}
                    data={data}
                    // selectableRows
                    fixedHeader
                    pagination
                    selectableRowsHighlight
                    highlightOnHover
                    
                   >
                   
                   </DataTable>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
export default HistoryWtsp;
