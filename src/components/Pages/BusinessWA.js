import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';


function BusinessWA() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const DBuUrl = process.env.REACT_APP_DB_URL;
  const [uploaddata, setuploaddata] = useState([]);

  const getUploadedData = async () => {
    try {
      const responce = await axios.get(
        `${apiUrl}/Businesswtspmessage`, {
        headers: {
          "Content-Type": "application/json",
          "mongodb-url": DBuUrl,
        },
      }
      );
      setuploaddata(responce?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUploadedData();
  }, []);

  const columns = [
    {
      name: 'Name',
      selector: row => row.fromname,
      sortable: true
    },
    {
      name: 'Phone',
      selector: row => (row.fromphone),
      sortable: true
    },
    {
        name: 'Message',
        selector: row => (row.message),
        sortable: true
      },
      
  ];
  const [file, setFile] = useState(null);
  const allowedFileTypes = ["text/csv"];
  const filesety = async (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      if (allowedFileTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
      } else {
        toast.error("Invalid file type");
      }
    }
  };

  const UplodeExcelFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(
        `${apiUrl}/ExcelUplodeContactdata`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      toast.success(data.message);
    } catch (error) {
      toast.warn(error.data.message);
    }
  }

  const handleDownload = () => {
    const fileUrl = 'ExcelUplodeData/sample.csv';
    const link = document.createElement('a');
     link.href = fileUrl;
     link.target = '_blank';
     link.download = 'sample.csv'; 
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
   };

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
                
              </div>

              <div className="panel-body bg-white ">
                <div className="">

                  <DataTable
                    responsive
                    customStyles={customStyles}
                    columns={columns}
                    data={uploaddata}
                    
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
export default BusinessWA;
