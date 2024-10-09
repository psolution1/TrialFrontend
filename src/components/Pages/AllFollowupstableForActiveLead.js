import React, { useState, useEffect } from "react";

import Loader from "../Loader";
import axios from "axios";
import DataTable from "react-data-table-component";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { getAllAgent } from "../../features/agentSlice";
import { getAllStatus } from "../../features/statusSlice";
import { getHostingbydomain } from "../../features/licenceSlice";

export default function AllFollowupstableForActiveLead({
  sendDataToParent,
  dataFromParent,
}) {
  const dispatch = useDispatch();
  const apiUrl = process.env.REACT_APP_API_URL;
  const DBuUrl = process.env.REACT_APP_DB_URL;
  const [leads, setleads] = useState([]);
  const [status, setstatus] = useState();
  const { hostings, loading } = useSelector((state) => state?.app);
  const [search, setsearch] = useState("");
  const [filterleads, setfilterleads] = useState([]);
  const { agent } = useSelector((state) => state.agent);
  const { Statusdata } = useSelector((state) => state.StatusData);
  const Refresh = () => {
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  };
  const getAllLead1 = async () => {
    try {
      const responce = await axios.get(`${apiUrl}/get_All_Lead_Followup`, {
        headers: {
          "Content-Type": "application/json",
          "mongodb-url": DBuUrl,
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setleads(responce?.data?.lead);
      setfilterleads(responce?.data?.lead);
    } catch (error) {
      const message = await error?.response?.data?.message;
      if (
        message == "Client must be connected before running operations" ||
        message == "Internal Server Error"
      ) {
        getAllLead1();
      }
      console.log(error);
      setfilterleads();
    }
  };

  const getAllLead2 = async (assign_to_agent) => {
    try {
      const responce = await axios.post(`${apiUrl}/get_Leadby_agentid_status`, {
        assign_to_agent,
        headers: {
          "Content-Type": "application/json",
          "mongodb-url": DBuUrl,
            Authorization: "Bearer " + localStorage.getItem("token"),

        },
      });

      if (responce?.data?.success === true) {
        setstatus(responce?.data?.success);
        setleads(responce?.data?.lead);
        setfilterleads(responce?.data?.lead);
      }
      if (responce?.data?.success === false) {
        setstatus(responce?.data?.success);
        setleads(responce?.data?.lead);
        setfilterleads(responce?.data?.lead);
      }
    } catch (error) {
      const message = await error?.response?.data?.message;
      if (message == "Client must be connected before running operations") {
        getAllLead2(assign_to_agent);
      }
      console.log(error);
      setfilterleads();
    }
  };

  useEffect(() => {
    var host = window.location.hostname;
    dispatch(getHostingbydomain(host));
    if (localStorage.getItem("role") === "admin") {
      getAllLead1();
    } else {
      getAllLead2(localStorage.getItem("user_id"));
    }
    dispatch(getAllAgent());
    dispatch(getAllStatus());
  }, [localStorage.getItem("user_id")]);

  useEffect(() => {
    const result = leads?.filter((lead) => {
      return (
        lead.full_name.toLowerCase().match(search.toLowerCase()) ||
        lead?.agent_details[0]?.agent_name
          .toLowerCase()
          .match(search.toLowerCase()) ||
        lead?.service_details[0]?.product_service_name
          .toLowerCase()
          .match(search.toLowerCase()) ||
        lead?.lead_source_details[0]?.lead_source_name
          .toLowerCase()
          .match(search.toLowerCase()) ||
        lead?.status_details[0]?.status_name
          .toLowerCase()
          .match(search.toLowerCase())
      );
    });
    setfilterleads(result);
  }, [search]);
  const isAdmin = localStorage.getItem("role") === "admin";
  const commonColumns = [
    {
      name: "Name",
      cell: (row) => row?.full_name,
      selector: (row) => row?.full_name,
      sortable: true,
    },
    {
      name: "Number",
      selector: (row) => row?.contact_no,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row?.status_details[0]?.status_name,
      sortable: true,
    },
  ];

  const getStatusBadgeClass = (statusName) => {
    switch (statusName) {
      case "Call Back & Hot Lead": {
        return "bg-danger";
      }
      case "Meeting": {
        return "bg-success";
      }
      case "Call Back": {
        return "bg-warning text-dark";
      }

      default:
        return "bg-default"; // Default class for other statuses
    }
  };

  const adminColumns = [
    {
      name: "Agent",
      selector: (row) => row?.agent_details[0]?.agent_name,
      sortable: true,
    },
    {
      name: "Followup date",
      selector: (row) => (row?.followup_date ? row?.followup_date : ""),
      sortable: true,
    },
  ];

  const userColumns = [
    {
      name: "Followup date",
      selector: (row) => (row?.followup_date ? row?.followup_date : ""),
      sortable: true,
    },
  ];

  const columns = isAdmin
    ? [...commonColumns, ...adminColumns]
    : [...commonColumns, ...userColumns];

  const getdatetimeformate = (datetime) => {
    const dateObject = new Date(datetime);
    const formattedDate = `${dateObject.getFullYear()}-${padZero(
      dateObject.getMonth() + 1
    )}-${padZero(dateObject.getDate())} ${padZero(
      dateObject.getHours()
    )}:${padZero(dateObject.getMinutes())}`;
    return formattedDate;
  };
  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableDataForPDF = filterleads.map((row) =>
      columns.map((column) => {
        if (column.selector && typeof column.selector === "function") {
          return column.selector(row);
        }
        return row[column.selector];
      })
    );

    doc.autoTable({
      head: [columns.map((column) => column.name)],
      body: tableDataForPDF,
    });
    doc.save("table.pdf");
  };

  const customStyles = {
    cells: {
      style: {
        border: "0px solid #ddd", // Set the cell border
        fontSize: "14px",
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

  const exportToExcel = () => {
    const columnsForExport = columns.map((column) => ({
      title: column.name,
      dataIndex: column.selector,
    }));

    const dataForExport = filterleads.map((row) =>
      columns.map((column) => {
        if (column.selector && typeof column.selector === "function") {
          return column.selector(row);
        }
        return row[column.selector];
      })
    );

    const exportData = [
      columnsForExport.map((col) => col.title),
      ...dataForExport,
    ];

    const blob = new Blob(
      [exportData.map((row) => row.join("\t")).join("\n")],
      {
        type: "application/vnd.ms-excel",
      }
    );
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "table.xls";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const [selectedRowIds, setSelectedRowIds] = useState();

  const handleSelectedRowsChange = ({ selectedRows }) => {
    const selectedIds = selectedRows.map((row) => row.contact_no);
    setSelectedRowIds(selectedIds);
  };
  const [sendmessage, setsendmessage] = useState([]);
  const [smsdata, setsmsdata] = useState();
  const DeleteSelected = async (e) => {
    e.preventDefault();
    if (!selectedRowIds) {
      return toast.success("Plz Select Client");
    }

    const url = await hostings["0"]?.smsendpointurl;
    const updated = { ...sendmessage, noofperson: selectedRowIds?.length };
    const selectedmobilenumber = selectedRowIds.join(",");
    try {
      savesmsreport(updated);
      const response = await axios.get(`${url}`, {
        params: {
          user: await hostings["0"]?.smsuser,
          pass: await hostings["0"]?.smspass,
          sender: await hostings["0"]?.smssender,
          phone: await selectedmobilenumber,
          text: "API Test - SMSFresh",
          priority: "ndnd",
          stype: "normal",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const savesmsreport = async (updated) => {
    try {
      const responce = await axios.post(`${apiUrl}/addSmsReport`, {
        updated,
      });
      if (responce?.data?.success === true) {
        toast.success(responce.data.message1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [adSerch, setAdvanceSerch] = useState([]);
  // const AdvanceSerch = async (e) => {
  //   e.preventDefault();
  //   console.log(adSerch);
  //   fetch(`${apiUrl}/getAdvanceFillter`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "mongodb-url": DBuUrl,
  //           Authorization: "Bearer " + localStorage.getItem("token"),

  //     },
  //     body: JSON.stringify(adSerch),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Response from server:", data);
  //       setstatus(data?.success);
  //       setleads(data?.lead);
  //       setfilterleads(data?.lead);
  //     })
  //     .catch((error) => {
  //       console.error("Fetch error:", error);
  //       // Handle errors
  //     });
  // };


  const AdvanceSerch = async (e) => {
    e.preventDefault();
    const updatedata = {
      ...adSerch,
      user_id: localStorage.getItem("user_id"),
      role: localStorage.getItem("role"),
    };
    fetch(`${apiUrl}/getAdvanceFillter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "mongodb-url": DBuUrl,
      },
      body: JSON.stringify(updatedata),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response from server:", data);
        setstatus(data?.success);
        setleads(data?.lead);
        setfilterleads(data?.lead);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        // Handle errors
      });
  };
  const [carecters, setCarecters] = useState(0);
  const [row, setRow] = useState(1);

  const EnterMessage = (e) => {
    const message = e.target.value;
    const characterCount = message.length;
    setCarecters(characterCount);

    if (characterCount === 0) {
      setRow(1);
    } else if (characterCount <= 160) {
      setRow(1);
    } else {
      const numberOfRows = Math.ceil(characterCount / 160);
      setRow(numberOfRows);
    }

    setsendmessage({ ...sendmessage, message: message });
  };

  return (
    <div>
      <div className="row " style={{ display: dataFromParent }}>
        <div className="col-md-12 advS">
          <form onSubmit={AdvanceSerch}>
            <div className="row">
              <div className="col-md-3 ">
                <div className="form-group">
                  <select
                    className="form-control"
                    onChange={(e) =>
                      setAdvanceSerch({ ...adSerch, Status: e.target.value })
                    }
                    name="Status"
                  >
                    <option>Status</option>
                    {Statusdata?.leadstatus?.map((status, key) => {
                      if (
                        status.status_name == "Lost" ||
                        status.status_name == "Won"
                      ) {
                      } else {
                        return (
                          <option value={status._id}>
                            {status.status_name}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <select
                    className="form-control"
                    onChange={(e) =>
                      setAdvanceSerch({ ...adSerch, agent: e.target.value })
                    }
                    name="agent"
                  >
                    <option>Agent</option>
                    {agent?.agent?.map((agents, key) => {
                      return (
                        <option value={agents._id}>{agents.agent_name}</option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-md-3 d-none">
                <div className="form-group">
                  <input
                    type="date"
                    placeholder="Date To"
                    className="form-control"
                    onChange={(e) =>
                      setAdvanceSerch({ ...adSerch, startDate: e.target.value })
                    }
                    name="startDate"
                  />
                </div>
              </div>
              <div className="col-md-3 d-none">
                <div className="form-group">
                  <input
                    type="date"
                    placeholder="Date Till"
                    onChange={(e) =>
                      setAdvanceSerch({ ...adSerch, endDate: e.target.value })
                    }
                    className="form-control"
                    name="endDate"
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn-ecport-pdf"
                    style={{width: '100%', border:'0px'}}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <button
                    onClick={Refresh}
                    className="btn-advf"
                    style={{width: '100%', border:'0px'}}
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* ///////for send sms */}
      <div className="row " style={{ display: dataFromParent }}>
        <div className="col-md-12 advS">
          <form onSubmit={DeleteSelected}>
            <div className="row">
              <div className="col-md-3 ">
                <label>Enter Message</label>
                <div className="form-group">
                  <textarea
                    type="text"
                    placeholder="Enter Message"
                    className="form-control"
                    onChange={EnterMessage}
                    name="message"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="col-md-3">
                <label>Characters</label>
                <div className="form-group">
                  <input
                    type="text"
                    value={carecters}
                    className="form-control"
                    placeholder="Characters"
                    name="message"
                  />
                </div>
              </div>
              <div className="col-md-3 ">
                <div className="form-group">
                  <label>No of SMS</label>
                  <input
                    type="text"
                    value={row}
                    className="form-control"
                    placeholder="No of SMS"
                    name="message"
                  />
                </div>
              </div>
              <div className="col-md-3 " style={{ marginTop: "25px" }}>
                <div className="form-group">
                  <label></label>
                  <button className="btn-ecport-pdf" style={{width: '100%', border:'0px'}}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* ///////   for send sms */}
      {status === false ? (
        <table
          id="example"
          className="table table-striped pt-3"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Number</th>
              <th>Agent</th>
              <th>Service</th>
              <th>Lead Source</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <p className="text-center">No Followup leads Founds</p>
            </tr>
          </tbody>
        </table>
      ) : (
        <>
          {/* <button className="btn btn-sm shadow_btn btn-success" onClick={exportToPDF}>Export PDF</button>
        <button className="btn btn-sm shadow_btn btn-success" onClick={exportToExcel}>
        Export Excel
      </button> */}
          {isAdmin ? <></> : <></>}
          <DataTable
            responsive
            id="table-to-export"
            columns={columns}
            data={filterleads}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="550px"
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            subHeader
            // subHeaderComponent={
            //   <input
            //     type="text"
            //     placeholder="Search here"
            //     value={search}
            //     onChange={(e) => setsearch(e.target.value)}
            //     className="form-control w-25 "
            //   />
            // }
            customStyles={customStyles}
            selectedRows={selectedRowIds}
            onSelectedRowsChange={handleSelectedRowsChange}
            striped
          />
        </>
      )}
    </div>
  );
}
