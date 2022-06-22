import React, { useState, useEffect } from "react";
import { createParty, deleteParty, fetchParty } from "../Services";
import { Link } from 'react-router-dom'

function Party() {
  const defaultValue = {
    partyName: "",
    phoneNo: "",
    description: "",
    selectType: "",
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setdata] = useState([])
  const [party, setParty] = useState(defaultValue);

  const { partyName, phoneNo, description, selectType } = party;

  const onInputChange = (e) => {
    setParty({ ...party, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getData()
  }, [searchTerm])
  
  const getData = async () => {
     const result = await fetchParty(1000,1,searchTerm)
     setdata(result?.data?.results)
  }

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

  // API doesn't have string that's why convert into numbers
  const formateSelectedType = (selectType) => {
    switch (selectType) {
      case "Outside":
        return 0;
      case "Inside":
        return 1;
      default:
        return 0
    }
  };

  // invokes on click of createParty
  const generateParty = async () => {
    if (validation()) {
      const data = JSON.stringify({
        name: partyName,
        mobileno: phoneNo,
        description: description,
        type: formateSelectedType(selectType),
      });
      createParty(data).finally(() => { getData() })
    }
  };


  // delete party with confirmation
  const onClickDeleteHandler = (id) => {
    if(window.confirm('Are you sure want to delete this User ?')){
      deleteParty(id).finally(() => getData(), setParty(defaultValue))
    }
  }

  return (
    <div className="container">
      <h4 className="mt-3 text-success mb-4">Party Management</h4>
      <div className="row px-15 mb-4">
        <div
          className="col-md-6"
          style={{ border: "1px solid rgb(206 200 200)" }}
        >
          <h4 className="text-center  ml-4 mb-5 mt-4">Create Party</h4>
          <div className="form-group">
            <label>Select Type</label>
            <select
              name="selectType"
              className="form-control  mb-4"
              onChange={onInputChange}
            >
              <option value="Inside" selected>
                Inside
              </option>
              <option value="Outside">Outside</option>
            </select>
          </div>
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
        <div className="col-md-6">
            <Link className="btn btn-success" to='/stock'>
                Create Stock
            </Link>
        </div>
      </div>
      <div className="row margin15 p0">
        <div
          className="col-md-12"
          style={{ border: "1px solid rgb(206, 200, 200)" }}
        >
          <div className="d-flex">
            <h5 className="text-center  ml-4 mb-5 mt-4">Party List</h5>
            <div className="mb-5 mt-4 margin15">
              <input
                type="text"
                className="form-control outline-gray bg-transparent border-0"
                placeholder="Search party by name"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e?.target?.value);
                }}
              />
            </div>
          </div>
          <table className="table table-hover mb-5">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Phone No</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item,index) => {
                return  <tr>
                <td>{index+1}</td>
                <td>{item?.name}</td>
                <td>{item?.mobileno}</td>
                <td>{item?.description}</td>
                <td> <button className="btn btn-info" onClick={() => onClickDeleteHandler(item?.id)}>Delete</button> </td>
              </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Party;
