import React from 'react'

export default function ForgotPassword() {
    return (
        <div class="content-wrapperes ">
         <div className="login-box">
      <div className="login-logo">
        <a href=" "><b>CRM</b></a>
      </div>  
      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">Forgot Password</p>
          <form  >
          <label>Enter Register Password</label>  
            <div className="input-group mb-3">
              <input type="email"
              required
              // onChange={e => setData({...data, email: e.target.value})}
              className="form-control"
               placeholder="Email" />
               
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
            </div>

            <label>Set New Password</label>
            <div className="input-group mb-3">
             
              <input type="password"
              required
           //  onChange={e => setData({...data, password: e.target.value})}
               className="form-control"
                placeholder="Set New Password" />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>

           
            <div className="row">
              <div className="col-12">
                <div className="icheck-primary">
                <button type="submit" value="login" className="btn btn-primary btn-block">Submit</button>
                </div>
              </div>
            
            </div>
          </form>
          
          <p className="mb-1">
            <a href="/login">Sign In</a>
          </p>
          
        </div>
      </div>
    </div>
    
    
        </div>
      );
}
