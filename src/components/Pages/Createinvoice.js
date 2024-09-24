import React from 'react'

function Createinvoice() {
  return (
    <div className="content-wrapper content content-header pd-lft"> 
    <div className="contaoner py-2 pt-3">
        
         <div className="panel panel-bd">
         <div class="panel-heading">
            <div className="row">
          <div class="btn-group">Create Open Invoice</div>
        </div>
        </div>
        <form className="pt-3"  method="post" action="" id="invForm">
        <div className="row">
  <div className="col-sm-6 col-xs-12">
    <div className="cardses">
      <div className="row">
        <div className="col-md-12">
          <div className="address-sec">Create Invoice</div>
        </div>
        </div>
        <div className="card-headers">
        <div className="row"> 
          <div className="col-md-4 pd-top">
            <label>Client Name</label>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="hidden"
                name="invoice_id"
                defaultValue=""
                autoComplete="off"
              />
              <input
                type="hidden"
                name="invoice_gid"
                defaultValue=""
                autoComplete="off"
              />
              <input
                type="hidden"
                name="client_id"
                id="client_id"
                defaultValue=""
                autoComplete="off"
              />
              <input
                type="text"
                className="form-control ui-autocomplete-input"
                id="inv_cname"
                name="inv_cname"
                placeholder="Search by ID, Name or Company"
                required=""
                defaultValue=""
                autoComplete="off"
              />
            </div>
          </div>
          <div className="col-md-2">
            <div className="form-group">
              <button
                type="button"
                className="btn btn-info w-med m-b-5 form-control"
              >
                <a href="/Addclient">
                  <i className="fa fa-plus" />
                </a>
              </button>
            </div>
          </div>
          <div className="col-md-4 pd-top">
            <label>GST Number</label>
          </div>
          <div className="col-md-8">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="gst"
                id="gstnumber"
                placeholder="optional"
                defaultValue=""
                autoComplete="off"
              />
            </div>
          </div>
          <div className="col-md-4 pd-top">
            <label>PAN Number</label>
          </div>
          <div className="col-md-8">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="pan"
                id="pannumber"
                placeholder="optional"
                defaultValue=""
                autoComplete="off"
              />
            </div>
          </div>
          <div className="col-md-4 pd-top">
            <label>CIN</label>
          </div>
          <div className="col-md-8">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="cin"
                id="cinnumber"
                placeholder="optional"
                defaultValue=""
                autoComplete="off"
              />
            </div>
          </div>
          <div className="col-md-4 pd-top">
            <label>Payment Method</label>
          </div>
          <div className="col-md-8">
            <div className="form-group">
              <select className="form-control" name="inv_pmethod">
                <option value="">Select</option>
                <option value="online">Online</option>
                <option value="chq-deposit">Chq/Deposit</option>
                <option value="cod">Cod</option>
              </select>
            </div>
          </div>
          <div className="col-md-4 pd-top">
            <label>Order Status</label>
          </div>
          <div className="col-md-8">
            <div className="form-group">
              <select className="form-control" name="inv_ostatus">
                <option value="">Select</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="due" selected="">
                  Due
                </option>
              </select>
            </div>
          </div>
          <div className="col-md-4 pd-top">
            <label>GST</label>
          </div>
          <div className="col-md-8">
            <div className="form-group">
              <select
                className="form-control"
                name="inv_gst"
                id="inv_gst"
                onchange="gstCalc();"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="address-sec">Product Service</div>
        </div>
        <div className="service-con">
          <div className="card-headers">
          <div className="row">
            <div className="col-md-4 pd-top">
              <label>Product/Service</label>
            </div>
            <div className="col-md-8">
              <div className="form-group">
                <input
                  type="hidden"
                  name="cpid[]"
                  defaultValue=""
                  autoComplete="off"
                />
                <select
                  className="form-control invp"
                  id="invp_1"
                  onchange="get_product_d(this);"
                  name="inv_product[]"
                >
                  <option value="">Select</option>
                  <option value={0}> </option>
                  <option value={37}>Addon</option>
                  <option value={54}>Book Printing Binding</option>
                  <option value={57}>Business Loan</option>
                  
                </select>
              </div>
            </div>
            <div className="col-md-4 pd-top">
              <label>Service Name</label>
            </div>
            <div className="col-md-8">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="inv_sname[]"
                  id="invs_1"
                  placeholder="Service Name"
                  required=""
                  onkeyup="reflectS(this)"
                  defaultValue=""
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="col-md-4 pd-top">
              <label>Billing Cycle</label>
            </div>
            <div className="col-md-8">
              <div className="form-group">
                <select
                  className="form-control"
                  id="invb_1"
                  name="inv_bcycle[]"
                >
                  <option value="">Select</option>
                  <option value="onetime">One Time</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="semesterly">Semesterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
            <div className="col-md-4 pd-top">
              <label>Price override</label>
            </div>
            <div className="col-md-8">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onkeyup="overRideP(this);"
                  id="invO_1"
                  name="inv_poverride[]"
                  placeholder="Price"
                  defaultValue=""
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="col-md-4 pd-top">
              <label>Renewal Override</label>
            </div>
            <div className="col-md-8">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="invRO_1"
                  name="inv_roverride[]"
                  placeholder="Price"
                  defaultValue=""
                  autoComplete="off"
                />
              </div>
            </div>
            </div>
            <div className="col-md-12">
        <div className="btn-group">
          <a
            className="btn btn-primary"
            href="javascript:;"
            onclick="addService();"
          >
            <i className="fa fa-plus-circle" /> Add Another{" "}
          </a>
        </div>
      </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
  <div className="col-sm-6 col-xs-12">
    <div className="cardses">
      <div className="row">
        <div className="col-md-12">
          <div className="address-sec">Order Summery</div>
        </div>
        <div className="card-headers invoice-bord">
          <div className="headding_ex">
            <table className="table" id="plistInv"></table>
            <table className="table ">
              <tbody>
                <tr id="disRow" style={{ display: "none" }}>
                  <td className="border-linenone">Discount</td>
                  <td
                    className="border-linenone"
                    style={{ textAlign: "right" }}
                  >
                    Rs. <span id="discount" />/
                  </td>
                </tr>
                <tr className="doted-border">
                  <td className="border-linenone">Sub Total</td>
                  <td
                    className="border-linenone"
                    style={{ textAlign: "right" }}
                  >
                    Rs. <span id="subtotal">0.00</span>/
                  </td>
                </tr>
                <tr
                  className="bg-color"
                  id="gstRow"
                  style={{ display: "none" }}
                >
                  <td className="border-linenone">GST 18%</td>
                  <td
                    className="border-linenone"
                    style={{ textAlign: "right" }}
                  >
                    Rs. <span id="gsttotal" />/
                  </td>
                </tr>
                <tr className="toatal-bg">
                  <td className="border-linenone">
                    <h2>Total</h2>
                  </td>
                  <td
                    className="border-linenone"
                    style={{ textAlign: "right" }}
                  >
                    <h2>
                      Rs. <span id="totalP">0.00</span>/
                    </h2>
                  </td>
                </tr>
                <tr className="recurring">
                  <td className="border-linenone">Recurring</td>
                  <td
                    className="border-linenone"
                    style={{ textAlign: "right" }}
                  >
                    Rs. <span id="recurring">0.00</span>/
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="row invoice-top">
              <div className="col-md-8 col-xs-12">
                <div className="form-group">
                  <input
                    type="text"
                    name="coupon"
                    id="coupon"
                    placeholder="Enter discount coupon..."
                    className="form-control"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="col-md-4 col-xs-12">
                <div className="form-group">
                  <button
                    type="button"
                    id="apc"
                    className="btn btnes btn-block btn-info form-control"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
            <div className="border-btnss" />
            <div className="row">
               <div className="col-md-6 col-xs-12">
                  <div className="form-group">
                    <input
                      type="text"
                      name="inv_create_date"
                      id="inv_create_date"
                      defaultValue=""
                      placeholder="Create date"
                      className="form-control"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-xs-12">
                  <div className="form-group">
                    <input
                      type="text"
                      name="inv_due_date"
                      id="inv_due_date"
                      placeholder="Due date"
                      className="form-control"
                      defaultValue=""
                      autoComplete="off"
                    />
                  </div>
                </div>
             
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 col-xs-10">
                {" "}
                <div className="form-group">Send email</div>
              </div>
              <div className="col-md-2 col-xs-2">
                {" "}
                <div className="form-group">
                  <input
                    type="checkbox"
                    name="send_mail"
                    className=" "
                    autoComplete="off"
                  />
                </div>
              </div>
           
          </div>
          <div className="row">
              <div className="col-md-10 col-xs-10">
                {" "}
                <div className="form-group">SMS Notification</div>
              </div>
              <div className="col-md-2 col-xs-2">
                <div className="form-group">
                  <input
                    type="checkbox"
                    name="send_sms"
                    className=" "
                    autoComplete="off"
                  />
                </div>
              </div>
            
          </div>
          <div className="btn-group order-submit">
            <button className="btn btn-primary" type="submit">
              Submit Order <i className="fa fa-angle-double-right" />
            </button>
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
  )
};
export default Createinvoice;