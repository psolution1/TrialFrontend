import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductService,
  getAllProductService,
  deleteProductService,
  UpdateProductService,
} from "../../features/product_serviceSlice";
// import getAllProductService from "../../features/product_serviceSlice"
import { toast } from "react-toastify";

function Productservices() {
   
  const { ProductService } = useSelector((state) => state.ProductService);

  const dispatch = useDispatch();

  //// For Show Product And Service

  useEffect(() => {
    dispatch(getAllProductService());
  }, []);

  //// For Show Product And Service

  ///// Product And Service Add
  const [data, setData] = useState({});
  const newdata = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const productsubmit = async (e) => {
    e.preventDefault();
    if (data?._id) {
      const aaaa = await dispatch(UpdateProductService(data));
      if (aaaa.payload.success === true) {
        toast.success(aaaa.payload.message);
      } else {
        toast.warn(aaaa.payload.message);
      }
      
    } else {
      const aaaa = await dispatch(addProductService(data));
      if (aaaa.payload.success === true) {
        toast.success(aaaa.payload.message);
      } else {
        toast.warn(aaaa.payload.message);
      }
    }
  };

  const editstatus = async (_id) => {
    const selectedData = ProductService?.product_service.find(
      (item) => item?._id === _id
    );
    setline("block");
    setData(selectedData);
    console.log(selectedData);
  };
  ///// Product And Service Add

  /// add form show
  const [line, setline] = useState("none");
  const showForm = async(e) => {
    if (line === "none") {
      setData(null); // Set data to null
      setData({product_service_name:'',set_up_fee:'',payment:''}); // Set data to null

       setline("block");
    } else {
      setData(null); // Set data to null
      setData({product_service_name:'',set_up_fee:'',payment:''}); // Set data to null
      setline("none");
    }
  };
  /// add form show

  return (
    <div>
      <div className="content-wrapper">
        {/* Main content */}
        <section className="content py-2 pt-3">
          <div className="container">
            <div className="row">
              <div className="col-12 pl-0">
                <div className="panel panel-bd lobidrag lobipanel">
                  <div className="bg-white">
                    <div className="btn-group lead_information  pl-2">
                      <h5> Product And Service </h5>
                    </div>
                    <button
                      type="button"
                      style={{ float: "right" }}
                      className="btn   btn-primary dt-button"
                      onClick={showForm}
                      id="add-new"
                    >
                      {" "}
                      Add New
                    </button>
                  </div>

                  <div className="panel-bodyes ">
                    <div className="bg-white">
                      <div className="cards">
                        <div className="card-headerse bg-white">
                          <div className="table-responsive mob-bord">
                            <table
                              className="table table-bordered table-hover"
                              id="example"
                            >
                              <thead className="heading_table">
                                <tr>
                                  <th className="list-check">S.N.</th>
                                  <th>Product Name</th>
                                  <th>Price</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody className="datas_table">
                                {ProductService?.product_service?.map(
                                  (ProductService1, key) => {
                                    const handleDelete = () => {
                                      const confirmDelete = window.confirm(
                                        "Are you sure you want to delete this product/service?"
                                      );

                                      if (confirmDelete) {
                                        // Dispatch the deleteProductService action with the product/service ID
                                        dispatch(
                                          deleteProductService(
                                            ProductService1?._id
                                          )
                                        );
                                        toast.success("Delete Successfully");
                                      } else {
                                        toast.success("Delete Canceled");
                                        console.log("Delete canceled");
                                      }
                                    };
                                    return (
                                      <tr>
                                        <td className="list-check">
                                          {key + 1}
                                        </td>
                                        <td>
                                          {
                                            ProductService1?.product_service_name
                                          }
                                        </td>
                                        {/* <td>{ProductService1?.billing_cycle}</td> */}
                                        <td>Rs. {ProductService1?.payment}</td>
                                        <td>
                                          {/* <a href=" " className="btn btn-info btn-xs"> <i className="fa fa-pencil-square-o"></i></a> */}
                                          <button
                                            type="button"
                                            onClick={handleDelete}
                                            // onClick={e=>{dispatch(deleteProductService(ProductService1._id))}}
                                            className="btn btn-danger btn-xs"
                                          >
                                            <i className="fa fa-trash" />
                                          </button>
                                          <button
                                            type="button"
                                            onClick={(e) =>
                                              editstatus(ProductService1?._id)
                                            }
                                            className="btn btn-info btn-xs"
                                          >
                                            <i
                                              className="fa fa-pencil-square-o"
                                              aria-hidden="true"
                                            ></i>
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="panel-body"
                    id="add-new-service"
                    style={{ display: line }}
                  >
                    <div className="col-sm-12 col-md-8 col-xs-12">
                      <div>
                        <form onSubmit={productsubmit}>
                          <div className="cardses">
                            <div className="card-headers">
                              <div className="row">
                                <div className="col-md-4 pd-top">
                                  <lable>Add New Services</lable>
                                </div>
                                <div className="col-md-8">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="product_service_name"
                                      value={data?.product_service_name}
                                      required
                                      onChange={newdata}
                                      placeholder="Product & Service Name"
                                      defaultValue=""
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4 pd-top">
                                  <lable>Setup fee</lable>
                                </div>
                                <div className="col-md-8">
                                  <div className="form-group">
                                    <input
                                      value={data?.set_up_fee}
                                      type="Number"
                                      required
                                      onChange={newdata}
                                      className="form-control"
                                      name="set_up_fee"
                                      placeholder="Setup fee"
                                      defaultValue=""
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4 pd-top">
                                  <lable>Price</lable>
                                </div>
                                <div className="col-md-8">
                                  <div className="form-group">
                                    <input
                                      type="Number"
                                      value={data?.payment}
                                      required
                                      onChange={newdata}
                                      className="form-control"
                                      placeholder="Payment"
                                      name="payment"
                                      defaultValue=""
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4 pd-top d-none">
                                  <lable>Recurring Payment</lable>
                                </div>
                                <div className="col-md-8 d-none">
                                  <div className="form-group">
                                    <input
                                      type="number"
                                      // required
                                      onChange={newdata}
                                      className="form-control"
                                      placeholder="Recurring Payment"
                                      name="recurring"
                                      defaultValue=""
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4 pd-top d-none">
                                  <lable>Billing Cycle</lable>
                                </div>
                                <div className="col-md-8 d-none">
                                  <div className="form-group">
                                    <select
                                      className="form-control"
                                      name="billing_cycle"
                                      onChange={newdata}
                                      // required
                                    >
                                      <option value="">Billing cycle</option>
                                      <option value="onetime">One Time</option>
                                      <option value="monthly">Monthly</option>
                                      <option value="quarterly">
                                        Quarterly
                                      </option>
                                      <option value="semesterly">
                                        Semesterly
                                      </option>
                                      <option value="yearly">Yearly</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-md-12 text-right">
                                  <div className="resets-button">
                                    <button
                                      type="submit"
                                      className="btn btn-primary"
                                    >
                                      {data?._id ? "Edit" : "Submit"}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Productservices;
