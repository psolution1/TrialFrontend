import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { login1 } from "../features/licenceSlice";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

function Login() {
  const message = useSelector((state) => state.app);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [data, setData] = useState({});

  const loginSubmit = async (e) => {
    e.preventDefault();

    const aaaa = await dispatch(login1(data));

    if (aaaa.payload.success === true) {
      toast.success("login Successfully!");
      navigate("/login");

      setTimeout(() => {
        window.location.reload(false);
      }, 500);
    } else {
      toast.warn(aaaa.payload);
    }
  };

  return (
    <div className="content-wrapperes ">
      <div className="login-box">
        <div className="login-logo">
          <a href=" ">
            <b>CRM</b>
          </a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form onSubmit={loginSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  required
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="form-control"
                  placeholder="Email"
                />

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  required
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="form-control"
                  placeholder="Password"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="icheck-primary">
                    <button
                      type="submit"
                      value="login"
                      className="btn btn-primary btn-block"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <p className="mb-1">
              {/* <Link to="/forgotpassword">I forgot my password</Link> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
