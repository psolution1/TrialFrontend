import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AllFollowupstable from "./AllFollowupstable";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllAgent } from "../../features/agentSlice";
import { getAllStatus } from "../../features/statusSlice";
function Followupleads() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { agent } = useSelector((state) => state.agent);
  const { Statusdata } = useSelector((state) => state.StatusData);
  const [none, setnone] = useState("none");
  const [leads, setLeadID] = useState([]);

  const [LeadStatus, setLeadStatus] = useState();
  const [Leadagent, setLeadagent] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStatus());
  }, []);

  const advanceserch = () => {
    if (none == "none") {
      setnone("block");
    } else {
      setnone("none");
    }
  };

  const BulkAction = async (e) => {
    e.preventDefault();
    const updatedData = {
      leads,
      Leadagent,
      LeadStatus,
    };
    try {
      const response = await axios.put(
        `${apiUrl}/BulkLeadUpdate/`,
        updatedData
      );
      if (response.data.success === false) {
        toast.warn(response.data.message);
      }
      if (response.data.success === true) {
        window.location.reload(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.warn(error.response?.data?.message);
    }
  };

  const handleChildData = (data) => {
    setLeadID(data);
  };
  return (
    <div>
      <div className="content-wrapper">
        <section className="content">
          <div className="container">
            <div className="pt-3">
              <div className="row export-data">
                
              <div className="col-md-7 col-xs-12 ">
                  <div className="bulkaction-wrap">
                    <div className="ipades pt-2" >
                      <form onSubmit={BulkAction}>
                        <div className="row">
                          <div className="col-md-3 col-sm-3 col-xs-12">
                            <div className="btne-group">
                              <p>Bulk Action</p>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-3 col-xs-12">
                            <select className="form-control"
                              onChange={e => setLeadStatus({ ...LeadStatus, status: e.target.value })}
                              name="status" id="status" required >
                              <option value>Change Status</option>
                              {Statusdata?.leadstatus?.map((status, key) => {
                                return (
                                  <option value={status._id}>
                                    {status.status_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="col-md-3 col-sm-3 col-xs-12">
                            <select className="form-control"
                              onChange={e => setLeadagent({ ...Leadagent, agent: e.target.value })}
                              name="agent" id="agent" required >
                              <option value>Transfer to</option>

                              {agent?.agent?.map((agents, key) => {
                                return (
                                  <option value={agents._id}>
                                    {agents.agent_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="col-md-2 col-sm-2 col-xs-12 pl-0">
                            <input type="submit" className="button-57" defaultValue="Submit" />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 col-xs-12">
                  <div className="advfilter-wrap">
                    <div className="row">
                      <div className="col-md-6 col-sm-6 mobil-nns col-xs-6">
                        <div>
                          <button className="btn-advf" onClick={advanceserch}>
                            <i class="fa fa-search" aria-hidden="true"></i>
                            &nbsp;  Advance Filter </button>
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6 col-xs-6">
                        <div>
                          <Link className="btn-advf" to="/Addlead"> <i className="fa fa-plus" />&nbsp;  Add Lead </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <div className="container pl-0">
                  <AllFollowupstable
                    sendDataToParent={handleChildData}
                    dataFromParent={none}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Followupleads;
