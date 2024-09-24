import React, { useState } from "react";
import { Link } from "react-router-dom";
import AllFollowAllsmsleadsForWtsp from "./AllFollowAllsmsleadsForWtsp";
function AllsmsleadsWtsp() {
  const [none, setnone] = useState('block');
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
                <div className="col-md-5 col-xs-12 ">
                  <div className="row">
                    <div className="col-md-4 col-sm-4 col-xs-6">
                      <div className="btn-group">
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4 mobil-nns col-xs-4 d-none">
                      <div className="btn-group btn-groupese">
                        <button className="btn btnes exports" onClick={advanceserch}>
                          <i class="fa fa-search" aria-hidden="true"></i>
                          &nbsp;  Advance </button>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-6">

                    </div>
                  </div>
                </div>

              </div>


              <div className="pt-3">
                <div className="container pl-0">
                  <AllFollowAllsmsleadsForWtsp sendDataToParent={handleChildData} dataFromParent={none} />
                </div>

              </div>




            </div>
          </div>
        </section>
      </div>

    </div>
  );
}


export default AllsmsleadsWtsp;
