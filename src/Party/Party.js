import React, { useState } from "react";
import { createParty } from "../Services";
import { Link ,useParams ,useNavigate } from 'react-router-dom'

function Party() {
  let { partyId } = useParams();
  let navigate = useNavigate();

  const defaultValue = {
    partyName: "",
    phoneNo: "",
    description: "",
  }
  
  const [party, setParty] = useState(defaultValue);

  const { partyName, phoneNo, description } = party;

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
      });
      createParty(data).finally(() => { getData() })
    }
  };

  return (
    <div className="container">
      <h4 className="mt-3 text-success mb-4">Party Management</h4>
      <div className='row btn-custom'>
        <div className='col-md-2'>
          <Link className='btn btn-primary' to='/party/1'>Generate InOut Party</Link>
        </div>
        <div className='col-md-2'>
          <Link className='btn btn-primary' to='/party/2'>Generate Outside Party</Link>
        </div>
        <div className="col-md-2">
          <Link className="btn btn-success" to='/partylist'>
              View All Party List
          </Link>
        </div>
        <div className="col-md-2">
          <Link className="btn btn-success" to='/stock'>
              Create Stock
          </Link>
        </div>
      </div>
      { partyId === '1' || partyId === '2' ? (
      <div className="row px-15 mb-4">
        <div className="col-md-6" style={{ border: "1px solid rgb(206 200 200)" }}>
          <h4 className="text-center  ml-4 mb-5 mt-4">{partyId === '1' ? "Create Inout Party" : "Create Outside Party"}</h4>
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
          <button
            type="submit"
            className="btn btn-primary mb-2 btn-custom"
            onClick={generateParty}
            name="submit"
          >
            Submit
          </button>
        </div>
      </div>
      ) : ''}
    </div>
  );
}

export default Party;
