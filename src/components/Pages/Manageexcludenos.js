import React from "react";

function Manageexcludenos() {
  return (
    <div>
      <div className="content-wrapper">
        {/* Main content */}
        <section className="content py-2">
          <div className="container">
          
       
          <div className="panel panel-bd lobidrag lobipanel">
            <div className="panel-heading mannages_bottom">
             <div classname="btn-group pb-4">
                <h2  className="title"> Manage  Exclude Phone Numbers  <span _ngcontent-ukx-c142 style={{display: 'block', paddingLeft: 0}}><i _ngcontent-ukx-c142 className="las la-info-circle text-theme" /> The numbers you will add here will be automatically excluded from all the reports. However, call logs will be synchronized for these numbers </span></h2>
               </div>

               
    </div>
<div classname="panel-body">
  <div className="panel-bodyes">
     <div className="cards">
         <div className="table-responsive mob-bord">
            <table className="table table-bordered table-hover" id="example">
              <thead>
                <tr>
                  <th className="list-check">  Select  </th>
                   <th>Contact Name</th>
                  <th>Contact Number</th>
                   <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="list-check">
                    <input type="checkbox" className="checkme" defaultValue="NTg=" /></td>
                    <td><input type="text"   placeholder="Search" className="form-control ng-pristine ng-valid ng-touched" /></td>
                  <td><input type="text"   placeholder="Search" className="form-control ng-pristine ng-valid ng-touched" /></td>
               <td>
                     
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
           
      </section>  
      </div>
     
    </div>
  );
}
export default Manageexcludenos;
