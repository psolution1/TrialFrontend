import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Addlead from "./components/Pages/Addlead";
import Leads from "./components/Pages/Leads";
import Followupleads from "./components/Pages/Followupleads";
import Forwardleads from "./components/Pages/Forwardleads";
import Clients from "./components/Pages/Clients";
import Setting from "./components/Pages/Setting";
import Sms from "./components/Pages/Sms";
import Report from "./components/Pages/Report";
import Createinvoice from "./components/Pages/Createinvoice";
import Addclient from "./components/Pages/Addclient";
import Listinvoice from "./components/Pages/Listinvoice";
import Productservices from "./components/Pages/Productservices";
import ManageEmployee from "./components/Pages/ManageEmployee";
import Manageexcludenos from "./components/Pages/Manageexcludenos";
import ManageUser from "./components/Pages/ManageUser";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Followupage from "./components/Pages/Followupage";
import Home1 from "./components/Home1";
import EmployeeReport from "./components/Pages/EmployeeReport";
import CallLogDetails from "./components/Pages/CallLogDetails";
import MultipleForm from "./components/Licence/MultipleForm";
import NotFound from "./components/Pages/NotFound";
import Incomereport from "./components/Pages/Incomereport";
import ImportLead from "./components/Pages/ImportLead";
import { BreadcrumbProvider } from "./components/Pages/BreadcrumbContext";
import Employeereporttt from "./components/Pages/Employeereporttt";
import Productservicereport from "./components/Pages/Productservicereport";
import LeadSouceReport from "./components/Pages/LeadSouceReport";
import Callreport from "./components/Pages/Callreport";
import BulkWhatsAppSMS from "./components/Pages/BulkWhatsAppSMS";
import TransactionalSMS from "./components/Pages/TransactionalSMS";
import GroupSms from "./components/Pages/GroupSms";
import GroupSmsWtsp from "./components/Pages/GroupSmsWtsp";
import ActiveLeadsWtsp from "./components/Pages/ActiveLeadsWtsp";
import AllsmsleadsWtsp from "./components/Pages/AllsmsleadsWtsp";
import ActiveLeads from "./components/Pages/ActiveLeads";
import Allsmsleads from "./components/Pages/Allsmsleads";
import UploadData from "./components/Pages/UploadData";
import Buysms from "./components/Pages/Buysms";
import BuysmsWtsp from "./components/Pages/BuysmsWtsp";
import History from "./components/Pages/History";
import HistoryWtsp from "./components/Pages/HistoryWtsp";
import NewLead from "./components/Pages/NewLead";
import UploadDataDetails from "./components/Pages/UploadDataDetails";
import Housingapi from "./components/Pages/Housingapi";
import ImpSchedule from "./components/Pages/ImpSchedule";
import BusinessWA from "./components/Pages/BusinessWA";
import Importedlead from "./components/Pages/Importedlead";
import Newloginpage from "./components/Pages/Newloginpage";
import Login from "./components/Login";
import UploadContactsWhatsapp from "./components/Pages/UploadContactsWhatsapp";
import UploadContactsSms from "./components/Pages/UploadContactsSms";
import { isValidToken } from "./utils/util";
import HotLeads from "./components/Pages/HotLead";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      try {
        const token = localStorage.getItem("token");
        setIsLogined(isValidToken(token));
      } catch (error) {
        console.error("Error reading token from localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  if (isLoading) return <></>;

  return (
    <BrowserRouter>
      <BreadcrumbProvider>
        <div className="wrapper">
          {isLogined && <Header />}

          <Routes>
            {isLogined ? (
              <>
                <Route path="/login" element={<Home />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/" element={<Home />}></Route>
                <Route
                  path="/employeesreport"
                  element={<EmployeeReport />}
                ></Route>
                <Route path="*" element={<NotFound />} />
                <Route
                  path="/call_log_details/:id"
                  element={<CallLogDetails />}
                ></Route>
                <Route path="/Addlead" element={<Addlead />}></Route>
                <Route path="/Leads" element={<Leads />}></Route>
                <Route path="/hotlead" element={<HotLeads />}></Route>

                <Route path="/importedlead" element={<Importedlead />}></Route>

                <Route path="/GroupSms" element={<GroupSms />}></Route>

                <Route path="/GroupSmsWtsp" element={<GroupSmsWtsp />}></Route>

                <Route path="/ActiveLeads" element={<ActiveLeads />}></Route>
                <Route path="/Allsmsleads" element={<Allsmsleads />}></Route>

                <Route
                  path="/ActiveLeadsWtsp"
                  element={<ActiveLeadsWtsp />}
                ></Route>
                <Route
                  path="/AllsmsleadsWtsp"
                  element={<AllsmsleadsWtsp />}
                ></Route>

                <Route path="/UploadContent" element={<UploadData />}></Route>
                <Route path="/BusinessWA" element={<BusinessWA />}></Route>
                <Route
                  path="/UploadContactsWhatsapp"
                  element={<UploadContactsWhatsapp />}
                ></Route>
                <Route
                  path="/UploadContactsSms"
                  element={<UploadContactsSms />}
                ></Route>
                <Route
                  path="/UploadContent/:id"
                  element={<UploadDataDetails />}
                ></Route>
                <Route
                  path="/newloginpage/:id"
                  element={<Newloginpage />}
                ></Route>

                <Route path="/buysms" element={<Buysms />}></Route>
                <Route path="/BuysmsWtsp" element={<BuysmsWtsp />}></Route>

                <Route path="/History" element={<History />}></Route>
                <Route path="/HistoryWtsp" element={<HistoryWtsp />}></Route>

                <Route path="/newlead" element={<NewLead />}></Route>

                <Route path="/housingapi" element={<Housingapi />}></Route>
                <Route path="/import-lead" element={<ImportLead />}></Route>
                <Route
                  path="/Followupleads"
                  element={<Followupleads />}
                ></Route>
                <Route path="/Forwardleads" element={<Forwardleads />}></Route>
                <Route path="/Clients" element={<Clients />}></Route>
                <Route
                  path="/Productservices"
                  element={<Productservices />}
                ></Route>
                <Route
                  path="/ManageEmployee"
                  element={<ManageEmployee />}
                ></Route>
                <Route
                  path="/Manageexcludenos"
                  element={<Manageexcludenos />}
                ></Route>
                <Route path="/ManageUser" element={<ManageUser />}></Route>
                <Route path="/Setting" element={<Setting />}></Route>
                <Route path="/Sms" element={<Sms />}></Route>
                <Route path="/Report" element={<Report />}></Route>

                <Route path="/Incomereport" element={<Incomereport />}></Route>
                <Route
                  path="/Employeereport"
                  element={<Employeereporttt />}
                ></Route>
                <Route
                  path="/Productservicereport"
                  element={<Productservicereport />}
                ></Route>
                <Route path="/Callreport" element={<Callreport />}></Route>
                <Route
                  path="/leadsourcereport"
                  element={<LeadSouceReport />}
                ></Route>

                <Route
                  path="/transactionalSms"
                  element={<TransactionalSMS />}
                ></Route>
                <Route
                  path="/BulkWhatsAppSMS"
                  element={<BulkWhatsAppSMS />}
                ></Route>

                <Route path="/Listinvoice" element={<Listinvoice />}></Route>
                <Route
                  path="/Createinvoice"
                  element={<Createinvoice />}
                ></Route>
                <Route path="/Addclient" element={<Addclient />}></Route>
                <Route path="/MultipleForm" element={<MultipleForm />}></Route>
                <Route
                  path="/followupleads/:id"
                  element={<Followupage />}
                ></Route>
                <Route
                  path="/ImpSchedule/:id"
                  element={<ImpSchedule />}
                ></Route>
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />}></Route>
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            )}
          </Routes>

          {isLogined && <SideNav />}
          {isLogined && <Footer />}
        </div>
      </BreadcrumbProvider>
    </BrowserRouter>
  );
}

export default App;
