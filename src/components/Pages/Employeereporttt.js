import React from "react";
import LineChart1 from "../LineChart1";
import Chart from "react-apexcharts";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductService } from "../../features/product_serviceSlice";
import { getAllAgent } from "../../features/agentSlice";

export default function Employeereporttt() {
  const apiUrl = process.env.REACT_APP_API_URL;    
  const [data, setdata] = useState([]);
  const [total, settotal] = useState([]);
  const { ProductService } = useSelector((state) => state.ProductService);
  var { agent } = useSelector((state) => state.agent);

  const dispatch = useDispatch();
  const getAllLeadSourceOverview = async () => {
    try {
      const responce = await axios.get(
        `${apiUrl}/Income_Graph_Overview`
      );
      setdata(responce?.data?.monthlyIncom);
      let totalamount = 0;
      data.map((ddddd) => {
        totalamount += parseInt(ddddd);
        settotal(totalamount);
      });

      console.log(responce?.data?.monthlyIncom);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getAllProductService());
    getAllLeadSourceOverview();
    dispatch(getAllAgent());
  }, []);

  const getEmployeeReport = async () => {
    //e.preventDefault();
  };

  return (
    <div>
      <div className="content-wrapper">
        <section className="content">
        <div className="container pl-0">
            <div className="row pl-0 pr-0">
              <div className="col-12 pl-0 pr-0">
            <div className="panel-body pt-2">
              <div className="panel-headinges panel panel-bd lobidrag lobipanel">
              <div className="custom-card-header  bg-white">
                <h4>Income Report</h4>
              </div>
               
                <div className="pt-3">
                    <div className="bg-white">
                  <div className="col-sm-12 col-md-12 col-xs-12">
                    <div className="cards pt-3">
                      <div className="serach-lists" style={{ padding: 0 }}>
                        <form onSubmit={getEmployeeReport()}>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group">
                                <select className="form-control" name="product">
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
                            <div className="col-md-4">
                              <div className="form-group">
                                <select
                                  className="form-control"
                                  name="employee"
                                >
                                  <option value="">Select Employee</option>

                                  {agent?.agent?.map((agents, key) => {
                                    return (
                                      <option value={agents._id}>
                                        {agents.agent_name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <input
                                  name="start_date"
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
                                  className="btn btn-success form-control"
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
                    <div className="col-12">
                      <LineChart1 />
                    </div>
                  </div>
                  <div className="card-headers">
                    <div className="table-responsive mob-bord">
                      <table
                        className="table table-bordered table-hover"
                        id="irtable"
                      >
                        <thead>
                          <tr>
                            <th>Month</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Jan</td>
                            <td>Rs. {data["0"]}</td>
                          </tr>
                          <tr>
                            <td>Feb</td>
                            <td>Rs. {data["1"]}</td>
                          </tr>
                          <tr>
                            <td>Mar</td>
                            <td>Rs. {data["2"]}</td>
                          </tr>
                          <tr>
                            <td>Apr</td>
                            <td>Rs. {data["3"]}</td>
                          </tr>
                          <tr>
                            <td>May</td>
                            <td>Rs. {data["4"]}</td>
                          </tr>
                          <tr>
                            <td>Jun</td>
                            <td>Rs. {data["5"]}</td>
                          </tr>
                          <tr>
                            <td>Jul</td>
                            <td>Rs. {data["6"]}</td>
                          </tr>
                          <tr>
                            <td>Aug</td>
                            <td>Rs. {data["7"]}</td>
                          </tr>
                          <tr>
                            <td>Sept</td>
                            <td>Rs. {data["8"]}</td>
                          </tr>
                          <tr>
                            <td>Oct</td>
                            <td>Rs. {data["9"]}</td>
                          </tr>
                          <tr>
                            <td>Nov</td>
                            <td>Rs. {data["10"]}</td>
                          </tr>
                          <tr>
                            <td>Dec</td>
                            <td>Rs. {data["11"]}</td>
                          </tr>
                          <tr style={{ background: "#000", color: "#fff" }}>
                            <td>Total</td>
                            <td>Rs. {total}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div></div></div></div>  
        </section>
      </div>
    </div>
  );
}
