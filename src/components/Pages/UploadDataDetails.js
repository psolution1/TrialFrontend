import axios from 'axios';
import React, { useEffect, useState }   from 'react'
import DataTable from 'react-data-table-component';
import { Link, useParams } from "react-router-dom";
  

function UploadDataDetails() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const DBuUrl = process.env.REACT_APP_DB_URL;
  const _id = useParams();
  const [uploaddata,setuploaddata]=useState([]);
  const getUploadedData = async () => {
    try {
      const responce = await axios.get(
        `${apiUrl}/ContactUplodeData/${_id?.id}`, {
        headers: {
          "Content-Type": "application/json",
          "mongodb-url": DBuUrl,
        },
      }
      );
     
      setuploaddata(responce?.data?.Document);
    } catch (error) {
      console.log(error);
     }
  };

  useEffect(()=>{
    getUploadedData();
  },[]);
  
const columns =[
    {
      name: 'Client Name',
      selector: row => row?.clientname,
      sortable:true
    },
    {
        name: 'Client Contact No.',
        selector: row => row?.clientMobile,
        sortable:true
      },
    {
      name: 'Uploaded Date',
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
                <h4>Upload Data </h4>
              </div>
              <form>
<div className="row">
  <div className="col-md-3 ">
    <label>Enter Message</label>
    <div className="form-group">
      <textarea
        type="text"
        placeholder="Enter Message"
        className="form-control"
        name="message"
        required=""
        defaultValue={""}
      />
    </div>
  </div>
  <div className="col-md-3">
    <label>Characters</label>
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        placeholder="Characters"
        name="message"
        defaultValue={0}
      />
    </div>
  </div>
  <div className="col-md-3 ">
    <div className="form-group">
      <label>No of SMS</label>
      <input
        type="text"
        className="form-control"
        placeholder="No of SMS"
        name="message"
        defaultValue={1}
      />
    </div>
  </div>
  <div className="col-md-3 " style={{ marginTop: 25 }}>
    <div className="form-group">
      <label />
      <button className="btn  btn-sm button-57">Send Instant SMS</button>
    </div>
  </div>
</div>
</form>
</div>
 <div className="panel-body bg-white ">
               <div className="">
               
                 <DataTable
                 responsive
                 customStyles={customStyles}
                  columns={columns}
                  data={uploaddata}
                  selectableRows
                  fixedHeader
                  pagination
                  // selectableRowsHighlight
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
export default UploadDataDetails;
