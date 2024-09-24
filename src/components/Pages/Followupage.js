import { Link, useNavigate, useParams } from "react-router-dom";
import React, { Fragment, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { getAllLead, getLeadById } from "../../features/leadSlice";
import { getAllAgent, getAllAgentWithData } from "../../features/agentSlice";
import { getAllStatus } from "../../features/statusSlice";
import { getAllCountry } from "../../features/country_stateSlice";
import { getStatebycountry } from "../../features/getStateByCountrySlice";
import { addfollowup, getAllFollowup } from "../../features/followupSlice";
import { getAllProductService } from "../../features/product_serviceSlice";
import { getAllLeadSource } from "../../features/leadSource";
import Loader from "../Loader";
import { toast } from "react-toastify";
import { getAllLostReason } from "../../features/lostreasonSlice";
import axios from "axios";
export default function Followupage() {
  const [dataa, setData] = useState({
    followup_date: new Date(), // Initialize with the current date
  });


  const apiUrl = process.env.REACT_APP_API_URL;
  const DBuUrl = process.env.REACT_APP_DB_URL;
  const navigate = useNavigate();
  const { agent } = useSelector((state) => state.agent);
  const { CountryState } = useSelector((state) => state.Country_State);
  const { StateByCountry } = useSelector((state) => state.getStateByCountry);
  const { ProductService } = useSelector((state) => state.ProductService);
  const { leadSourcedata } = useSelector((state) => state.leadSource);

  const { followup } = useSelector((state) => state.followup);
  const followupDesc = followup?.followuplead?.[0]?.followup_desc || '';
  const { lostreason } = useSelector(
    (state) => state.lostreasonSlice?.LostReasondata
  );

  const [localDetails, setLocalDetails] = useState({});
  const _id = useParams();
  const { lead, loading } = useSelector((state) => state.lead);
  const foundObject = lead?.lead?.find((obj) => obj._id === _id.id);
  const AllDetails = useSelector((state) => state.lead?.lead1?.leads?.["0"]);
  const [data, setdata] = useState({
    followup_desc: localDetails?.massage_of_calander,
  });
  useEffect(() => {
    setLocalDetails(AllDetails || {});
  }, [AllDetails]);
  // const getalltransactional = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3000/api/v1/getallsmsrecord', {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "mongodb-url": DBuUrl,
  //       },
  //     });
  //     setsmsdata(response?.data?.transactional['0']);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  useEffect(() => {
    dispatch(getAllStatus());
    dispatch(getAllLead());
    // dispatch(getAllAgent());
    dispatch(getAllCountry());
    dispatch(getAllLostReason());
    dispatch(getAllProductService());
    dispatch(getAllLeadSource());
    getStateByCountry(localDetails.country);
    console.log(localDetails.country)

    if (localStorage.getItem("role") === "admin") {
      dispatch(getAllAgent());
    }
    if (localStorage.getItem("role") === "TeamLeader") {
      dispatch(
        getAllAgentWithData({
          assign_to_agent: localStorage.getItem("user_id"),
        })
      );
    }
    if (localStorage.getItem("role") === "user") {
      dispatch(
        getAllAgent({ assign_to_agent: localStorage.getItem("user_id") })
      );
    }

    if (_id.id) {
      dispatch(getAllFollowup(_id.id));
      dispatch(getLeadById(_id.id));
    }
  }, [_id.id]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localDetails.country) {
      getStateByCountry(localDetails.country);
    }
  }, [localDetails.country]);

  const handleInputChange = (e) => {
    setLocalDetails({
      ...localDetails,
      country: e.target.value,
    });
    getStateByCountry(e.target.value);
  };

  const getStateByCountry = (data) => {
    console.log('sdfds', data)
    dispatch(getStatebycountry(data));
  };

  const UpdateAddDetails = async (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const responce = await axios.put(
        `${apiUrl}/UpdateLeadByLeadId/${_id?.id}`,
        localDetails,
        { headers }
      );
      setLocalDetails(responce?.data?.lead);
      toast.success(responce?.data?.message);
    } catch (error) {
      toast.warn(error?.response?.data?.message);
    }
  };

  const UpdateAdditionnalInformation = async (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const responce = await axios.put(
        `${apiUrl}/UpdateLeadByLeadId/${_id?.id}`,
        localDetails,
        { headers }
      );
      setLocalDetails(responce?.data?.lead);
      toast.success(responce?.data?.message);
    } catch (error) {
      toast.warn(error?.response?.data?.message);
    }
  };

  const { Statusdata } = useSelector((state) => state.StatusData);

  const [show, setshow] = useState("none");
  const [showforlostlead, setshowforlostlead] = useState("none");

  const setStatus = (e) => {
    if (e.target.value == "65a904e04473619190494482") {
      setdata(e.target.value);

      setshow("block");
      setshowforlostlead("none");
    } else if (e.target.value == "65a904ed4473619190494484") {
      setdata(e.target.value);
      setshow("none");
      setshowforlostlead("block");
    } else {
      setshow("none");
      setshowforlostlead("none");
    }
  };

  const submitFollowup1 = async (e) => {
    e.preventDefault();
    const followupDateValue = e.target.elements.followup_date?.value;

    // Parse the input date value into a Date object in UTC
    // This prevents the browser from adjusting it based on the local timezone
    const [date, time] = followupDateValue.split("T");
    const [year, month, day] = date.split("-");
    const [hour, minute] = time.split(":");

    // Construct a new ISO string without any timezone adjustment
    const adjustedFollowupDate = new Date(year, month - 1, day, hour, minute).toISOString().slice(0, 16);

    const updatedLeadData = await {
      ...data,
      lead_id: e.target.lead_id.value,
      commented_by: e.target.elements.commented_by?.value,
      assign_to_agent: e.target.elements.assign_to_agent?.value,
      followup_status_id: e.target.elements.followup_status_id?.value,
      followup_date: adjustedFollowupDate,
    };
    if (updatedLeadData.lead_id) {
      const aaaa = await dispatch(addfollowup(updatedLeadData));
      if (aaaa.payload.success === true) {
        navigate(-1);
        toast.success(aaaa.payload?.message);
      } else {
        toast.warn(aaaa.payload?.message);
      }
    } else {
      toast.warn("all field required");
    }
  };

  const submitFollowup = async (e) => {
    e.preventDefault();
  
    // Retrieve followup_date from data
    const followupDate = dataa.followup_date;
  
    // Check if followupDate is defined and not null
    if (!followupDate) {
      toast.warn("Followup date is required");
      return;
    }
  
    // Convert followupDate to ISO string without timezone adjustment
    const adjustedFollowupDate = new Date(followupDate).toISOString().slice(0, 16);
  
    const updatedLeadData = {
      ...data,
      lead_id: e.target.lead_id.value,
      commented_by: e.target.elements.commented_by?.value,
      assign_to_agent: e.target.elements.assign_to_agent?.value,
      followup_status_id: e.target.elements.followup_status_id?.value,
      followup_date: adjustedFollowupDate,
    };
  
    if (updatedLeadData.lead_id) {
      try {
        const response = await dispatch(addfollowup(updatedLeadData));
        if (response.payload.success === true) {
          navigate(-1);
          toast.success(response.payload?.message);
        } else {
          toast.warn(response.payload?.message);
        }
      } catch (error) {
        console.error("Error submitting followup:", error);
        toast.error("An error occurred while submitting followup");
      }
    } else {
      toast.warn("All fields are required");
    }
  };
  


  /////////for attechment //////
  const [file, setFile] = useState(null);
  const [filename, setfilename] = useState("");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange2 = (e) => {
    setfilename(e.target.value);
  };

  const allowedFileTypes = ["image/jpeg", "image/png", "application/pdf"];

  const filesety = async (e) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      if (allowedFileTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
      } else {
        toast.error("Invalid file type");
      }
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setError("Geolocation is not supported by your browser.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("lead_id", _id.id);
    formData.append("attechment_name", filename);
    formData.append("location", JSON.stringify(location));
    formData.append("leadattechment", file);
    console.log("formData", file);
    try {
      const response = await fetch(`${apiUrl}/file_uplode`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      toast.success(data.message);
      await getAttechmenthistory(_id?.id);
    } catch (error) {
      toast.warn(error.data.message);
    }
  };
  ////////end attechment //////
  const datafomate = (date) => {
    if (!date) return "";
    const dateTime = new Date(date);
    if (isNaN(dateTime)) return "";
    const formattedDate = dateTime?.toLocaleDateString();
    const formattedTime = dateTime?.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  };
  /////////// form Attechment History
  const [attechmenthistory, setattechmenthistory] = useState();
  const getAttechmenthistory = async (id) => {
    const responce = await axios.get(`${apiUrl}/leadattechmenthistory/${id}`);
    setattechmenthistory(responce?.data?.lead);
  };

  useEffect(() => {
    getAttechmenthistory(_id?.id);
  }, [_id?.id]);
  //////////// Delete Attechment History
  const removeSite = async (id) => {
    const confirmDelete1 = window.confirm(
      "Are you sure you want to delete this lead attechment history?"
    );
    if (confirmDelete1) {
      const responce = await axios.delete(
        `${apiUrl}/deleteLeadAttechmentHistory/${id}`
      );
      toast.success(responce?.data?.message);
      const updatedAttechmentHistory = await attechmenthistory?.filter(
        (ele) => ele._id !== responce?.data?.lead["0"]?._id
      );
      setattechmenthistory(updatedAttechmentHistory);
    } else {
      toast.success("Delete Canceled");
      console.log("Delete canceled");
    }
  };

  // for sms
  // const [smsdata, setsmsdata] = useState();
  // const sendSMS = async (e) => {
  //   e.preventDefault();
  //   const url = await smsdata?.endpointurl;
  //   try {
  //     const response = await axios.get(`${url}`, {
  //       params: {
  //         user: smsdata?.user,
  //         pass: smsdata?.pass,
  //         sender: smsdata?.sender,
  //         phone: localDetails?.contact_no,
  //         text: 'API Test - SMSFresh',
  //         priority: 'ndnd',
  //         stype: 'normal'
  //       }
  //     });
  //     console.log('jhfkjd', response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const getdatetimeformate = (datetime) => {
    if (datetime) {
      const dateObject = new Date(datetime);
      const formattedDate = `${padZero(dateObject.getDate())}-${padZero(
        dateObject.getMonth() + 1
      )}-${dateObject.getFullYear()} ${padZero(
        dateObject.getHours()
      )}:${padZero(dateObject.getMinutes())}`;
      return formattedDate;
    } else {
      return " ";
    }
  };
  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  return (
    <div>
      <div className="content-wrapper">
        <section className="container pl-0">
          {loading ? (
            <Loader />
          ) : (
            <div className="panel-bodyess pt-3">
              <div className="col-sm-12 pl-0">
                <div className="panel panel-bd lobidrag lobipanel">
                  <div className="panel-heading">
                    <div className="row">
                      <div className="col-12 col-md-6 col-xs-6">
                        <div className="btn-group">
                          <p>Followup</p>
                        </div>
                      </div>

                      <div className="col-12 col-md-2 col-xs-2">
                        <div className="form-group">
                          <button
                            className="button-wa pull-right "
                            data-toggle="modal"
                            data-target="#myModal"
                          >
                            {" "}
                            Whatsapp
                          </button>
                        </div>
                      </div>

                      <div id="myModal" class="modal fade" role="dialog">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              Send Whatsapp
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                              >
                                &times;
                              </button>
                            </div>
                            <div className="modal-body">
                              <form>
                                <div className="row">
                                  <div className="col-md-12 ">
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
                                  <div className="col-md-12">
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
                                  <div className="col-md-12 ">
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
                                  <div
                                    className="col-md-6 "
                                    style={{ marginTop: 25 }}
                                  >
                                    <div className="form-group">
                                      <label />
                                      <button className="button-57">
                                        Send Instant SMS
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-2 col-xs-2">
                        <div className="form-group">
                          <button
                            className="button-57 pull-right"
                            data-toggle="modal"
                            data-target="#myModal1"
                          >
                            Send SMS
                          </button>
                        </div>
                      </div>
                      <div id="myModal1" class="modal fade" role="dialog">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              Send SMS
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                              >
                                &times;
                              </button>
                            </div>
                            <div className="modal-body">
                              <form>
                                <div className="row">
                                  <div className="col-md-12 ">
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
                                  <div className="col-md-12">
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
                                  <div className="col-md-12 ">
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
                                  <div
                                    className="col-md-6 "
                                    style={{ marginTop: 25 }}
                                  >
                                    <div className="form-group">
                                      <label />
                                      <button className="button-57">
                                        Send Instant SMS
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="panel-body bg-white">
                    <div className="cards">
                      <div className="card-headers lead_fallow">
                        <div className=" mob-bord">
                          <form onSubmit={submitFollowup}>
                            <div className="mai-falows">
                              <div className="row">
                                <div className="col-md-6 left-border">
                                  <div className="row bottoms-border">
                                    <div className="col-md-4 col-xs-4">
                                      <lable>Full Name</lable>
                                    </div>
                                    <div className="col-md-8 col-xs-8">
                                      <input
                                        type="hidden"
                                        name="lead_id"
                                        value={foundObject?._id}
                                      />
                                      <input
                                        type="hidden"
                                        name="commented_by"
                                        value={localStorage.getItem("user_id")}
                                      />
                                      {localDetails.full_name || ""}
                                    </div>
                                  </div>

                                  <div className="row bottoms-border">
                                    <div className="col-md-4 col-xs-4">
                                      <lable>Email Id</lable>
                                    </div>
                                    <div className="col-md-8 col-xs-8">
                                      {localDetails.email_id || ""}
                                    </div>
                                  </div>

                                  <div className="row bottoms-border">
                                    <div className="col-md-4 col-xs-4">
                                      <lable>Contact No.</lable>
                                    </div>
                                    <div className="col-md-8 col-xs-8">
                                      {/* {foundObject?.contact_no} */}
                                      {localDetails.contact_no || ""}
                                    </div>
                                  </div>
                                  <div className="row bottoms-border">
                                    <div className="col-md-4 col-xs-4">
                                      <lable>Service</lable>
                                    </div>
                                    <div className="col-md-8 col-xs-8">
                                      {
                                        foundObject?.service_details[0]
                                          ?.product_service_name
                                      }{" "}
                                    </div>
                                  </div>
                                  <div className="row bottoms-border">
                                    <div className="col-md-4 col-xs-4">
                                      <lable>Lead Source</lable>
                                    </div>
                                    <div className="col-md-8 col-xs-8">
                                      {
                                        foundObject?.lead_source_details[0]
                                          ?.lead_source_name
                                      }
                                    </div>
                                  </div>
                                  <div className="row bottoms-border none-border">
                                    <div className="col-md-4 col-xs-4 pd-top">
                                      <lable>Agent Name </lable>
                                    </div>
                                    <div className="col-md-8 col-xs-8">
                                      <select
                                        disabled={
                                          localStorage.getItem("role") ===
                                            "user"
                                            ? true
                                            : false
                                        }
                                        className="form-control"
                                        required
                                        onChange={(e) =>
                                          setdata({
                                            ...data,
                                            assign_to_agent: e.target.value,
                                          })
                                        }
                                        name="assign_to_agent"
                                      >
                                        <option value="">
                                          Select Options{" "}
                                        </option>

                                        {agent?.agent?.map((agents, key) => {
                                          return (
                                            <option
                                              selected={
                                                foundObject?.assign_to_agent ===
                                                  agents._id
                                                  ? "selected"
                                                  : ""
                                              }
                                              value={agents._id}
                                            >
                                              {" "}
                                              {agents.agent_name}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="row status-bottom">
                                    <div className="col-md-4 col-xs-4 pd-top">
                                      <lable>Status</lable>
                                    </div>
                                    <div className="col-md-8 col-xs-8">
                                      <select
                                        onChange={setStatus}
                                        className="form-control"
                                        name="followup_status_id"
                                        id="followup_status"
                                        required
                                      >
                                        <option value="">Select Status</option>
                                        {Statusdata.leadstatus?.map(
                                          (status, key) => {
                                            return (
                                              <option
                                                selected={
                                                  foundObject?.status ===
                                                    status._id
                                                    ? "selected"
                                                    : ""
                                                }
                                                value={status._id}
                                              >
                                                {status.status_name}
                                              </option>
                                            );
                                          }
                                        )}
                                      </select>
                                      <input
                                        type="number"
                                        onChange={(e) =>
                                          setdata({
                                            ...data,
                                            followup_won_amount: e.target.value,
                                          })
                                        }
                                        style={{ display: show }}
                                        className="form-control"
                                        name="followup_won_amount"
                                      />

                                      <select
                                        style={{ display: showforlostlead }}
                                        onChange={(e) =>
                                          setdata({
                                            ...data,
                                            followup_lost_reason_id:
                                              e.target.value,
                                          })
                                        }
                                        className="form-control"
                                        name="followup_lost_reason_id"
                                        id="followup_lost_reason_id"
                                      >
                                        <option value="">Select Status</option>
                                        {lostreason?.map((lostreason1, key) => {
                                          return (
                                            <option
                                              selected={
                                                foundObject?.status ===
                                                  lostreason1?._id
                                                  ? "selected"
                                                  : ""
                                              }
                                              value={lostreason1?._id}
                                            >
                                              {lostreason1?.lost_reason_name}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </div>
                                  </div>
                                  {foundObject?.followup_won_amount ? (
                                    <>
                                      {" "}
                                      <div className="row status-bottom">
                                        <div className="col-md-4 pd-top col-xs-4">
                                          Won Amount Of Lead
                                        </div>
                                        <div className="col-md-8 col-xs-8">
                                          <input
                                            disabled
                                            value={
                                              foundObject?.followup_won_amount
                                            }
                                            className="form-control"
                                            placeholder="Followup date"
                                            required
                                            autoComplete="off"
                                          />
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}

                                  <div className="row status-bottom">
                                    <div className="col-md-4 pd-top col-xs-4">
                                      Followup
                                    </div>
                                    <div className="col-md-8 col-xs-8">
                                        <DatePicker
                                          selected={dataa.followup_date}
                                          onChange={(date) => setData({ ...data, followup_date: date })}
                                          showTimeSelect
                                          timeFormat="hh:mm aa"
                                          timeIntervals={5}
                                          timeCaption="Time"
                                          dateFormat="dd/MM/yyyy h:mm aa" // Custom format: day/month/year and 12-hour time
                                          className="form-control"
                                          placeholderText="Followup date"
                                          name="followup_date"
                                          id="followup_date"
                                        />
                                      </div>
                                    {/* <div className="col-md-8 col-xs-8">
                                      <input
                                        onChange={(e) =>
                                          setdata({
                                            ...data,
                                            followup_date: e.target.value,
                                          })

                                        }
                                        type="datetime-local"
                                        name="followup_date"
                                        id="followup_date"
                                        className="form-control"
                                        placeholder="Followup date"
                                        required
                                        autoComplete="off"
                                      />
                                    </div> */}
                                  </div>
                                  <div className="row status-bottom">
                                    <div className="col-md-4 pd-top col-xs-4">
                                      <lable>Description</lable>
                                    </div>
                                    <div className="col-md-8 col-xs-8">
                                      <textarea
                                        required
                                        className="form-control text-areasss"
                                        rows={3}
                                        onChange={(e) =>
                                          setdata({
                                            ...data,
                                            followup_desc: e.target.value,
                                          })
                                        }

                                        value={data?.followup_desc}
                                        // value={followupDesc}
                                        // onChange={(e) =>
                                        //   setLocalDetails({
                                        //     ...localDetails,
                                        //     followup_desc: e.target.value,
                                        //   })
                                        // }
                                        name="followup_desc"
                                        //value={localDetails?.massage_of_calander}
                                        id="followup_desc"
                                        // placeholder="Enter description..."
                                        placeholder={followupDesc}
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="add_calender text-center">
                                        <div className="form-group">
                                          <label htmlFor="is_cal">
                                            Add to Calender &nbsp;&nbsp;
                                            <input
                                              onChange={(e) =>
                                                setdata({
                                                  ...data,
                                                  add_to_calender:
                                                    e.target.value,
                                                })
                                              }
                                              type="checkbox"
                                              id="is_cal"
                                              name="add_to_calender"
                                              defaultValue="yes"
                                              autoComplete="off"
                                            />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12 col-xs-12">
                                <div className="max-widyhsSubmit">
                                  <input
                                    type="submit"
                                    name="submit"
                                    Value="Submit  "
                                    className="btn btenss form-control btn-success"
                                    autoComplete="off"
                                    placeholder="Submit  "
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      {/* Nav tabs */}
                      <ul className="nav nav-tabs mobiltabs bottom-border">
                        <li className="">
                          <a
                            href="#tab6"
                            className="active"
                            data-toggle="tab"
                            aria-expanded="true"
                          >
                            <span className="tabnone">History</span>{" "}
                            <i className="fa fa-history" aria-hidden="true" />
                          </a>
                        </li>
                        <li className="">
                          <a
                            href="#tab3"
                            data-toggle="tab"
                            aria-expanded="false"
                          >
                            <span className="tabnone">All Details </span>
                            <i
                              className="fa fa-info-circle"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                        <li className="">
                          <a
                            href="#tab4"
                            data-toggle="tab"
                            aria-expanded="false"
                          >
                            <span className="tabnone">
                              Additional Information{" "}
                            </span>
                            <i className="fa fa-info" aria-hidden="true" />
                          </a>
                        </li>
                        <li className="">
                          <a
                            href="#tab5"
                            data-toggle="tab"
                            aria-expanded="true"
                          >
                            <span className="tabnone">Attachment </span>
                            <i className="fa fa-paperclip" aria-hidden="true" />
                          </a>
                        </li>
                      </ul>
                      <div className="cards-tab">
                        <div className="tab-content">
                          {/*-------------------------------------------tab2 All Details-----------------------------*/}
                          <div className="tab-pane fade" id="tab3">
                            <form onSubmit={UpdateAddDetails}>
                              <div className="panel-body border-tbal">
                                <div className="row">
                                  <div className="col-md-6 col-xs-12">
                                    <div className="row">
                                      <div className="col-md-4 col-xs-12 pd-top">
                                        <div className="form-group">
                                          <label htmlFor="full_name">
                                            Full Name
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-8 col-xs-12">
                                        <input
                                          type="text"
                                          name="full_name"
                                          id="full_name"
                                          placeholder="Full Name"
                                          className="form-control"
                                          value={localDetails.full_name || ""}
                                          onChange={(e) =>
                                            setLocalDetails({
                                              ...localDetails,
                                              full_name: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-xs-12">
                                    <div className="row">
                                      <div className="col-md-4 col-xs-12 pd-top">
                                        <div className="form-group">
                                          {" "}
                                          <label htmlFor="email_id">
                                            Email Id
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-8 col-xs-12">
                                        <input
                                          type="email"
                                          name="email_id"
                                          //  value={foundObject?.email_id}
                                          value={localDetails.email_id || ""}
                                          onChange={(e) =>
                                            setLocalDetails({
                                              ...localDetails,
                                              email_id: e.target.value,
                                            })
                                          }
                                          id="email_id"
                                          placeholder="Email Id"
                                          className="form-control"
                                          autoComplete="off"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-xs-12">
                                    <div className="row">
                                      <div className="col-md-4 col-xs-12 pd-top">
                                        <div className="form-group">
                                          <label htmlFor="company_name">
                                            Company Name
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-8 col-xs-12">
                                        <input
                                          type="text"
                                          name="company_name"
                                          // value={foundObject?.company_name}
                                          value={
                                            localDetails.company_name || ""
                                          }
                                          onChange={(e) =>
                                            setLocalDetails({
                                              ...localDetails,
                                              company_name: e.target.value,
                                            })
                                          }
                                          id="company_name"
                                          placeholder="Company Name"
                                          className="form-control"
                                          autoComplete="off"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-xs-12">
                                    <div className="row">
                                      <div className="col-md-4 col-xs-12 pd-top">
                                        <div className="form-group">
                                          {" "}
                                          <label htmlFor="website">
                                            Website
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-8 col-xs-12">
                                        <input
                                          type="text"
                                          name="website"
                                          //value={foundObject?.website}
                                          value={localDetails.website || ""}
                                          onChange={(e) =>
                                            setLocalDetails({
                                              ...localDetails,
                                              website: e.target.value,
                                            })
                                          }
                                          id="website"
                                          placeholder="Website"
                                          className="form-control"
                                          autoComplete="off"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-xs-12">
                                    <div className="row">
                                      <div className="col-md-4 col-xs-12 pd-top">
                                        <div className="form-group">
                                          <label htmlFor="service">
                                            Service
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-8 col-xs-12">
                                        <select
                                          name="service"
                                          id="service"
                                          className="form-control"
                                          value={localDetails.service || ""}
                                          onChange={(e) =>
                                            setLocalDetails({
                                              ...localDetails,
                                              service: e.target.value,
                                            })
                                          }
                                        >
                                          <option value="">Select</option>
                                          {ProductService?.product_service?.map(
                                            (service, key) => {
                                              return (
                                                <option value={service._id}>
                                                  {
                                                    service?.product_service_name
                                                  }
                                                </option>
                                              );
                                            }
                                          )}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-xs-12">
                                    <div className="row">
                                      <div className="col-md-4 col-xs-12 pd-top">
                                        <div className="form-group">
                                          <label htmlFor="contact_no">
                                            Contact No
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-8 col-xs-12">
                                        <input
                                          type="text"
                                          name="contact_no"
                                          //value={foundObject?.contact_no}
                                          value={localDetails.contact_no || ""}
                                          onChange={(e) =>
                                            setLocalDetails({
                                              ...localDetails,
                                              contact_no: e.target.value,
                                            })
                                          }
                                          id="contact_no"
                                          placeholder="Contact No"
                                          className="form-control"
                                          autoComplete="off"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-xs-12">
                                    <div className="row">
                                      <div className="col-md-4 col-xs-12 pd-top">
                                        <div className="form-group">
                                          <label htmlFor="alternative_no">
                                            Alternative No
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-8 col-xs-12">
                                        <input
                                          type="text"
                                          name="alternative_no"
                                          value={
                                            localDetails.alternative_no || ""
                                          }
                                          onChange={(e) =>
                                            setLocalDetails({
                                              ...localDetails,
                                              alternative_no: e.target.value,
                                            })
                                          }
                                          // value={foundObject?.alternative_no}
                                          id="alternative_no"
                                          placeholder="Alternative No"
                                          className="form-control"
                                          autoComplete="off"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-xs-12">
                                    <div className="row">
                                      <div className="col-md-4 col-xs-12 pd-top">
                                        <div className="form-group">
                                          {" "}
                                          <label htmlFor="position">
                                            Position
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-8 col-xs-12">
                                        <input
                                          type="text"
                                          name="position"
                                          ///value={foundObject?.position}
                                          value={localDetails.position || ""}
                                          onChange={(e) =>
                                            setLocalDetails({
                                              ...localDetails,
                                              position: e.target.value,
                                            })
                                          }
                                          id="position"
                                          placeholder="Position"
                                          className="form-control"
                                          autoComplete="off"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-xs-12">
                                    <div class="row">
                                      <div className="col-md-4 col-xs-12 pd-top">
                                        <div className="form-group">
                                          {" "}
                                          <label htmlFor="lead_source">
                                            Lead Source
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-8 col-xs-12">
                                        <select
                                          name="lead_source"
                                          id="lead_source"
                                          className="form-control"
                                          value={localDetails.lead_source || ""}
                                          onChange={(e) =>
                                            setLocalDetails({
                                              ...localDetails,
                                              lead_source: e.target.value,
                                            })
                                          }
                                        >
                                          <option value="">Select</option>
                                          {leadSourcedata?.leadSource?.map(
                                            (leadsource, key) => {
                                              return (
                                                <option value={leadsource._id}>
                                                  {leadsource?.lead_source_name}
                                                </option>
                                              );
                                            }
                                          )}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-xs-12">
                                    <div class="row">
                                      <div className="col-md-4 col-xs-12 pd-top">
                                        <div className="form-group">
                                          {" "}
                                          <label htmlFor="lead_cost">
                                            Lead Cost
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-8 col-xs-12">
                                        <input
                                          type="text"
                                          name="lead_cost"
                                          value={localDetails.lead_cost || ""}
                                          onChange={(e) =>
                                            setLocalDetails({
                                              ...localDetails,
                                              lead_cost: e.target.value,
                                            })
                                          }
                                          //value={foundObject?.lead_cost}
                                          id="lead_cost"
                                          placeholder="Lead Cost"
                                          className="form-control"
                                          autoComplete="off"
                                          required
                                        />
                                      </div>
                                    </div>
                                  </div>{" "}
                                </div>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="max-widyhsSubmit pt-3">
                                      <button
                                        type="submit"
                                        className="btn btn-sm btn-primary form-control"
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          {/*-------------------------------------------tab3  additionnal information-----------------------------*/}

                          <div className="tab-pane fade" id="tab4">
                            <form onSubmit={UpdateAdditionnalInformation}>
                              <div className="row">
                                <div className="col-sm-6 col-xs-12 ">
                                  <div className="card-headeres">
                                    <div className="form-group pt-3">
                                      <div className="address-sec">
                                        Address{" "}
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-4 pd-top">
                                        <div className="form-group">
                                          {" "}
                                          <label htmlFor="country">
                                            Country
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-8">
                                        <select
                                          name="country"
                                          value={localDetails.country || ""}
                                          // onChange={(e) =>
                                          //   setLocalDetails({
                                          //     ...localDetails,
                                          //     country: e.target.value,
                                          //   })
                                          // }
                                          onChange={handleInputChange}
                                          className="form-control"
                                          required
                                        >
                                          <option value="">Select</option>
                                          {CountryState?.country?.map(
                                            (country1, key) => {
                                              return (
                                                <option
                                                  value={country1.isoCode}
                                                >
                                                  {country1.name}{" "}
                                                </option>
                                              );
                                            }
                                          )}
                                        </select>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-4 pd-top">
                                        <div className="form-group">
                                          {" "}
                                          <label htmlFor="full_address">
                                            Full Address
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-8 cardes">
                                        <textarea
                                          name="full_address"
                                          cols={40}
                                          rows={3}
                                          id="full_address"
                                          value={localDetails.full_address || ''}
                                          onChange={(e) => setLocalDetails({ ...localDetails, full_address: e.target.value })}
                                          className="form-control"
                                          defaultValue={""}
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-4 pd-top">
                                        <div className="form-group">
                                          {" "}
                                          <label htmlFor="state">State</label>
                                        </div>
                                      </div>
                                      <div className="col-md-8">
                                        <div className="form-group">
                                          <select
                                            name="state"
                                            id="state"
                                            className="form-control"
                                            value={localDetails.state || ""}
                                            onChange={(e) =>
                                              setLocalDetails({
                                                ...localDetails,
                                                state: e.target.value,
                                              })
                                            }
                                          >
                                            <option value="">
                                              Select State
                                            </option>
                                            {StateByCountry?.state?.map(
                                              (state1, key) => {
                                                return (
                                                  <option value={state1.name}>
                                                    {state1.name}
                                                  </option>
                                                );
                                              }
                                            )}
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-6 col-xs-12 ">
                                  <div className="card-headeres pt-3">
                                    <div className="col-md-12 pd-0">
                                      <div className="address-sec">
                                        Additional Information{" "}
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-4 pd-top">
                                        <div className="form-group">
                                          {" "}
                                          <label htmlFor="description">
                                            Description
                                          </label>
                                        </div>
                                      </div>
                                      <div
                                        className="col-md-8"
                                        style={{ padding: 0 }}
                                      >
                                        <textarea
                                          name="description"
                                          cols={40}
                                          rows={3}
                                          value={localDetails.description || ""}
                                          onChange={(e) =>
                                            setLocalDetails({
                                              ...localDetails,
                                              description: e.target.value,
                                            })
                                          }
                                          id="description"
                                          className="form-control"
                                          defaultValue={""}
                                        />
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="col-md-4 pd-top">
                                        <div className="form-group">
                                          {" "}
                                          <label htmlFor="city">City</label>
                                        </div>
                                      </div>
                                      <div className="col-md-8">
                                        <input
                                          type="text"
                                          name="city"
                                          value={localDetails.city || ""}
                                          onChange={(e) =>
                                            setLocalDetails({
                                              ...localDetails,
                                              city: e.target.value,
                                            })
                                          }
                                          defaultValue=""
                                          id="city"
                                          placeholder="City"
                                          className="form-control"
                                          autoComplete="off"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-4 pd-top">
                                        <div className="form-group">
                                          {" "}
                                          <label htmlFor="pincode">
                                            Pincode
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-8 cardese">
                                        <input
                                          type="text"
                                          name="pincode"
                                          value={localDetails.pincode || ""}
                                          onChange={(e) =>
                                            setLocalDetails({
                                              ...localDetails,
                                              pincode: e.target.value,
                                            })
                                          }
                                          defaultValue=""
                                          id="pincode"
                                          placeholder="Pincode"
                                          className="form-control"
                                          autoComplete="off"
                                        />
                                      </div>
                                    </div>
                                    <div className="row d-none">
                                      <div className="col-md-4 pd-top">
                                        <div className="form-group">
                                          <label htmlFor="assign_to_agent">
                                            Assign to agent
                                          </label>
                                        </div>
                                      </div>
                                      <div
                                        className="col-md-8 cardese"
                                        style={{ padding: 0 }}
                                      >
                                        <select
                                          name="assign_to_agent"
                                          id="assign_to_agent"
                                          className="form-control"
                                          required
                                        >
                                          <option value="">Select</option>
                                          {agent?.agent?.map((agents, key) => {
                                            return (
                                              <option
                                                selected={
                                                  foundObject?.assign_to_agent ===
                                                    agents._id
                                                    ? "selected"
                                                    : ""
                                                }
                                                value={agents._id}
                                              >
                                                {agents.agent_name}
                                              </option>
                                            );
                                          })}
                                        </select>
                                      </div>
                                    </div>
                                    <div className="row d-none">
                                      <div className="col-md-4 pd-top">
                                        <div className="form-group">
                                          <label htmlFor="status">Status</label>
                                        </div>
                                      </div>
                                      <div
                                        className="col-md-8"
                                        style={{ padding: 0 }}
                                      >
                                        <div className="form-group">
                                          <select
                                            name="status"
                                            id="status"
                                            className="form-control"
                                            required
                                          >
                                            <option value="">Select</option>

                                            {Statusdata.leadstatus?.map(
                                              (status, key) => {
                                                return (
                                                  <option
                                                    selected={
                                                      foundObject?.status ===
                                                        status._id
                                                        ? "selected"
                                                        : ""
                                                    }
                                                    value={status._id}
                                                  >
                                                    {status.status_name}
                                                  </option>
                                                );
                                              }
                                            )}
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-12">
                                  <div className="max-widyhsSubmit py-3">
                                    <button
                                      type="submit"
                                      className="btn btn-sm btn-primary ad_infor form-control"
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          {/*-------------------------------------------tab4 att-----------------------------*/}
                          <div className="tab-pane fade" id="tab5">
                            <form
                              onSubmit={handleFormSubmit}
                              encType="multipart/form-data"
                            >
                              <div className="panel-body border-tbal">
                                <div className="row">
                                  <div className="col-md-1">
                                    <div className="form-group">
                                      <label className="file-upl-o">
                                        Attach File
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="form-group">
                                      <input
                                        name="file"
                                        type="file"
                                        onChange={filesety}
                                        className="file-set"
                                        autoComplete="off"
                                        required
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      {location ? (
                                        <>
                                          <input
                                            type="text"
                                            name="location"
                                            id="file_name"
                                            disabled
                                            value={
                                              location.latitude +
                                              "," +
                                              location.longitude
                                            }
                                            className="form-control"
                                            placeholder="Current Location"
                                            autoComplete="off"
                                          />
                                          <p>
                                            Copy this Lat./Log And Put In
                                            SearchBar In Google map
                                          </p>
                                        </>
                                      ) : error ? (
                                        <p>Error: {error}</p>
                                      ) : (
                                        <>
                                          <input
                                            type="text"
                                            name=""
                                            id=""
                                            disabled
                                            className="form-control"
                                            placeholder="Current Location"
                                            autoComplete="off"
                                          />
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        id="file_name"
                                        name="file_name"
                                        onChange={handleFileChange2}
                                        className="form-control"
                                        placeholder="Enter File Name"
                                        autoComplete="off"
                                        required
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="form-group">
                                      <button
                                        type="submit"
                                        className="btn btnss btn-success"
                                      >
                                        Upload
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                {/* Progress bar */}
                                <div className="row d-none">
                                  <div className="col-12 col-6 col-xl-6 col-md-6">
                                    <div className="progress">
                                      <div className="progress-bar" />
                                    </div>
                                  </div>
                                  <div className="col-12 col-6 col-xl-6 col-md-6">
                                    <span className="text-danger">
                                      Max Size : 800000 bytes
                                    </span>
                                    <span id="uerror" className="text-danger" />
                                    <span
                                      id="usuccess"
                                      className="text-success"
                                    />
                                  </div>
                                </div>
                              </div>
                            </form>
                            <div className="col-md-12">
                              <div className="panel-body border-tbal">
                                <div className="table-responsive mob-bord">
                                  <table
                                    className="table table-bordered table-hover"
                                    id="uploadtable"
                                  >
                                    <thead>
                                      <tr>
                                        <th className="list-serila">Serial</th>
                                        <th>File</th>
                                        <th>File Name</th>
                                        <th>Location </th>
                                        <th>Created </th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>

                                    {attechmenthistory?.map(
                                      (attechmenthistory1, index) => {
                                        const url =
                                          attechmenthistory1.leadattechment;
                                        const prefixToRemove =
                                          "/var/www/html/backend/public";

                                        const modifiedUrl = url.replace(
                                          prefixToRemove,
                                          ""
                                        );
                                        const mainurl =
                                          "https://backend.bizavtar.com/" +
                                          modifiedUrl;

                                        return (
                                          <tbody id="lead_docs">
                                            <td>{index + 1}</td>
                                            <td>
                                              <a
                                                href={mainurl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                <img
                                                  src={mainurl}
                                                  // alt="Description"
                                                  width="50"
                                                  height={50}
                                                />
                                              </a>
                                            </td>
                                            <td>
                                              {
                                                attechmenthistory1.attechment_name
                                              }
                                            </td>
                                            <td>
                                              {attechmenthistory1.location}
                                            </td>
                                            <td>
                                              {datafomate(
                                                attechmenthistory1.created
                                              )}
                                            </td>
                                            <td>
                                              <button
                                                type="button"
                                                className="btn btn-danger btn-xl mr-2"
                                                onClick={(e) =>
                                                  removeSite(
                                                    attechmenthistory1._id
                                                  )
                                                }
                                              >
                                                <i
                                                  class="fa fa-trash"
                                                  aria-hidden="true"
                                                ></i>
                                              </button>
                                            </td>
                                          </tbody>
                                        );
                                      }
                                    )}
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade in active show"
                            id="tab6"
                          >
                            <div className="panel-body border-tbal">
                              <div className="table-responsive mob-bord">
                                <table
                                  className="table table-bordered"
                                  id="followup_table"
                                >
                                  <thead>
                                    <tr>
                                      <th>COMMENTED BY</th>
                                      <th>DATE</th>
                                      <th>STATUS</th>
                                      <th>FOLLOWUP DATE</th>
                                      <th>COMMENT</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {followup?.followuplead?.map(
                                      (follow, key) => {
                                        return (
                                          <tr>
                                            <td>
                                              {
                                                follow?.comment_by[0]
                                                  ?.agent_name
                                              }
                                            </td>
                                            {/* <td>
                                              {getdatetimeformate(
                                                follow?.created
                                              )} */}
                                            {/* {follow?.followup_date && format(new Date(datafomate(follow?.created)), 'dd/MM/yy hh:mm:ss')} */}
                                            {/* </td> */}

                                            <td>
                                              {follow?.created && (() => {
                                                const date = new Date(follow?.created);
                                                const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
                                                const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1
                                                const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of year
                                                const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
                                                const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure 2-digit minutes
                                                const seconds = String(date.getSeconds()).padStart(2, '0'); // Ensure 2-digit seconds
                                                const ampm = date.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM

                                                return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} `;
                                              })()}
                                            </td>

                                            <td>
                                              {
                                                follow?.status_details[0]
                                                  ?.status_name
                                              }
                                            </td>
                                            {/* <td>
                                              {getdatetimeformate(
                                                follow?.followup_date
                                              )} */}
                                            {/* {follow?.followup_date && format(new Date(datafomate(follow?.followup_date)), 'dd/MM/yy hh:mm:ss')} */}
                                            {/* </td> */}

                                            <td>
                                              {follow?.followup_date && (() => {
                                                const date = new Date(follow?.followup_date);
                                                const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
                                                const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1
                                                const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of year
                                                const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
                                                const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure 2-digit minutes
                                                const seconds = String(date.getSeconds()).padStart(2, '0'); // Ensure 2-digit seconds
                                                const ampm = date.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM

                                                return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} `;
                                              })()}
                                            </td>
                                            <td>{follow?.followup_desc}</td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
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
          )}
        </section>
      </div>
    </div>
  );
}
