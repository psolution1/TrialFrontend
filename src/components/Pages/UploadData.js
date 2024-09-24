import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';


function UploadData() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const DBuUrl = process.env.REACT_APP_DB_URL;
  const [uploaddata, setuploaddata] = useState([]);

  const getUploadedData = async () => {
    try {
      const responce = await axios.get(
        `${apiUrl}/ContactUplode`, {
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

  useEffect(() => {
    getUploadedData();
  }, []);

  const columns = [
    {
      name: 'Document name',
      selector: row => row.document_name,
      cell: (row) => (
        <a href={`/UploadContent/${row?._id}`}>{row?.document_name}</a>
      ),
      sortable: true
    },
    {
      name: 'Uploaded Date',
      selector: row => (row.createdAt.split('T'))[0],
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
                <div className="btn-group bg-white ">
                  <h4>Upload Data </h4>
                </div>

                <form onSubmit={UplodeExcelFile} >
                  <div className="upload_filses panel ">
                    <div className="row">
                      <div className="col-lg-3 col-xl-3 col-md-3 col-sm-3">
                        <div className="form-group  ">
                          <div className=" ">
                            <input type="file" onChange={filesety} className="form-control-file  " required id="fileInput" />
                          </div></div>
                      </div>
                      <div className="col-lg-3 col-xl-3 col-md-3 col-sm-3">
                        <button type="submit" className="button-57 w-50 ad_infor  buttonns_057">
                          Upload
                        </button>
                      </div>

                      <div className="col-lg-3 col-xl-3 col-md-3 col-sm-3">
                        <button type="button" class="btn btn-danger button-57 d-none">Download Sample File</button>
                      </div>

                      <div className="col-lg-3 col-xl-3 col-md-3 col-sm-3">
                        <button type="button" onClick={handleDownload} class="btn btn-danger float-right button-57">Download Sample File</button>
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
export default UploadData;
