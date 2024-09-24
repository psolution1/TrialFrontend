import React from "react";
import LineChart1 from "../LineChart1";
import Chart from "react-apexcharts";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductService } from "../../features/product_serviceSlice";
import { getAllAgent } from "../../features/agentSlice";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
export default function Productservicereport() {
  const apiUrl = process.env.REACT_APP_API_URL;  
  const DBuUrl = process.env.REACT_APP_DB_URL;      
  const [data, setdata] = useState([]);
  const [total, settotal] = useState([]);
  const { ProductService } = useSelector((state) => state.ProductService);
  var { agent } = useSelector((state) => state.agent);

  const dispatch = useDispatch();
 

  useEffect(() => {
    dispatch(getAllProductService());
 
    dispatch(getAllAgent());
  }, []);
  const [getLeadData, setLeadData] = useState([]);
  const [llll,setllll]=useState('block');
  const getEmployeeReport = async (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      "mongodb-url":DBuUrl,
    };
    try {
      const responce = await axios.post(
        `${apiUrl}/GetProductReportDateWise`,
        data,   
        { headers }
      );
      setLeadData(responce?.data?.leadSource);
      toast(responce?.data?.message);
      setllll('none')
    } catch (error) {
      const message=await error?.response?.data?.message;
      if(message=='Client must be connected before running operations'  || message=='Internal Server Error'){
        getEmployeeReport();
      }
      setLeadData();
      toast(error?.response?.data?.message);
    }
  };
  const columns = [
    {
      name: "Sr. No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Client Name",
      selector: (row) => row?.full_name,
      sortable: true,
    },
    {
      name: "Lead Price",
      selector: (row) => row?.followup_won_amount,
      sortable: true,
    },
  ];
  
  const [leadsource , setleadsource]=useState([]);
  const [leadsourcedata1 , setleadsourcedata]=useState([]);
  const getAllLeadSourceOverview=async ()=>{
    try {
      const responce = await axios.get(
        `${apiUrl}/LeadProductServiceOverviewApi`,{
         headers:{
          "Content-Type": "application/json",
          "mongodb-url":DBuUrl,
        },
        }
      );
      setleadsourcedata(responce?.data?.product_count);
      setleadsource(responce?.data?.product_name);
      
    } catch (error) {
      const message=await error?.response?.data?.message;
      if(message=='Client must be connected before running operations'  || message=='Internal Server Error'){
        getAllLeadSourceOverview();
      }
      console.log(error);
    }
  }
  useEffect(()=>{
      getAllLeadSourceOverview()
    },[]);
      
    const options = {
      labels: leadsource,
    };

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
      rows: {
        style: {
          borderRight: "none", // Remove vertical borders
        },
      },
    };
  

  return (
    <div>
    <div className="content-wrapper">
      <section className="content">
        <div className="container pl-0">
          <div className="row pl-0 pr-0">
            <div className="col-12 pl-0 pr-0">
          <div className="panel-body pt-2">
            <div className="panel panel-bd lobidrag lobipanel">
            <div className="panel-heading">
              <div className="btn-group bg-white ">
                <h4>Product Service Report</h4>
              </div>
              
            </div>
                <div className="pt-3">
                    <div className="bg-white">
                  <div className="col-sm-12 col-md-12 col-xs-12">
                    <div className="cards pt-2">
                      <div className="serach-lists" style={{ padding: 0 }}>
                        <form onSubmit={getEmployeeReport}>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group">
                                <select className="form-control" 
                                 onChange={(e) =>
                                  setdata({
                                    ...data,
                                    product_service_id: e.target.value,
                                  })
                                }
                                name="product_service_id" required>
                                  <option value="">Select product</option>

                                  {ProductService?.product_service?.map(
                                    (ProductService1) => {
                                      return (
                                        <option value={ProductService1?._id}>
                                          {
                                            ProductService1?.product_service_name
                                          }
                                        </option>
                                      );
                                    }
                                  )}
                                </select>
                              </div>
                            </div>
                           
                            <div className="col-md-3">
                              <div className="form-group">
                                <input
                                  name="start_date"
                                  onChange={(e) =>
                                    setdata({
                                      ...data,
                                      start_date: e.target.value,
                                    })
                                  }
                                  placeholder="Choose Date From"
                                  type="date"
                                  className="form-control"
                                  autoComplete="off"
                                  defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <input
                                  name="end_date"
                                  onChange={(e) =>
                                    setdata({
                                      ...data,
                                      end_date: e.target.value,
                                    })
                                  }
                                  placeholder="Choose Date To"
                                  type="date"
                                  className="form-control"
                                  autoComplete="off"
                                  defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="col-md-2 col-sm-12">
                              <div className="form-group">
                                <button
                                  type="submit"
                                  className="button-57 bg_colores "
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>   
                  <div className="row">
                  <div className="col-lg-6 mx-auto">
                        <Chart  options={options} series={leadsourcedata1} type="pie"  
                        style={{width:'500px',height:'500px', display:llll}} />  
                        </div>
                  </div>
                  <div className="card-headers">
                  <DataTable
                          className="custom-datatable"
                          responsive
                          id="table-to-export"
                          columns={columns}
                          data={getLeadData}
                          pagination
                          fixedHeader
                          fixedHeaderScrollHeight="550px"
                          selectableRowsHighlight
                          highlightOnHover
                          subHeader
                          customStyles={customStyles}
                        />
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
          </div></div>
        </section>
      </div>
    </div>
  );
}
