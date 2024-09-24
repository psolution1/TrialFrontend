import React from 'react'
import { Link } from "react-router-dom";

function Sms() {
  return (
   <div className="content-wrapper content content-header pd-lft"> 
      <div className="contaoner py-2 pt-3">
          <div className="row">
            <div className="col-12 col-xl-3 col-lg-3 col-md-4">
            <div className="panel panel-bd cardbox">
            <div className="panel-body">
              <div className="statistic-box  text-center">
                  <i className="fa fa-credit-card fa-2x"></i>
                  <h4>Balance</h4>
                  <h3>  4190    </h3>
              <span className="text-danger">
                                </span>
              </div>
             
            </div>
          </div>
            </div>
            <div className="col-12 col-xl-3 col-lg-3 col-md-4">
            <div className="panel panel-bd cardbox2">
            <div className="panel-body">
                          <div className="statistic-box text-center">
                   <i className="fa fa-envelope  fa-2x"></i>
                   <h4>Message Send this Month</h4>
                  <h3>
                  0              </h3></div>
             
            </div>
          </div>
            </div>
            <div className="col-12 col-xl-3 col-lg-3 col-md-4">
            <a href=" ">
            <div className="panel panel-bd cardbox4">
              <div className="panel-body">
                
                <div className="statistic-box text-center">
                    <i className="fa fa-envelope  fa-2x"></i>
                    <h4>SMS Credit History</h4>
                    </div>
              </div>
            </div>
          </a>
            </div>
          </div>
          <form action=" " method="GET">
  <div className="col-md-12 col-xs-12">
    <div className="sms-maxwidth">
      <div className="cardses">
        <div className="card-headers">
          <div className="row">
            <lable className="col-md-4 quantity">Choose Quantity</lable>
            <div className="form-group col-md-7">
              <select className="form-control" name="sms_pack" id="sms_pack">
                <option value="">Quantity</option>
                <option data="MTE4MA==" value=" ">
                  10,000 (20 Paise)
                </option>
                <option data="NTkwMA==" value=" ">
                  25,000 (20 Paise)
                </option>
                <option data="MTE4MDA=" value=" ">
                  50,000 (20 Paise)
                </option>
                <option data="MTU5MzA=" value=" ">
                  75,000 (18 Paise)
                </option>
                <option data="MjEyNDA=" value=" ">
                  1,00,000 (18 Paise)
                </option>
                <option data="MjgzMjA=" value=" ">
                  1,50,000 (16 Paise)
                </option>
                <option data="Mzc3NjA=" value=" ">
                  2,00,000 (16 Paise)
                </option>
                <option data="OTQ0MDA=" value=" ">
                  5,00,000 (16 Paise)
                </option>
                <option data="MTc3MDAw" value=" ">
                  10,00,000 (15 Paise)
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    className="payment col-md-12"
    style={{ display: "none" }}
    id="paymentSms"
  >
    <div className="cardses">
      <div className="row">
        <div className="col-md-12">
          <div className="card-headers">
            <div className="table-responsive mob-bord">
              <p>Payable Amount</p>
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>10000SMS</td>
                    <td>Rs.2000</td>
                  </tr>
                  <tr>
                    <td>GST+(18%)</td>
                    <td>Rs.20</td>
                  </tr>
                  <tr style={{ background: "dodgerblue", color: "#fff" }}>
                    <td>Total</td>
                    <td>220</td>
                  </tr>
                </tbody>
              </table>
              <div className="row">
                <div className="col-md-12 col-xs-12 text-center">
                  <div className="form-group">
                    <button
                      className="btn btnses btn-primary"
                      style={{ textAlign: "center" }}
                    >
                      Proceed to payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-primary"
        style={{ padding: 10, display: "table", width: "100%" }}
      >
        <span id="pamt" style={{ fontWeight: 700, fontSize: "2.2rem" }} />
        <span> [ Included 18% GST ]</span>
      </div>
    </div>
  </div>
</form>

      </div>

    </div>
  )
}
export default Sms;
