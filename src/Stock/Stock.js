import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  addStoke,
  fetchParty,
} from "../Services";

function Stock() {
  let { stockId } = useParams();
  let navigate = useNavigate();

  const [stockType ,setStockType] = useState('');
  const [partyList, setpartyList] = useState([]);

  const data = {
    LotNo: "",
    stoneId: "",
    party: "",
    status: stockType
  };

  const [stock, setStock] = useState(data);
  const { LotNo, stoneId, status, party } = stock;

  const onInputChange = (e) => {
    setStock({ ...stock, [e.target.name]: e.target.value });
  };

  // get party list
  useEffect(() => {
    (async () => {
      const parties = await fetchParty(1000, 1, "");
      setpartyList(parties?.data?.results);
      setStock({ ...stock, party: parties?.data?.results[0]?.id });
    })();
  }, []);

  const getData = () => {
    navigate('/stocklist');
  }

  // const validation = () => {
  //   if (!LotNo) {
  //     alert("Please add Lot No");
  //     return false;
  //   }
  //   if (!stoneId) {
  //     alert("Stone Id is required");
  //     return false;
  //   }
  //   return true;
  // };

  // API doesn't have string that's why convert into numbers
  const formateSelectedType = (selectType) => {
    switch (selectType) {
      case "issue":
        return 0;
      case "receive":
        return 1;
      default:
        return 0;
    }
  };

  const formatedStatus = (selectType) => {
    switch (selectType) {
      case 0:
        return "Issue";
      case 1:
        return "Receive";
      default:
        return "Issue";
    }
  };

  const generateStock = () => {

      const data = JSON.stringify({
        lot_no: LotNo,
        stone_id: stoneId,
        party: party,
        current_assign:party,
        status: formateSelectedType(status),
      });
      addStoke(data).finally(() => {
        getData(), setStock({ ...stock, LotNo: "", stoneId: "" });
      });
    
  };

  const addNewRow = () =>{
    
  }
 
  return (
    <>
    <div className="container">
      <h4 className="mt-3 text-success mb-4">Stock Management</h4>
      <div className='row btn-custom'>
        <div className='col-md-2'>
          <Link className='btn btn-primary' to='/stock/1'>Create Stock</Link>
        </div>
        <div className='col-md-3'>
          <Link className='btn btn-primary' to='/stock/2'>Issue/Receive Stock</Link>
        </div>
        <div className="col-md-2">
          <Link className="btn btn-success" to='/stocklist'>
              View All Stock List
          </Link>
        </div>
      </div>
      {stockId === '2' && (
      <div className='row btn-custom'>
        <div className='col-md-2'>
          <button className='btn btn-primary' onClick={()=>{setStockType('Issue')}}>Generate Issue Stock</button>
        </div>
        <div className='col-md-3'>
          <button className='btn btn-primary' onClick={()=>{setStockType('Receive')}}>Generate Receive Stock</button>
        </div>
      </div>
      )}
      {stockId === '1' && (
      <div className='row btn-custom'>
        <div className='col-md-2'>
          <button className='btn btn-primary' onClick={()=>{setStockType('Issue')}}>Generate Outside Stock</button>
        </div>
        <div className='col-md-3'>
          <button className='btn btn-primary' onClick={()=>{setStockType('Receive')}}>Generate Inside Stock</button>
        </div>
      </div>
      )}
      { stockId === '1' || stockId === '2' && stockType !== '' ? (
      <div className="row  mb-4">
        
        <div
          className="col-md-6"
          style={{ border: "1px solid rgb(206 200 200)" }}
        >
          <h4 className="text-center  ml-4 mb-5 mt-4">{stockId === '1' ? 'Create Outside Stock' : ''}{stockType !== '' && stockId === '2' ? `Create ${stockType} Stock` : ''} </h4>
          <div className="form-group">
            <label>Select Party</label>
            <select
              name="party"
              className="form-control  mb-4"
              onChange={onInputChange}
            >
              {partyList?.map((item) => {
                return <option value={item?.id}>{item?.name}</option>;
              })}
            </select>
          </div>
          {stockType === '' &&(
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
          )}
          <div className="form-group">
            <label>Stone Id</label>
            <input
              type="text"
              className="form-control  mb-4"
              name="stoneId"
              onChange={onInputChange}
              placeholder="Enter stoneId"
              required=""
            />
          </div> 
          <div className="form-group">
            <label>Weight</label>
            <input
              type="text"
              className="form-control  mb-4"
              name="weight"
              onChange={onInputChange}
              placeholder="Enter Weight"
              required=""
            />
          </div>   
          <div className="form-group">
            <button className="btn btn-secondary" onClick={addNewRow}>Add Stone Id/weight</button>
          </div>   
          <button
            type="submit"
            className="btn btn-primary mb-2 btn-custom"
            onClick={generateStock}
            name="submit"
          >
            Submit
          </button>
        </div>
      </div>
      ):''}
    </div>
    </>
  );
}

export default Stock;
