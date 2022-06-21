import React,{useState} from 'react'

function Stock() {

  const [searchTerm, setSearchTerm] = useState("");
  const [stock, setStock] = useState({
    LotNo: '',
    stoneId: '',
    date: '',
    status: 'credit',
  });

  const [data, setdata] = useState({
    LotNo: '',
    stoneId: '',
    date: '',
    status: 'credit',
  });

  const { LotNo, stoneId, date, status } = stock;

  const onInputChange = (e) => {
    console.log("event", e.target.value)
    console.log("name", e.target.name)
    setStock({ ...stock, [e.target.name]: e.target.value });
  };

  const validation = () => {
    if (!LotNo) {
      alert("Please add Lot No");
      return false;
    }
    if (!stoneId) {
      alert("Stone Id is required");
      return false;
    }
    if (!date) {
      alert("Date is required");
      return false;
    }
    if (!status) {
      alert("Date is required");
      return false;
    }
    return true;
  };

  const generateStock = () => {
    if (validation()) {
      setdata({
        LotNo,
        stoneId,
        date,
        status,
      });
      console.log("data",data)
    }
  };

 
  
  return (
    <div className='container'>
      <h4 className="mt-3 text-success mb-4">Stock Management</h4>
      <div className='row  mb-4'>
        <div
          className="col-md-6"
          style={{ border: "1px solid rgb(206 200 200)" }}
        >
          <h5 className="text-center  ml-4 mb-5 mt-4">Stock Party</h5>
          <div className="form-group">
            <label>Lot No</label>
            <input
              type="text"
              className="form-control  mb-4"
              name="LotNo"
              onChange={onInputChange}
              placeholder="Enter Lot No"
              required=""
            />
          </div>
          <div className="form-group">
            <label>Stone Id</label>
            <input
              type="number"
              className="form-control  mb-4"
              name="stoneId"
              onChange={onInputChange}
              placeholder="Enter stoneId"
              required=""
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              className="form-control  mb-4"
              name="date"
              onChange={onInputChange}
              placeholder="select Date"
              required=""
            />
          </div>
          <div className="form-group">
            <label>Status</label><br/>
            <input type='radio' className="form-check-input"  onChange={onInputChange} name="status" id="credit" value="credit" checked />{' '}
            <label className="form-check-label" htmlFor="credit">
              Credit
            </label>
            <input type='radio' className="form-check-input" onChange={onInputChange}  name="status" id='debit' value="debit" />{' '}
            <label className="form-check-label" htmlFor="debit">
              Debit
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary mb-2"
            onClick={generateStock}
            name="submit"
          >
            Submit
          </button>
        </div>
      </div>
      <div className='row'>
        <div className="col-md-12" style={{border: "1px solid rgb(206, 200, 200)"}}>
          <h5 className="text-center  ml-4 mb-5 mt-4">Stock</h5>
          <div>
            <input
              type="text"
              className="form-control outline-gray bg-transparent border-0"
              placeholder="Search Stock"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e?.target?.value);
              }}
            />
          </div>
          <table className='table table-hover mb-5'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Lot No</th>
                <th>Stone Id</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <th>10</th>
                <td>22</td>
                <td>20/06/2022</td>
                <td>Credit</td>
                <td>
                  <button className='btn btn-success'>Edit</button>
                  <button className='btn btn-danger'>Delete</button>
                </td>
              </tr> 
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Stock