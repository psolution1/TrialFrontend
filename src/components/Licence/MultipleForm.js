import React, { useState } from "react";
function MultipleForm() {
  const [lllll, setlllll] = useState('block');
  const [lllll1, setlllll1] = useState('none');
  const [lllll2, setlllll2] = useState('none');
  const [active1,setactive1]=useState('active');
  const [active2,setactive2]=useState();
  const [active3,setactive3]=useState();
  const next1 = async () => {
    setlllll('none');
    setlllll1('block');
    setactive2('active');
    setactive1('active');
    setactive3();

  };

  const next2 = async () => {
    setlllll('none');
    setlllll1('none');
    setlllll2('block');
    setactive2('active');
    setactive1('active');
    setactive3('active');
  };

  const Previous2=async()=>{
    setlllll('block');
    setlllll1('none');
    setlllll2('none');

    setactive2();
    setactive1('active');
    setactive3();
  }
  const Previous3=async()=>{
    setlllll('none');
    setlllll1('block');
    setlllll2('none');

    setactive2('active');
    setactive1('active');
    setactive3();
  }

  const submit=async()=>{

  }

  return (
    <div className="content-wrapper">
      <section className="content py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="multistep-container">
                <div className="mutistep-form-area">
                  <div className="form-box">
                    <ul className="active-button">
                      <li className={active1}>
                        <span className="round-btn"> 1</span>
                      </li>  
                      <li className={active2}>
                        <span className="round-btn"> 2</span>
                      </li>
                      <li className={active3}>
                        
                        <span className="round-btn">3</span>
                      </li>
                    </ul>
                    <h4>Contact Details</h4>
                    <form action="">
                        {/* first */}
                      <div style={{ display: lllll }}>
                        {" "}
                        <div className="form-group">
                          <lable for="">First Name1</lable>
                          <input
                            type="text"
                            name="name"
                            id=""
                            className="form-control"
                          />
                        </div>
                        <div className="button-row">
                          <input
                            type="button"
                            onClick={next1}
                            value="Next"
                            className="next"
                          />
                        </div>
                      </div>

                        {/* second */}

                        <div style={{ display: lllll1 }}>
                        {" "}
                        <div className="form-group">
                          <lable for="">First Name2</lable>
                          <input
                            type="text"
                            name="name"
                            id=""
                            className="form-control"
                          />
                        </div>
                        <div className="button-row">
                        <input
                            type="button"
                            onClick={Previous2}
                            value="Previous"
                            className="previous"
                          />
                          <input
                            type="button"
                            onClick={next2}
                            value="Next"
                            className="next"
                          />
                        </div>
                      </div>

                        {/* third */}

                        <div style={{ display: lllll2 }}>
                        {" "}
                        <div className="form-group">
                          <lable for="">First Name3</lable>
                          <input
                            type="text"
                            name="name"
                            id=""
                            className="form-control"
                          />
                        </div>
                        <div className="button-row">
                          
                        <input
                            type="button"
                            onClick={Previous3}
                            value="Previous" 
                            className="previous"
                          />

                          <input
                            type="button"
                            onClick={submit}
                            value="Submit"
                            className="next"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </section>
    </div>
  );
}

export default MultipleForm;
