import React, { useState } from "react";
import { Link } from "react-router-dom";

import { AllNewLead } from "./AllNewLead";
function NewLead() {
  const [none, setnone] = useState('none');
  const [leads, setLeadID] = useState([]);
  const advanceserch = () => {
    if (none == 'none') {
      setnone('block');
    } else {
      setnone('none');
    }

  }
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

                <div className="col-md-12 col-xs-12">
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
                  <AllNewLead sendDataToParent={handleChildData} dataFromParent={none} />
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

    </div>
  );
}


export default NewLead;
