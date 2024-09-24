import React  from 'react'
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";


function GroupSms() {
  return (
    <div>
      <div className="content-wrapper">
        <section className="content content-header  py-5">
          <div className="container">
            <div className="panel panel-bd lobidrag lobipanel">
             <div className="panel-body bg-white ">
             <div className="row">
                <div className="col-xl-4 col-md-4" >
                    <Link to="/ActiveLeads">
                         <div className="sms_headings">
                         <div className="card card-animate">
                          <div className="card-body bd_bottom2">
                              <div className="align-items-center">
                              <div className="text-center overflow-hidden">
                              <div className="counter-icon bg-primary-gradient box-shadow-primary rounded-circle ms-auto mb-0"> 
                              <i class="fa fa-comment mb-5 "></i> </div>
                                  <h5 className="mb-2 noSms ">
                                   Active Leads
                                    </h5>
                                </div>
                              </div>
                       
                          </div>
                         </div>
                       </div>
                       </Link> 
                    </div>
                    <div className="col-xl-4 col-md-4" >
                    <Link to="/Allsmsleads">
                         <div className="sms_headings">
                         <div className="card card-animate">
                          <div className="card-body bd_bottom1">
                              <div className="align-items-center">
                              <div className="text-center overflow-hidden">
                              <div className="counter-icon bg-primary-gradient box-shadow-primary rounded-circle ms-auto mb-0"> 
                              <i class="fa fa-user mb-5" aria-hidden="true"></i> </div>
                                
                                   <h5 className="mb-2 noSms">
                                     All Lead
                                    </h5>
                                </div>
                              </div>
                       
                          </div>
                         </div>
                       </div>
                       </Link> 
                    </div>
                    <div className="col-xl-4 col-md-4" >
                    <Link to="/UploadContactsSms">
                         <div className="sms_headings">
                         <div className="card card-animate">
                          <div className="card-body bd_bottom2">
                              <div className="align-items-center">
                              <div className="text-center overflow-hidden">
                              <div className="counter-icon bg-primary-gradient box-shadow-primary rounded-circle ms-auto mb-0"> 
                              <i class="fa fa-file-code-o mb-5" aria-hidden="true"></i></div>
                                 <h5 className="mb-2 noSms">
                                     Uploaded Contact's
                                    </h5>
                                </div>
                              </div>
                       
                          </div>
                         </div>
                       </div>
                       </Link> 
                    </div>
                     
                 </div>
                  
              
            
             
                
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
export default GroupSms;
