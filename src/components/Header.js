import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Breadcrumb from "./Pages/Breadcrumb";
import axios from "axios";
import { getAllAgent } from "../features/agentSlice";
import { useDispatch, useSelector } from "react-redux";
function Header() {
  const dispatch = useDispatch();
  const [leads, setleads] = useState([]);
  const [status, setstatus] = useState();
  const [leadcountdataa, setLeadCountDataa] = useState([]);
  const [filterLeads, setFilterLeads] = useState([]);
  const [filterleads, setfilterleads] = useState([]);
  const [followupLeadCount, setFollowupLeadCount] = useState(0);
  const { agent } = useSelector((state) => state.agent);
  const apiUrl = process.env.REACT_APP_API_URL;
  const DBuUrl = process.env.REACT_APP_DB_URL;
  const navigate = useNavigate();
  const Logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("agent_name");
    localStorage.removeItem("agent_email");
    localStorage.removeItem("agent_mobile");
    localStorage.removeItem("role");
    await navigate("/login");
    setTimeout(() => {
      toast.warn("Logout Successfully");
      window.location.reload(false);
    }, 500);
  };

  const getAllLead1 = async () => {
    try {
      const response = await axios.get(`${apiUrl}/get_All_Lead_Followup`, {
        headers: {
          "Content-Type": "application/json",
          "mongodb-url": DBuUrl,
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const leads = response?.data?.lead;
      const filteredLeads = leads?.filter((lead) => lead?.type !== "excel");

      const currentTime = new Date();
      const leadsToCount = filteredLeads?.filter((lead) => {
        const followupDate = new Date(lead?.followup_date);
        const fiveMinutesBeforeFollowup = new Date(
          followupDate.getTime() - 5 * 60 * 1000
        );
        return currentTime >= fiveMinutesBeforeFollowup;
      });

      const followupLeadCount = leadsToCount?.length || 0;

      // Update lead count state for notification
      setLeadCountDataa([{ name: "Followup Leads", Value: followupLeadCount }]);
      setFilterLeads(filteredLeads);
      setFollowupLeadCount(followupLeadCount);

      console.log("Number of leads to count:", followupLeadCount);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllLead1();
    const intervalId = setInterval(getAllLead1, 30000); // Fetch every 30 seconds
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAllAgent());
    };
    fetchData();
  }, []);
  const [leadcountdata, setleadcountdata] = useState({});
  const getLeadCountData = async () => {
    try {
      const responce = await axios.get(`${apiUrl}/DashboardLeadCount`, {
        headers: {
          "Content-Type": "application/json",
          "mongodb-url": DBuUrl,
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setleadcountdata(responce?.data?.Count);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLeadCountData();
  }, []);

  const url = window.location.href;
  const baseUrl = new URL(url).origin;

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className="nav-link"
              data-widget="pushmenu"
              to="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/home" className="nav-link">
              <i class="fa fa-home" />
              {/* Home */}
            </Link>
          </li>
        </ul>

        <Breadcrumb />
        <div className="text-center blink-soft">
          <h2 className="demo_smsm">In Demo SMS Will Not Work</h2>
        </div>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <Link className="nav-link" data-toggle="dropdown" to="#">
              <i className="far fa-bell pe-7s-bell" />

              {followupLeadCount > 0 && (
                <span className="badge badge-warning navbar-badge">
                  {followupLeadCount}
                </span>
              )}
            </Link>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              {followupLeadCount > 0 && (
                <Link to="/followupleads" className="dropdown-item">
                  <i className="fas fa-envelope mr-2" /> {followupLeadCount}{" "}
                  Miss follow-ups
                </Link>
              )}
            </div>
          </li>

          {/* <li className="nav-item dropdown">
            <Link className="nav-link" data-toggle="dropdown" to="#">
              <i className="far fa-bell pe-7s-bell" />
             
              {Array.isArray(leadcountdata) && (
                <span className="badge badge-warning navbar-badge">
                  {leadcountdata.reduce(
                    (total, item) =>
                      item.name !== "Total Lead" && item.name !== "Total Agent"
                        ? total + item.Value
                        : total,
                    0
                  )}
                </span>
              )}
            </Link>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              {Array.isArray(leadcountdata) &&
                leadcountdata.map((leadcountdata1, index) =>
                  leadcountdata1?.name ===
                  "Total Lead" ? null : leadcountdata1?.name ===
                    "Total Agent" ? null : leadcountdata1?.Value !== 0 ? (
                    <React.Fragment key={index}>
                      <Link to="/followupleads" className="dropdown-item">
                        <i className="fas fa-envelope mr-2" />{" "}
                        {leadcountdata1?.Value} new {leadcountdata1?.name}
                      </Link>
                    </React.Fragment>
                  ) : null
                )}
            </div>
          </li> */}

          <li className="nav-item dropdown">
            <Link className="nav-link" data-toggle="dropdown" href="#">
              <img
                src="/dist/img/avatar5.png"
                className="img-circle elevation-2 img-circle"
                to={40}
                width={40}
                alt="User Image"
              />
            </Link>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <Link to="/Setting" className="dropdown-item">
                <i className="nav-icon far fa fa-cog" /> Settings
              </Link>
              <div className="dropdown-divider" />
              <Link to="/login" className="dropdown-item" onClick={Logout}>
                <i className="nav-icon far fa fa-cog" /> logout user
              </Link>
              {localStorage.getItem("role") === "admin" && (
                <>
                  {agent &&
                    agent.agent?.map(
                      (agents, key) =>
                        agents.role !== "admin" && (
                          <React.Fragment key={agents?._id}>
                            <div className="dropdown-divider" />
                            <a
                              href={`${baseUrl}/newloginpage/${agents?._id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="dropdown-item"
                              key={key}
                            >
                              <i className="nav-icon far fa fa-cog" />{" "}
                              {agents?.agent_name}
                            </a>
                          </React.Fragment>
                        )
                    )}
                </>
              )}
            </div>{" "}
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-widget="fullscreen"
              to="#"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt" />
            </Link>
          </li>
          <li className="nav-item"></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
