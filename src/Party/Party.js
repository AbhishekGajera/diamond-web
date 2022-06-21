import React,{useState} from 'react'

function Party() {

  const [searchTerm, setSearchTerm] = useState("");
  const [party, setParty] = useState({
    partyName: '',
    phoneNo: '',
    description: '',
    selectType: '',
  });

  const [data, setdata] = useState({
    partyName: '',
    phoneNo: '',
    description: '',
    selectType: '',
  });

  const { partyName, phoneNo, description, selectType } = party;

  const onInputChange = (e) => {
    setParty({ ...party, [e.target.name]: e.target.value });
  };

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

  const generateParty = () => {
    if (validation()) {
      setdata({
        partyName,
        phoneNo,
        description,
        selectType,
      });
      console.log("data",data)
    }
  };

 
  
  return (
    <div className='container'>
      <h4 className="mt-3 text-success mb-4">Party Management</h4>
      <div className='row  mb-4'>
        <div
          className="col-md-6"
          style={{ border: "1px solid rgb(206 200 200)" }}
        >
          <h5 className="text-center  ml-4 mb-5 mt-4">Create Party</h5>
          <div>
            <input
              type="text"
              className="form-control outline-gray bg-transparent border-0"
              placeholder="Search Party"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e?.target?.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Select Type</label>
            <select name='selectType' className="form-control  mb-4" onChange={onInputChange}>
              <option value="Inside" selected>Inside</option>
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
            className="btn btn-primary mb-2"
            onClick={generateParty}
            name="submit"
          >
            Submit
          </button>
        </div>
      </div>
      <div className='row'>
        <div className="col-md-12" style={{border: "1px solid rgb(206, 200, 200)"}}>
          <h5 className="text-center  ml-4 mb-5 mt-4">Party</h5>
          <table className='table table-hover mb-5'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Phone No</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Test</td>
                <td>9856325632</td>
                <td>Testing</td>
              </tr> 
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Party