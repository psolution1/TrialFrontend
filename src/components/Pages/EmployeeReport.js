import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAgent ,getAllAgent1,getAllAgentWithData} from "../../features/agentSlice";
import { useState } from "react";
import { getEmployeeReport } from "../../features/employeesreportSlice";
import { Doughnut } from "react-chartjs-2";
import { Chart, Tooltip, Title, ArcElement, Legend } from "chart.js";
import BarChart from "./BarGraph1";
import { AllCallLogForReport } from "./AllCallLogForReport";
import { Link } from "react-router-dom";
Chart.register(Tooltip, Title, ArcElement, Legend);
export default function EmployeeReport() {
  const [Employee_Report, setEmployeeReport] = useState([]);
  const { agent } = useSelector((state) => state.agent);
  const { EmployeeReport } = useSelector((state) => state.employeesreportSlice);
  const [isVisible, setIsVisible] = useState("none");

  const dispatch = useDispatch();
  useEffect(() => {
    
    if(localStorage.getItem("role")==='admin'){
      dispatch(getAllAgent());
     }
     if (localStorage.getItem("role") === "TeamLeader") {
      dispatch(getAllAgentWithData({assign_to_agent:localStorage.getItem("user_id")}));
    }
    if(localStorage.getItem("role")==='user'){
      dispatch(getAllAgent({assign_to_agent:localStorage.getItem("user_id")}));
     }

  


  }, []);

  const GetData = async (e) => {
    e.preventDefault();
    dispatch(getEmployeeReport(Employee_Report));
    setIsVisible("block");
  };

  const data = {
    labels: ["Incomming Call", "Outgoing Call", "Missed Call", "Rejected Call"],
    datasets: [
      {
        label: "Call Summary",
        data: [
          EmployeeReport[0]?.details[0]?.totalIncommingCall,
          EmployeeReport[0]?.details[0]?.totalOutgoingCall,
          EmployeeReport[0]?.details[0]?.totalMissCall,
          EmployeeReport[0]?.details[0]?.totalRejectedCall,
        ],
        backgroundColor: ["#10cb40", "#fc9605", "#fc0505", "#eb7575"],
        hoverOffset: 4,
      },
    ],
  };
 const second=EmployeeReport[0]?.details[0]?.Longest_talk?.duration;
 const hours = Math.floor(second / 3600);
    const minutes = Math.floor((second % 3600) / 60);
    const remainingSeconds = second % 60;
   const timeconverted= hours+'h '+minutes+'m '+remainingSeconds+'s'
  return (
    <div>
      <div className="content-wrapper">
        {/* Main content */}
        <section className="content pt-4">
          <div className="container">
            <div className="custom-card">
            <div className="panel-heading">
              <div className="btn-groupes">
                <h4>Employee Reports </h4>
              </div>
                 </div>
              
              <div className="custom-card-body p-0">
                <div className="date-filter-block">
                  <form onSubmit={GetData}>
                    <div className="row">
                      <div className="col-12 col-xl-2 col-lg-2 col-md-2">
                        <div className="select_empl">
                          <div className="form-group">
                            <lable className="label" for="name">
                              Select Employee{" "}
                            </lable>
                            <select
                              className="form-control"
                              name="user_id"
                              onChange={(e) =>
                                setEmployeeReport({
                                  ...Employee_Report,
                                  user_id: e.target.value,
                                })
                              }
                              required
                            >
                              <option value="">Select </option>
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
                      </div>
                      <div className="col-12 col-xl-2 col-lg-2 col-md-2">
                        <div className="select_empl">
                          <div className="form-group">
                            <lable className="label" for="name">
                              From Date
                            </lable>
                            <input
                              type="date"
                              name="start_date"
                              onChange={(e) =>
                                setEmployeeReport({
                                  ...Employee_Report,
                                  start_date: e.target.value,
                                })
                              }
                              placeholder=""
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-xl-2 col-lg-2 col-md-2">
                        <div className="select_empl">
                          <div className="form-group">
                            <lable className="label" for="name">
                              To Date
                            </lable>
                            <input
                              type="date"
                              name="end_date"
                              onChange={(e) =>
                                setEmployeeReport({
                                  ...Employee_Report,
                                  end_date: e.target.value,
                                })
                              }
                              placeholder="DD/MM/YYYY"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-xl-3 col-lg-3 col-md-3">
                        <div className="select_empl pt-4">
                          <div className="form-group">
                            <div className="button-block">
                              <button
                                type="submit"
                                className="btn btn-theme"
                                disabled=""
                              >
                                Apply
                              </button>
                              {/* <button className="btn btn-outline-theme float-right dt-disable" disabled="">Reset</button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                  </form>
                  {/* <div className="custom-control   custom-checkbox exclude-no">
                      <input
                        type="checkbox"
                        defaultValue="option1"
                        defaultChecked="checke"
                        name="example1"
                        className="custom-control-input"
                      />
                      <label htmlFor="excludeNos" className="custom-control-label" />
                      Exclude Numbers Mentioned in{" "}
                      <a href=" " target="_blank" className="text-theme">
                        Exclude Phone Numbers{" "}
                      </a>
                 </div> */}
                </div>
                <div className="border_bottom mb-4"></div>
                <div className="row">
                  <div className="col-12">
                    <ul className="nav nav-tabs borders_bottom mobiltabs bottom-border">
                      <li className=" ">
                        <a
                          href="#tab1"
                          className="active"
                          data-toggle="tab"
                          aria-expanded="true"
                        >
                          <span className="tabnone"> Summary </span>{" "}
                          <i className="fa fa-history" aria-hidden="true" />
                        </a>
                      </li>
                      <li className="">
                        <a href="#tab3" data-toggle="tab" aria-expanded="false">
                          <span className="tabnone"> Analysis </span>
                          <i className="fa fa-info-circle" aria-hidden="true" />
                        </a>
                      </li>

                      <li className="">
                        <a href="#tab4" data-toggle="tab" aria-expanded="false">
                          <span className="tabnone"> Call Details </span>
                          <i className="fa fa-info" aria-hidden="true" />
                        </a>
                      </li>
                    </ul>
                    <div className="cards-tab ">
                      <div className="tab-content">
                        {/*-------------------------------------------tab1-----------------------------*/}
                        <div
                          className="tab-pane fade in active show "
                          //  style={{display:isVisible  }}
                          id="tab1"
                        >
                          <div className="row Employreport ng-star-inserted card-body ng-star-inserted">
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 ng-star-inserted">
                              <div className="row pad_10">
                                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8">
                                  <table className="table table-bordered pt-4 summary-table">
                                    <tbody>
                                      <tr className="summary-bold">
                                        <td>Call Type </td>
                                        <td>Calls </td>
                                        <td>Duration </td>
                                      </tr>
                                      <tr>
                                        <td className="incomig-text">
                                          <i className="las la-undo incomig-icon" />
                                          Incoming
                                        </td>
                                        <td>
                                          <Link
                                            to={`/call_log_details/${Employee_Report?.user_id}`}
                                          >
                                            {
                                              EmployeeReport[0]?.details[0]
                                                ?.totalIncommingCall
                                            }
                                          </Link>
                                        </td>
                                        <td>
                                          {
                                            EmployeeReport[0]?.details[0]
                                              ?.totalIncommingDuration
                                          }
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="outgoing-text">
                                          <i
                                            _ngcontent-vim-c104=""
                                            className="las la-undo outgoing-icon"
                                          />
                                          Outgoing
                                        </td>
                                        <td>
                                          <Link
                                            to={`/call_log_details/${Employee_Report?.user_id}`}
                                          >
                                            {
                                              EmployeeReport[0]?.details[0]
                                                ?.totalOutgoingCall
                                            }
                                          </Link>
                                        </td>
                                        <td>
                                          {
                                            EmployeeReport[0]?.details[0]
                                              ?.totalOutgoingDuration
                                          }
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="missed-text">
                                          <i className="las la-undo missed-icon" />
                                          Missed
                                        </td>
                                        <td>
                                          {
                                            EmployeeReport[0]?.details[0]
                                              ?.totalMissCall
                                          }
                                        </td>
                                        <td>-</td>
                                      </tr>
                                      <tr _ngcontent-vim-c104="">
                                        <td className="rejected-text">
                                          <i className="las la-ban" /> Rejected{" "}
                                        </td>
                                        <td>
                                          {
                                             
                                           EmployeeReport[0]?.details[0]
                                              ?.totalCall-EmployeeReport[0]?.details[0]
                                                ?.totalIncommingCall-EmployeeReport[0]?.details[0]
                                                  ?.totalOutgoingCall-EmployeeReport[0]?.details[0]
                                                    ?.totalMissCall
                                          //  EmployeeReport[0]?.details[0]
                                          //     ?.totalRejectedCall
                                          }
                                        </td>
                                        <td>-</td>
                                      </tr>
                                      <tr className="summary-bold">
                                        <td>Total </td>
                                        <td>
                                          {
                                            EmployeeReport[0]?.details[0]
                                              ?.totalCall
                                          }
                                        </td>
                                        <td>
                                          {
                                            EmployeeReport[0]?.details[0]
                                              ?.totalDuration
                                          }
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                                  <div className="s_atend">
                                    <div className="dash_inn">
                                      <span>
                                        <i className="las la-phone-slash never-attended-text never-attended-icon" />{" "}
                                        Miss Call
                                      </span>
                                      <strong>
                                             {/* {
                                                  (EmployeeReport[0]?.details[0]
                                                  ?.totalCall-EmployeeReport[0]?.details[0]
                                                    ?.totalIncommingCall-EmployeeReport[0]?.details[0]
                                                      ?.totalOutgoingCall-EmployeeReport[0]?.details[0]
                                                        ?.totalMissCall)?(EmployeeReport[0]?.details[0]
                                                          ?.totalCall-EmployeeReport[0]?.details[0]
                                                            ?.totalIncommingCall-EmployeeReport[0]?.details[0]
                                                              ?.totalOutgoingCall-EmployeeReport[0]?.details[0]
                                                                ?.totalMissCall):'0'
                                                } */}
                                                {
                                            EmployeeReport[0]?.details[0]
                                              ?.totalMissCall
                                          }
                                      </strong>
                                    </div>
                                    <div className="dash_inn">
                                      <span>
                                        <i className="las la-phone-slash never-attended-text" />{" "}
                                        Not Connected Call
                                      </span>
                                      <strong>
                                        {EmployeeReport[0]?.details[0]
                                            ?.NotConnectedCall?EmployeeReport[0]?.details[0]
                                            ?.NotConnectedCall:'0'}
                                      </strong>
                                    </div>
                                    <div className="dash_inn">
                                      <span>
                                        <i className="las la-phone-alt" />{" "}
                                        Connected Calls{" "}
                                      </span>
                                      <strong>
                                        {(EmployeeReport[0]?.details[0]
                                          ?.totalCall -
                                          EmployeeReport[0]?.details[0]
                                            ?.NotConnectedCall)?(EmployeeReport[0]?.details[0]
                                              ?.totalCall -
                                              EmployeeReport[0]?.details[0]
                                                ?.NotConnectedCall):'0'}
                                      </strong>
                                    </div>
                                    <div className="dash_inn">
                                      <span>
                                        <i className="las la-user-tie" /> Rejected
                                      </span>
                                      <strong>{
                                             
                                             EmployeeReport[0]?.details[0]
                                                ?.totalCall-EmployeeReport[0]?.details[0]
                                                  ?.totalIncommingCall-EmployeeReport[0]?.details[0]
                                                    ?.totalOutgoingCall-EmployeeReport[0]?.details[0]
                                                      ?.totalMissCall
                                            //  EmployeeReport[0]?.details[0]
                                            //     ?.totalRejectedCall
                                            }</strong>
                                    </div>
                                    <div className="dash_inn">
                                      <span>
                                        <i className="las la-hourglass" />{" "}
                                        Working Hours
                                      </span>
                                      <strong>
                                        {
                                          (EmployeeReport[0]?.details[0]
                                            ?.totalworkinghoure)?(EmployeeReport[0]?.details[0]
                                              ?.totalworkinghoure):'0'
                                        }
                                      </strong>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/**/}
                            <div
                              className="col-xl-6 col-lg-12 col-md-12 col-sm-12"
                              style={{ height: "400px" }}
                            >
                              <Doughnut data={data} />
                              {/* <img src="dist/img/chart.png" /> */}
                            </div>
                            {/**/}
                          </div>
                        </div>
                        {/*-------------------------------------------tab2-----------------------------*/}
                        <div className="tab-pane fade" id="tab3">
                          <div className="card-body chartbars ng-star-inserted">
                            {/* <div className="row">
                              <div className="col-md-6">
                                <div
                                  className="border-box"
                                  style={{ width: "100%", height: "400px" }}
                                >
                                  <BarChart
                                    lo={[
                                      EmployeeReport[0]?.details[0]
                                        ?.totalIncommingCall,
                                      EmployeeReport[0]?.details[0]
                                        ?.totalOutgoingCall,
                                      EmployeeReport[0]?.details[0]
                                        ?.totalMissCall,
                                      EmployeeReport[0]?.details[0]
                                        ?.totalRejectedCall,
                                    ]}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div
                                  className="border-box"
                                  style={{ width: "100%", height: "400px" }}
                                >
                                  <BarChart
                                    lo={[
                                      EmployeeReport[0]?.details[0]
                                        ?.totalIncommingCall,
                                      EmployeeReport[0]?.details[0]
                                        ?.totalOutgoingCall,
                                      EmployeeReport[0]?.details[0]
                                        ?.totalMissCall,
                                      EmployeeReport[0]?.details[0]
                                        ?.totalRejectedCall,
                                    ]}
                                  />
                                 </div>
                              </div>
                            </div> */}
                            <div className="pt-4 ng-star-inserted">
                              <div className="row">
                                <div className="col-md-4 analysis-box ">
                                  <div className="gray-box">
                                    <div className="media">
                                      <img
                                        src="dist/img/phone-call.png"
                                        className="align-self-center mr-2"
                                      />
                                      <div className="media-body align-self-center">
                                        <h4 className="mb-0">
                                          Mobile Call Analysis{" "}
                                        </h4>
                                      </div>
                                    </div>
                                    <div className="white-box d-none">
                                      <h2>Top Dialer</h2>
                                      <p className="ng-star-inserted">
                                        Umesh Yadav (+91-9936508089)
                                      </p>

                                      <h3 className="ng-star-inserted">
                                        <strong>Dialed Calls :</strong> 395{" "}
                                      </h3>
                                    </div>
                                    <div className="white-box d-none">
                                      <h2>Top Answered</h2>
                                      <p className="ng-star-inserted">
                                        Umesh Yadav (+91-9936508089)
                                      </p>

                                      <h3 className="ng-star-inserted">
                                        <strong _ngcontent-vim-c104="">
                                          Received Calls :
                                        </strong>{" "}
                                        249{" "}
                                      </h3>
                                    </div>
                                    <div className="white-box">
                                      <h2>Top Caller</h2>
                                      <p className="ng-star-inserted">
                                        {
                                          EmployeeReport[0]?.details[0]
                                            ?.mostFrequentDialerName
                                        }
                                        (
                                        {
                                          EmployeeReport[0]?.details[0]
                                            ?.mostFrequentDialer
                                        }
                                        )
                                      </p>
                                      {/**/}
                                      <h3 className="ng-star-inserted">
                                        <strong>Total Calls :</strong>{" "}
                                        {
                                          EmployeeReport[0]?.details[0]
                                            ?.maxCountDial
                                        }{" "}
                                        (Incoming + Outgoing ){" "}
                                      </h3>
                                      {/**/}
                                    </div>
                                    <p className="clock">
                                      Highest total number of outgoing (dialed),
                                      incoming (answered) or both (caller) among
                                      all registered mobile numbers.
                                    </p>
                                  </div>
                                </div>
                                <div className="col-md-4 analysis-box">
                                  <div className="gray-box">
                                    <div className="media">
                                      <img
                                        _ngcontent-vim-c104=""
                                        src="dist/img/total-call.png"
                                        className="align-self-center mr-2"
                                      />
                                      <div className="media-body align-self-center">
                                        <h4 className="mb-0">
                                          Total Call Duration Analysis{" "}
                                        </h4>
                                      </div>
                                    </div>
                                    {/* <div className="white-box">
                                      <h2>Highest Total Duration </h2>
                                      <p className="ng-star-inserted">
                                        {
                                          EmployeeReport[0]?.details[0]
                                            ?.Longest_talk?.name
                                        }{" "}
                                        (+
                                        {
                                          EmployeeReport[0]?.details[0]
                                            ?.Longest_talk?.phone_number
                                        }
                                        )
                                      </p>
                                      <h3 className="ng-star-inserted">
                                        <strong>Duration :</strong>{" "}
                                        {
                                          timeconverted
                                          }
                                        s
                                      </h3>
                                     </div> */}
                                    <div className="white-box">
                                      <h2>Longest Duration </h2>
                                      {/* <p className="ng-star-inserted">Umesh Yadav (+91-9936508089)</p> */}
                                      {/**/}
                                      <h3 className="ng-star-inserted">
                                        <strong>Duration :</strong>
                                        <span className="ng-star-inserted">
                                          {

                                          timeconverted

                                            // EmployeeReport[0]?.details[0]
                                            //   ?.Longest_talk?.duration
                                          }
                                          
                                        </span>
                                        {/**/}
                                      </h3>
                                      {/**/}
                                      <h3 className="ng-star-inserted">
                                        <strong>Call To :</strong>
                                        {
                                          EmployeeReport[0]?.details[0]
                                            ?.Longest_talk?.name
                                        }{" "}
                                        (
                                        {
                                          EmployeeReport[0]?.details[0]
                                            ?.Longest_talk?.phone_number
                                        }
                                        ){" "}
                                      </h3>
                                      {/**/}
                                      <h3 className="ng-star-inserted">
                                        <strong>Call Time :</strong>
                                        {
                                          EmployeeReport[0]?.details[0]
                                            ?.Longest_talk?.datetime
                                        }
                                      </h3>
                                      {/**/}
                                    </div>
                                    <p className="clock">
                                      Highest total call duration (incoming and
                                      outgoing) among all registered mobile
                                      numbers and longest call duration
                                      (incoming or outgoing) from one mobile
                                      number among all.
                                    </p>
                                  </div>
                                </div>
                                <div className="col-md-4 analysis-box">
                                  <div className="gray-box">
                                    <div className="media">
                                      <img
                                        src="dist/img/average-call.png"
                                        className="align-self-center mr-2"
                                      />
                                      <div className="media-body align-self-center">
                                        <h4 className="mb-0">
                                          Average Call Duration Analysis{" "}
                                        </h4>
                                      </div>
                                    </div>
                                    <div className="white-box">
                                      <h2>Average Duration per Call </h2>
                                      <p>
                                        {
                                          EmployeeReport[0]?.details[0]
                                            ?.avrage_duration_per_call
                                        }
                                        (Total Calls :{" "}
                                        {
                                          EmployeeReport[0]?.details[0]
                                            ?.totalCall
                                        }
                                        )
                                      </p>
                                      <h3 _ngcontent-vim-c104="">&nbsp;</h3>
                                    </div>
                                    <div className="white-box">
                                      <h2>Average Duration per Day</h2>
                                      <p>
                                        {
                                          EmployeeReport[0]?.details[0]
                                            ?.avrage_duration_per_day
                                        }{" "}
                                        (Total Days :{" "}
                                        {
                                          EmployeeReport[0]?.details[0]
                                            ?.TotalDays
                                        }
                                        )
                                      </p>
                                      <h3>&nbsp;</h3>
                                    </div>
                                    <p className="clock">
                                      Average call duration (incoming and
                                      outgoing) among all registered mobile
                                      numbers, (i) per Call (ii) per Day
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/*-------------------------------------------tab3-----------------------------*/}
                        <div className="tab-pane fade" id="tab4">
                          <div className="card-body tabless_padding ng-star-inserted">
                            <div className="row">
                              <div className="col-md-12">
                                <AllCallLogForReport props={Employee_Report?.user_id}/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
