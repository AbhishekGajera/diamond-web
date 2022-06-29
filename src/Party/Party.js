import React, { useState } from "react";
import { createParty } from "../Services";
import { Link, useParams, useNavigate } from 'react-router-dom'

function Party() {
  let { partyId } = useParams();
  let navigate = useNavigate();

  const defaultValue = {
    partyName: "",
    phoneNo: "",
    description: "",
    outsideParty:"0"
  }

  const [party, setParty] = useState(defaultValue);

  const { partyName, phoneNo, description,outsideParty } = party;

  const onInputChange = (e) => {
    setParty({ ...party, [e.target.name]: e.target.value });
  };

  // validation before submitting data
  const validation = () => {
    if (!partyName) {
      alert("Please add Party Name");
      return false;
    }
    if (!phoneNo) {
      alert("Phone Number is required");
      return false;
    }
    if (!description) {
      alert("Description is required");
      return false;
    }
    return true;
  };

  const getData = () => {
    navigate('/partylist');
  }

  // invokes on click of createParty
  const generateParty = async () => {
    if (validation()) {
      const data = JSON.stringify({
        name: partyName,
        mobileno: phoneNo,
        description: description,
        outsideParty: partyId == 2 ? outsideParty : "",
        type: partyId == 2 ? "0" : "1"
      });
      createParty(data).finally(() => { getData() })
    }
  };

  return (
    <div className="container">
      <h4 className="mt-3 text-success mb-4">Party Management</h4>
      <div className='row btn-custom mx-15'>
        <div className='col-md-3'></div>
        <div className='col-md-2'>
          <Link className='btn btn-primary' to='/party/1'>Generate Inhouse Party</Link>
        </div>
        <div className='col-md-2'>
          <Link className='btn btn-primary' to='/party/2'>Generate Outside Party</Link>
        </div>
        <div className="col-md-2">
          <Link className="btn btn-success" to='/partylist'>
            View All Party List
          </Link>
        </div>
        <div className='col-md-3'></div>
      </div>
      {partyId === '1' || partyId === '2' ? (
        <div className="row px-15 mb-4 ">
          <div className="col-md-3"></div>
          <div className="col-md-6" style={{ border: "1px solid rgb(206 200 200)" }}>
            <h4 className="text-center  ml-4 mb-5 mt-4">{partyId === '1' ? "Create Inhouse Party" : "Create Outside Party"}</h4>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control  mb-4"
                name="partyName"
                onChange={onInputChange}
                placeholder="Enter Name"
                required=""
              />
            </div>
            <div className="form-group">
              <label>Phone No</label>
              <input
                type="number"
                className="form-control  mb-4"
                name="phoneNo"
                onChange={onInputChange}
                placeholder="Enter PhoneNo"
                required=""
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                className="form-control  mb-4"
                name="description"
                onChange={onInputChange}
                placeholder="Enter Description"
                required=""
              />
            </div>
            {partyId === '2' && (
            <div className="form-group">
              <label>Select outsideParty</label>
              <select
                name="outsideParty"
                className="form-control  mb-4"
                onChange={onInputChange}
              >
                <option value="0">job work</option>
                <option value="1">merchant</option>
              </select>
            </div>
            )}
            <button
              type="submit"
              className="btn btn-primary mb-2 btn-custom"
              onClick={generateParty}
              name="submit"
            >
              Submit
            </button>
          </div>
          <div className="col-md-3"></div>
        </div>
      ) : ''}
    </div>
  );
}

export default Party;
