import React from 'react'
import { Link } from "react-router-dom";

function Listinvoice() {
  return (
   <div className="content-wrapper content content-header pd-lft"> 
      <div className="contaoner py-2 pt-3">
     
  
    <div className="panel panel-bd lobidrag lobipanel">
      <div className="panel-heading">
      <div className="row">
        <div className="col-md-6 col-xs-6">
          <div className="btn-group">
            <p>List Invoice </p>
          </div>
        </div>
        <div className="col-md-6 col-xs-6">
          <div className="reset-buttons">
            <a href=" " className="btn btnes exports">
              Create Invoice
            </a>
          </div>
        </div>
        </div>
      </div>
      <div className="panel-body">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-xs-12">
          <div className="cards">
            <div className="card-headers">
              <div className="searchbuy">
                <button type="button" id="show-hidden-menu" className="btn btnes exports">
                  <i className="fa fa-search" aria-hidden="true" />
                  &nbsp; Advance
                </button>
              </div>
              <form
                action=""
                method="GET"
                name="searchIForm"
                
                className="hidden-menu"
                style={{ display: "none" }}
              >
             
                <div className="serach-lists pt-3">
                <div className="row">
                  <div className="col-md-2">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="client_name"
                        placeholder="Client Name"
                        defaultValue=""
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                        <select className="form-control" name="service">
                        <option value="">Service</option>
                        <option value={37}>Addon</option>
                        <option value={54}>Book Printing Binding</option>
                        <option value={57}>Business Loan</option>
                        <option value={48}>Cloud Hosting</option>
                        </select>
                    </div>
                 </div>
                 <div class="col-md-2">
                  <div class="form-group">
                    <select class="form-control" name="status" id="inv_status" onchange="getInvDateBox()">
                      <option value="">Status</option>
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="due">Due</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group">
                        <select className="form-control" name="pay_method">
                        <option value="">Payment Method</option>
                        <option value="online">Online</option>
                        <option value="chq-deposit">Chq/Deposit</option>
                        <option value="cod">Cod</option>
                        </select>
                    </div>
                    </div>
                    <div className="col-md-2" style={{ padding: "1px 5px" }}>
                            <div className="form-group">
                                <select className="form-control" name="is_recurring">
                                <option value="">Select</option>
                                <option value="yes">Client Invoice</option>
                                <option value="no">Lead Invoice</option>
                                </select>
                            </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <button type="submit" className="btn btnss btn-success form-control">
                            Search
                            </button>
                        </div>
                     </div>


                 </div>

                  
                 
                   
                </div>
              </form>
              <table className="table table-bordered table-hover" id="example">
  <thead>
    <tr>
      <th className="list-check">
        <input type="checkbox" className="check" />
      </th>
      <th>Name</th>
      <th>Type</th>
      <th>Date</th>
      <th>Service</th>
      <th>Amount</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="list-check">
        <input type="checkbox" className="checkme" defaultValue="NTg=" />
      </td>
      <td>Abdul Nazir</td>
      <td>Lead Invoice</td>
      <td>27-01-2023</td>
      <td>Digital Marketing</td>
      <td><span className="text-success">Rs. 9440</span>/<span className="text-danger">Rs. 0</span></td>
      <td><span className="label label-success">Paid</span></td>
      
      <td>
        <a href=" " className="btn btn-info btn-xs">
          {" "}
          <i className="fa fa-pencil-square-o" />
        </a>
        <a href=" " className="btn btn-danger btn-xs">
          <i className="fa fa-trash" />
        </a>
      </td>
    </tr>
    <tr>
      <td className="list-check">
        <input type="checkbox" className="checkme" defaultValue="NTg=" />
      </td>
      <td>Abdul Nazir</td>
      <td>Lead Invoice</td>
      <td>27-01-2023</td>
      <td>Digital Marketing</td>
      <td><span className="text-success">Rs. 9440</span>/<span className="text-danger">Rs. 0</span></td>
      <td><span className="label label-success">Paid</span></td>
      
      <td>
        <a href=" " className="btn btn-info btn-xs">
          {" "}
          <i className="fa fa-pencil-square-o" />
        </a>
        <a href=" " className="btn btn-danger btn-xs">
          <i className="fa fa-trash" />
        </a>
      </td>
    </tr>
    <tr>
      <td className="list-check">
        <input type="checkbox" className="checkme" defaultValue="NTg=" />
      </td>
      <td>Abdul Nazir</td>
      <td>Lead Invoice</td>
      <td>27-01-2023</td>
      <td>Digital Marketing</td>
      <td><span className="text-success">Rs. 9440</span>/<span className="text-danger">Rs. 0</span></td>
      <td><span className="label label-success">Paid</span></td>
      
      <td>
        <a href=" " className="btn btn-info btn-xs">
          {" "}
          <i className="fa fa-pencil-square-o" />
        </a>
        <a href=" " className="btn btn-danger btn-xs">
          <i className="fa fa-trash" />
        </a>
      </td>
    </tr>
    <tr>
      <td className="list-check">
        <input type="checkbox" className="checkme" defaultValue="NTg=" />
      </td>
      <td>Abdul Nazir</td>
      <td>Lead Invoice</td>
      <td>27-01-2023</td>
      <td>Digital Marketing</td>
      <td><span className="text-success">Rs. 9440</span>/<span className="text-danger">Rs. 0</span></td>
      <td><span className="label label-success">Paid</span></td>
      
      <td>
        <a href=" " className="btn btn-info btn-xs">
          {" "}
          <i className="fa fa-pencil-square-o" />
        </a>
        <a href=" " className="btn btn-danger btn-xs">
          <i className="fa fa-trash" />
        </a>
      </td>
    </tr>
    <tr>
      <td className="list-check">
        <input type="checkbox" className="checkme" defaultValue="NTg=" />
      </td>
      <td>Abdul Nazir</td>
      <td>Lead Invoice</td>
      <td>27-01-2023</td>
      <td>Digital Marketing</td>
      <td><span className="text-success">Rs. 9440</span>/<span className="text-danger">Rs. 0</span></td>
      <td><span className="label label-success">Paid</span></td>
      
      <td>
        <a href=" " className="btn btn-info btn-xs">
          {" "}
          <i className="fa fa-pencil-square-o" />
        </a>
        <a href=" " className="btn btn-danger btn-xs">
          <i className="fa fa-trash" />
        </a>
      </td>
    </tr>
    <tr>
      <td className="list-check">
        <input type="checkbox" className="checkme" defaultValue="NTg=" />
      </td>
      <td>Abdul Nazir</td>
      <td>Lead Invoice</td>
      <td>27-01-2023</td>
      <td>Digital Marketing</td>
      <td><span className="text-success">Rs. 9440</span>/<span className="text-danger">Rs. 0</span></td>
      <td><span className="label label-success">Paid</span></td>
      
      <td>
        <a href=" " className="btn btn-info btn-xs">
          {" "}
          <i className="fa fa-pencil-square-o" />
        </a>
        <a href=" " className="btn btn-danger btn-xs">
          <i className="fa fa-trash" />
        </a>
      </td>
    </tr>
    <tr>
      <td className="list-check">
        <input type="checkbox" className="checkme" defaultValue="NTg=" />
      </td>
      <td>Abdul Nazir</td>
      <td>Lead Invoice</td>
      <td>27-01-2023</td>
      <td>Digital Marketing</td>
      <td><span className="text-success">Rs. 9440</span>/<span className="text-danger">Rs. 0</span></td>
      <td><span className="label label-success">Paid</span></td>
      
      <td>
        <a href=" " className="btn btn-info btn-xs">
          {" "}
          <i className="fa fa-pencil-square-o" />
        </a>
        <a href=" " className="btn btn-danger btn-xs">
          <i className="fa fa-trash" />
        </a>
      </td>
    </tr>
    
  </tbody>
</table>

            </div>
          </div>
        </div>
      </div>
    </div>
  
</div>

        
      </div>

    </div>
  )
}
export default Listinvoice;
