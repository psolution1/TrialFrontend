import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

function BuysmsWtsp() {
  const [packages,setpackage]=useState([])
  const apiUrl = process.env.REACT_APP_LIENCE_URL;
  const DBuUrl = process.env.REACT_APP_DB_URL; 

   const getSMSPackage=async()=>{
      try {
          const responce=await axios.get(`${apiUrl}/getAllwtsppack`,{
            headers:{
              "Content-Type":"application/json",
              "mongodb-url":DBuUrl,
            }
          });
          setpackage(responce?.data?.SmsPack1);
         
      } catch (error) {
        console.log(error);
      }
   }
  useEffect(()=>{
    getSMSPackage();
  },[])

  const [toggle, setToggle] = useState(0)
   const updateToggle=async(id)=> {
    setToggle(id)
  }
  return (
    <div className="content-wrapper content content-header pd-lft">
      <div className="container py-2 pt-3">
        <div className="row">
          {
            packages?.map((packagess,index)=>{  
               const TotalPrice=(packagess?.noofsms*packagess?.price)/100;
              return(<>
              <div className="col-xl-3 col-md-6 " onClick={() => updateToggle(index)}>
              <div className={`sms_heading ${toggle === index ? 'plan_active' : ''}`}>
                   <div className="card card-animate">
                  <div className="card-body bd_bottom">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 overflow-hidden">
                        <h6 className="mb-2 noSms">
                          No. SMS
                        </h6>
                      </div>
                      <div className="flex-shrink-0">
                        <h6 className="mb-2 noSms">
                         {packagess?.noofsms}
                        </h6>
                      </div>
                    </div>
                    <div className="d-flex b0rder_bottom align-items-center">
                      <div className="flex-grow-1 overflow-hidden">
                        <h6 className="mb-2 noSms">
                          Price
                        </h6>
                      </div>
                      <div className="flex-shrink-0">
                        <h6 className="mb-2 noSms">
                        {packagess?.price}/SMS
                        </h6>
                      </div>
                    </div>
                    <div className="d-flex pt-2 align-items-center">
                      <div className="flex-grow-1 overflow-hidden">
                        <h6 className="noSms1">
                          Total
                        </h6>
                      </div>
                      <div className="flex-shrink-0">
                        <h6 className=" noSms1">
                          {TotalPrice}
                        </h6>
                      </div>
                    </div>
                    <div className="pt-3 text-center"> <div className="button-butNow">Select Plan</div></div>
                  </div>
  
                </div>
  
              </div>
              </div>
            </>)
            })
          }
          

        </div>

        {
          packages?.map((pack,index)=>{
            const subPrice=(pack?.noofsms*pack?.price)/100;
            const gst=((subPrice*18)/100);
            const total=parseInt(subPrice)+parseInt(gst);
            return(<>
            <div className={toggle == index ? "show-content" : "content_tabs"}>
          <div className="pt-5">
            <div className="">
              <div className="container">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive-sm">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <td>{pack.noofsms} @ {pack.price}/SMS</td>
                            <td className="right">Rs. {subPrice}</td>
                          </tr>
                          <tr>
                            <td className="right">18% GST</td>
                            <td className="right">Rs. {gst}</td>
                          </tr>
                        </thead>
                        <thead>
                          <tr>
                            <th className="right">Subtotal</th>
                            <th className="right">Rs. {total}</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
            </>)
          })
        }
        

        {/* <div className={toggle === 2 ? "show-content" : "content_tabs"}>
          <div className="pt-5">
            <div className="">
              <div className="container">
                <div className="card">

                  <div className="card-body">

                    <div className="table-responsive-sm">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <td>50000 @ 15/SMS</td>
                            <td className="right">Rs. 5000</td>
                          </tr>
                          <tr>
                            <td className="right">18% GST</td>
                            <td className="right">Rs. 7500</td>
                          </tr>
                        </thead>
                        <thead>
                          <tr>
                            <th className="right">Subtotal</th>
                            <th className="right">Rs. 10030</th>
                          </tr>
                        </thead>
                      </table>
                    </div>


                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className={toggle === 3 ? "show-content" : "content_tabs"}>
          <div className="pt-5">
            <div className="">
              <div className="container">
                <div className="card">

                  <div className="card-body">

                    <div className="table-responsive-sm">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <td>100000 @ 18/SMS</td>
                            <td className="right">Rs. 8500</td>
                          </tr>
                          <tr>
                            <td className="right">18% GST</td>
                            <td className="right">Rs. 1530</td>
                          </tr>
                        </thead>
                        <thead>
                          <tr>
                            <th className="right">Subtotal</th>
                            <th className="right">Rs. 10030</th>
                          </tr>
                        </thead>
                      </table>
                    </div>


                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className={toggle === 4 ? "show-content" : "content_tabs"}>
          <div className="pt-5">
            <div className="">
              <div className="container">
                <div className="card">

                  <div className="card-body">

                    <div className="table-responsive-sm">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <td>500000 @ 18/SMS</td>
                            <td className="right">Rs. 8500</td>
                          </tr>
                          <tr>
                            <td className="right">18% GST</td>
                            <td className="right">Rs. 1530</td>
                          </tr>
                        </thead>
                        <thead>
                          <tr>
                            <th className="right">Subtotal</th>
                            <th className="right">Rs. 10030</th>
                          </tr>
                        </thead>
                      </table>
                    </div>


                  </div>
                </div>
              </div>

            </div>
          </div>
        </div> */}

        <div className="col-md-12 col-xs-12 py-10 pt-10 ">
          <input type="submit" name="AddAnother" className="button-57 pull-right" value="Place Order" />
        </div>

      </div>
    </div>

  )
}
export default BuysmsWtsp;
