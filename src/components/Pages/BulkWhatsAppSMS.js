import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
export default function BulkWhatsAppSMS() {
    const [smsdata, setsmsdata] = useState([]);
    const DBuUrl = process.env.REACT_APP_DB_URL;
    const apiUrl = process.env.REACT_APP_API_URL;
    const getalltransactional = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/getallwhatsmsrecord', {
                headers: {
                    "Content-Type": "application/json",
                    "mongodb-url": DBuUrl,
                },
            });
             setsmsdata(response?.data?.whatappSMSModel['0']);
         } catch (error) { 
            console.log(error);
        }

    }
    useEffect(() => {
        getalltransactional();
    }, [])


    const saveandupdate = async (e) => {
     e.preventDefault();
      const { _id, ...newData } = smsdata;
      try {
        const response = await axios.post('http://localhost:3000/api/v1/addandupdatewhatappsms', newData,{
            headers: {
                "Content-Type": "application/json",
                "mongodb-url": DBuUrl,
            },
         });
         setsmsdata(response?.data?.whatapp['0']);
         toast.success(response?.data?.message);
     } catch (error) { 
        console.log(error);
    }
     }

    return (
        <div>
            <div className="content-wrapper">
                <section className="content content-header">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="panel panel-bd">
                                <div className="panel-heading bg-white">
                                    <div className="btn-group">Bulk WhatsApp SMS</div>
                                </div>
                                <div className="panel-body">
                                    <form onSubmit={saveandupdate} >
                                        <div className="col-sm-12 col-md-12 col-xs-12">
                                            <div className="cards">
                                                <div className="card-headers">

                                                    <div className="row justify-content-md-center">

                                                        <div className="col-md-offset-2 col-md-8">
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <label>Sms EndPoint Url</label>
                                                                </div>
                                                                <div className="col-md-9">
                                                                    <div className="form-group">
                                                <input type="text" className="form-control" required
                                                             onChange={(e) =>{setsmsdata({ ...smsdata, [e.target.name]: e.target.value })}}
                                                                            name="endpointurl" value={smsdata?.endpointurl} />   </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-offset-2 col-md-8">
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <label>Sander Id</label>
                                                                </div>
                                                                <div className="col-md-9">
                                                                    <div className="form-group">
                                                                    <input type="text" className="form-control" required
                                                             onChange={(e) =>{setsmsdata({ ...smsdata, [e.target.name]: e.target.value })}}
                                                                            name="sender" value={smsdata?.sender} /> 
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-offset-2 col-md-8">
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <label>User</label>
                                                                </div>
                                                                <div className="col-md-9">
                                                                    <div className="form-group">
                                                                    <input type="text" className="form-control" required
                                                             onChange={(e) =>{setsmsdata({ ...smsdata, [e.target.name]: e.target.value })}}
                                                                            name="user" value={smsdata?.user} /> 

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-offset-2 col-md-8">
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <label>Passward</label>
                                                                </div>
                                                                <div className="col-md-9">
                                                                    <div className="form-group">
                                                                    <input type="text" className="form-control" required
                                                             onChange={(e) =>{setsmsdata({ ...smsdata, [e.target.name]: e.target.value })}}
                                                                            name="pass" value={smsdata?.pass} /> 
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-offset-2 col-md-8">
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <label>Priority</label>
                                                                </div>
                                                                <div className="col-md-9">
                                                                    <div className="form-group">
                                                                    <input type="text" className="form-control" required
                                                             onChange={(e) =>{setsmsdata({ ...smsdata, [e.target.name]: e.target.value })}}
                                                                            name="priority" value={smsdata?.priority} /> 
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-offset-2 col-md-8">
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <label>Stype</label>
                                                                </div>
                                                                <div className="col-md-9">
                                                                    <div className="form-group">
                                                                    <input type="text" className="form-control" required
                                                             onChange={(e) =>{setsmsdata({ ...smsdata, [e.target.name]: e.target.value })}}
                                                                            name="stype" value={smsdata?.stype} /> 
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-offset-2 col-md-8">
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <label>Htype</label>
                                                                </div>
                                                                <div className="col-md-9">
                                                                    <div className="form-group">
                                                                    <input type="text" className="form-control" required
                                                             onChange={(e) =>{setsmsdata({ ...smsdata, [e.target.name]: e.target.value })}}
                                                                            name="htype" value={smsdata?.htype} /> 
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-offset-2 col-md-8">
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <label></label>
                                                                </div>
                                                                <div className="col-md-9">
                                                                    <div className="form-group">
                                                                        <button type='submit' className="btn btn-primary form-control">
                                                                            Submit
                                                                        </button>
                                                                    </div>
                                                                </div>
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


                    </div>
                </section>
            </div>
        </div>
    )
}
