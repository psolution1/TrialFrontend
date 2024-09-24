import React from 'react'
import { Link } from "react-router-dom";

function Report() {
  return (
   <div className="content-wrapper content content-header pd-lft"> 
      <div className="contaoner py-2 pt-3">
      <div className="row">
  <div className="col-md-3 col-sm-6"> 
    <Link to="/Incomereport">
      <div className="mt-icon-box-wraper  p-a30 center m-b30 box-shadow bg-colors">
        <div className="mt-icon-box-sm inline-icon text-primary  m-b20 radius   scale-in-center bg-moving">
          <span className="icon-cell text-secondry">
          
            <i className="fa fa-money fa-2x" />
          </span>
        </div>
        <div className="icon-content">
          <h4 className="mt-tilte text-uppercase font-weight-600 m-b20">
            Employees Income Report
          </h4>
        </div>
      </div>
    </Link>
  </div>

  <div className="col-md-3 col-sm-6 d-none"> 
    <Link to="/Employeereport d-none">
      <div className="mt-icon-box-wraper  p-a30 center m-b30 box-shadow bg-colors">
        <div className="mt-icon-box-sm inline-icon text-primary  m-b20 radius   scale-in-center bg-moving">
          <span className="icon-cell text-secondry">
          
            <i className="fa fa-money fa-2x" />
          </span>
        </div>
        <div className="icon-content">
          <h4 className="mt-tilte text-uppercase font-weight-600 m-b20">
             Employee Reports  
          </h4>
        </div>
      </div>
    </Link>
  </div>

  <div className="col-md-3 col-sm-6"> 
    <Link to="/Productservicereport ">
      <div className="mt-icon-box-wraper  p-a30 center m-b30 box-shadow bg-colors">
        <div className="mt-icon-box-sm inline-icon text-primary  m-b20 radius   scale-in-center bg-moving">
          <span className="icon-cell text-secondry">
          
            <i className="fa fa-money fa-2x" />
          </span>
        </div>
        <div className="icon-content">
          <h4 className="mt-tilte text-uppercase font-weight-600 m-b20">
             Product Service Report
          </h4>
        </div>
      </div>
    </Link>
  </div>

  <div className="col-md-3 col-sm-6 "> 
    <Link to="/Callreport">
      <div className="mt-icon-box-wraper  p-a30 center m-b30 box-shadow bg-colors">
        <div className="mt-icon-box-sm inline-icon text-primary  m-b20 radius   scale-in-center bg-moving">
          <span className="icon-cell text-secondry">
          
            <i className="fa fa-money fa-2x" />
          </span>
        </div>
        <div className="icon-content">
          <h4 className="mt-tilte text-uppercase font-weight-600 m-b20">
            Call Report
          </h4>
        </div>
      </div>
    </Link>
  </div>

  <div className="col-md-3 col-sm-6"> 
    <Link to="/leadsourcereport">
      <div className="mt-icon-box-wraper  p-a30 center m-b30 box-shadow bg-colors">
        <div className="mt-icon-box-sm inline-icon text-primary  m-b20 radius   scale-in-center bg-moving">
          <span className="icon-cell text-secondry">
          
            <i className="fa fa-money fa-2x" />
          </span>
        </div>
        <div className="icon-content">
          <h4 className="mt-tilte text-uppercase font-weight-600 m-b20">
            Lead Source Report
          </h4>
        </div>
      </div>
    </Link>
  </div>
 
</div>


      </div>

    </div>
  )
}
export default Report;
