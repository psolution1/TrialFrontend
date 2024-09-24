import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function Housingapi() {
  const [smsdata, setsmsdata] = useState([]);
  const DBuUrl = process.env.REACT_APP_DB_URL;
  const apiUrl = process.env.REACT_APP_API_URL;
  const getalltransactional = async () => {
    const type = { type: "housing" };
    try {
      const response = await axios.post(
        `${apiUrl}/getallsmsrecord`,
        { type: "housing" },
        {
          headers: {
            "Content-Type": "application/json",
            "mongodb-url": DBuUrl,
          },
        }
      );
      setsmsdata(response?.data?.transactional["0"]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getalltransactional();
  }, []);

  const saveandupdate = async (e) => {
    e.preventDefault();
    const { _id, ...newData1 } = smsdata;
    const newData = { ...newData1, type: "housing" };
    try {
      const response = await axios.post(
        `${apiUrl}/addandupdatetransactionalsms`,
        newData,
        {
          headers: {
            "Content-Type": "application/json",
            "mongodb-url": DBuUrl,
          },
        }
      );
      setsmsdata(response?.data?.transactional["0"]);
      toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="content-wrapper">
        <section className="content content-header">
          <div className="row">
            <div className="col-sm-12">
              <div className="panel panel-bd">
                <div className="panel-heading bg-white">
                  <div className="btn-group">Api Details</div>
                </div>
                <div className="panel-body">
                  <form onSubmit={saveandupdate}>
                    <div className="col-sm-12 col-md-12 col-xs-12">
                      <div className="cards">
                        <div className="card-headers">
                          <div className="row justify-content-md-center">
                            <div className="col-md-offset-2 col-md-8">
                              <div className="row">
                                <div className="col-md-3">
                                  <label>EndPoint Url</label>
                                </div>
                                <div className="col-md-9">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter your Endpoint URL here!"
                                      required
                                      onChange={(e) => {
                                        setsmsdata({
                                          ...smsdata,
                                          [e.target.name]: e.target.value,
                                        });
                                      }}
                                      name="endpointurl"
                                      value={smsdata?.endpointurl}
                                    />{" "}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-offset-2 col-md-8">
                              <div className="row">
                                <div className="col-md-3">
                                  <label>Your API key</label>
                                </div>
                                <div className="col-md-9">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter your API key here!"
                                      required
                                      onChange={(e) => {
                                        setsmsdata({
                                          ...smsdata,
                                          [e.target.name]: e.target.value,
                                        });
                                      }}
                                      name="key"
                                      value={smsdata?.key}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-offset-2 col-md-8">
                              <div className="row">
                                <div className="col-md-3">
                                  <label>User</label>
                                </div>
                                <div className="col-md-9">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter your Username here!"
                                      required
                                      onChange={(e) => {
                                        setsmsdata({
                                          ...smsdata,
                                          [e.target.name]: e.target.value,
                                        });
                                      }}
                                      name="user"
                                      value={smsdata?.user}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-offset-2 col-md-8">
                              <div className="row">
                                <div className="col-md-3">
                                  <label>Passward</label>
                                </div>
                                <div className="col-md-9">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter your Passward here!"
                                      required
                                      onChange={(e) => {
                                        setsmsdata({
                                          ...smsdata,
                                          [e.target.name]: e.target.value,
                                        });
                                      }}
                                      name="pass"
                                      value={smsdata?.pass}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-offset-2 col-md-8">
                              <div className="row">
                                <div className="col-md-3">
                                  <label></label>
                                </div>
                                <div className="col-md-9">
                                  <div className="form-group">
                                    <button
                                      type="submit"
                                      className="btn btn-primary form-control"
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
