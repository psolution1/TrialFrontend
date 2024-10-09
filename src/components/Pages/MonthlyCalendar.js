// import React, { useEffect, useState } from 'react';
// import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import axios from 'axios';
// import Modal from './Modal';
// import { Link } from 'react-router-dom';

// const MyCalendar = () => {
//   const apiUrl = process.env.REACT_APP_API_URL;
//   const DBuUrl = process.env.REACT_APP_DB_URL;
//   const [data, setData] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedEvents, setSelectedEvents] = useState([]);
//   const localizer = momentLocalizer(moment);

//   const getCalanderData = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/get_calander_data`, {
//         headers: {
//           "Content-Type": "application/json",
//           "mongodb-url": DBuUrl,
//           Authorization: "Bearer " + localStorage.getItem("token"),

//         }
//       });
//       setData(response?.data?.lead);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const GetCalandarDataByTeamLeader = async () => {
//     try {
//       const response = await axios.post(
//         `${apiUrl}/GetCalandarDataByTeamLeader`, {
//           user_id: localStorage.getItem("user_id"),
//       }, {
//         headers: {
//           "Content-Type": "application/json",
//           "mongodb-url": DBuUrl,
//           Authorization: "Bearer " + localStorage.getItem("token"),

//         }
//       });
//       setData(response?.data?.lead);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const GetCalandarDataByUser = async () => {
//     try {
//       const response = await axios.post(
//         `${apiUrl}/GetCalandarDataByUser`, {
//           user_id: localStorage.getItem("user_id"),
//       }, {
//         headers: {
//           "Content-Type": "application/json",
//           "mongodb-url": DBuUrl,
//Authorization: "Bearer " + localStorage.getItem("token"),

//         }
//       });
//       setData(response?.data?.lead);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (localStorage.getItem("role") === "admin") {
//       getCalanderData();
//     }
//     if (localStorage.getItem("role") === "TeamLeader") {
//       GetCalandarDataByTeamLeader();
//     }
//     if (localStorage.getItem("role") === "user") {
//       GetCalandarDataByUser();
//     }
//   }, [localStorage.getItem("role")]);

//   const events = data.map((lead) => ({
//     title: (
//       <React.Fragment>
//         {lead.massage_of_calander} --Client
//         <Link to={`/followupleads/${lead._id}`}> : {lead.full_name}  </Link>
//         and Agent : <Link to={`/followupleads/${lead._id}`}>{lead?.agent_details['0']?.agent_name} </Link>
//       </React.Fragment>
//     ),
//     start: new Date(lead.followup_date),
//     end: new Date(lead.followup_date),
//     original: lead
//   }));

//   const handleEventSelect = (event) => {
//     const selectedDate = moment(event.start).format('YYYY-MM-DD');
//     const eventsOnSelectedDate = events.filter(e => moment(e.start).format('YYYY-MM-DD') === selectedDate);
//     setSelectedEvents(eventsOnSelectedDate);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const customEventPropGetter = (event) => {
//     return {
//       className: 'custom-event',
//     };
//   };

//   const AgendaTable = ({ events }) => (
//     <table className="rbc-agenda-table">
//       <thead>
//         <tr>
//           <th className="rbc-header">Date</th>
//           <th className="rbc-header">Time</th>
//           <th className="rbc-header">Comment</th>
//         </tr>
//       </thead>
//       <tbody>
//         {events.map((event, index) => (
//           <tr key={index}>
//             <td>{moment(event.start).format('YYYY-MM-DD')}</td>
//             <td>{moment(event.start).format('HH:mm')}</td>
//             <td>{event.title}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );

//   return (
//     <div>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         views={['month', 'agenda']}
//         style={{ height: 400 }}
//         components={{ agenda: { table: AgendaTable } }}
//         eventPropGetter={customEventPropGetter}
//         onSelectEvent={handleEventSelect}
//       />
//       <Modal show={showModal} onClose={closeModal} events={selectedEvents} />
//     </div>
//   );
// };

// export default MyCalendar;

import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const MyCalendar = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const DBuUrl = process.env.REACT_APP_DB_URL;
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const localizer = momentLocalizer(moment);

  const getCalanderData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/get_calander_data`, {
        headers: {
          "Content-Type": "application/json",
          "mongodb-url": DBuUrl,
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setData(response?.data?.lead);
    } catch (error) {
      console.log(error);
    }
  };

  const GetCalandarDataByTeamLeader = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/GetCalandarDataByTeamLeader`,
        {
          user_id: localStorage.getItem("user_id"),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "mongodb-url": DBuUrl,
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setData(response?.data?.lead);
    } catch (error) {
      console.log(error);
    }
  };

  const GetCalandarDataByUser = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/GetCalandarDataByUser`,
        {
          user_id: localStorage.getItem("user_id"),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "mongodb-url": DBuUrl,
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setData(response?.data?.lead);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      getCalanderData();
    }
    if (localStorage.getItem("role") === "TeamLeader") {
      GetCalandarDataByTeamLeader();
    }
    if (localStorage.getItem("role") === "user") {
      GetCalandarDataByUser();
    }
  }, [localStorage.getItem("role")]);

  const events = data.map((lead) => ({
    title: (
      <React.Fragment>
        {lead.massage_of_calander} --Client
        <Link to={`/followupleads/${lead._id}`}> : {lead.full_name} </Link>
        and Agent :{" "}
        <Link to={`/followupleads/${lead._id}`}>
          {lead?.agent_details["0"]?.agent_name}{" "}
        </Link>
      </React.Fragment>
    ),
    start: new Date(lead.followup_date),
    end: new Date(lead.followup_date),
    original: lead,
  }));

  const handleEventSelect = (event) => {
    const selectedDate = moment(event.start).format("YYYY-MM-DD");
    const eventsOnSelectedDate = events.filter(
      (e) => moment(e.start).format("YYYY-MM-DD") === selectedDate
    );
    setSelectedEvents(eventsOnSelectedDate);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Function to apply custom styling based on the follow-up date
  const customEventPropGetter = (event) => {
    const currentDate = new Date();
    const eventDate = new Date(event.start);

    // Compare event date with the current date
    if (eventDate < currentDate) {
      return {
        style: { backgroundColor: "red", color: "white" }, // Past event (red background)
      };
    } else {
      return {
        style: { backgroundColor: "green", color: "white" }, // Future event (green background)
      };
    }
  };

  const AgendaTable = ({ events }) => (
    <table className="rbc-agenda-table">
      <thead>
        <tr>
          <th className="rbc-header">Date</th>
          <th className="rbc-header">Time</th>
          <th className="rbc-header">Comment</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event, index) => (
          <tr key={index}>
            <td>{moment(event.start).format("YYYY-MM-DD")}</td>
            <td>{moment(event.start).format("HH:mm")}</td>
            <td>{event.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "agenda"]}
        style={{ height: 400 }}
        components={{ agenda: { table: AgendaTable } }}
        eventPropGetter={customEventPropGetter}
        onSelectEvent={handleEventSelect}
      />
      <Modal show={showModal} onClose={closeModal} events={selectedEvents} />
    </div>
  );
};

export default MyCalendar;
