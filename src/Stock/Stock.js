import React, { useState, useEffect } from "react";
import {
  addCost,
  addStoke,
  deleteStock,
  fetchParty,
  fetchStoke,
  updateStock,
} from "../Services";
import Modal from "./Modal";

function Stock() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataList, setdataList] = useState([]);
  const [isOpenModel, setisOpenModel] = useState(false)
  const [valurToEdit, setvalurToEdit] = useState({})

  const today = new Date();
  const defaultValue = today.toLocaleDateString("en-CA");

  const data = {
    LotNo: "",
    stoneId: "",
    date: defaultValue,
    party: "",
    status: "issue",
  };
  const [stock, setStock] = useState(data);
  const [partyList, setpartyList] = useState([]);

  const { LotNo, stoneId, date, status, party } = stock;

  const onInputChange = (e) => {
    setStock({ ...stock, [e.target.name]: e.target.value });
  };

  const onChangeHandlerForEdit = (e) => {
    setvalurToEdit({ ...valurToEdit,  [e.target.name]: e.target.value })
  }

  const getData = async () => {
    const st0kes = await fetchStoke(1000, 1);
    setdataList(st0kes?.data?.results);
  };

  useEffect(() => {
    getData()
  }, [searchTerm])
  

  // get party list
  useEffect(() => {
    (async () => {
      const parties = await fetchParty(1000, 1, "");
      setpartyList(parties?.data?.results);
      setStock({ ...stock, party: parties?.data?.results[0]?.id });
    })();
  }, []);

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
        return "issue";
      case 1:
        return "receive";
      default:
        return "issue";
    }
  };

  const generateStock = () => {
    if (validation()) {
      const data = JSON.stringify({
        lot_no: LotNo,
        stone_id: stoneId,
        party: party,
        status: formateSelectedType(status),
        defaultDate: date,
      });
      addStoke(data).finally(() => {
        getData(), setStock({ ...stock, LotNo: "", stoneId: "" });
      });
    }
  };

  const onClickEdit = (id) => {
    setvalurToEdit(id)
    setTimeout(() => {
      setisOpenModel(true)
    }, 700);
  };
  
  const modalClose = () => {
    setisOpenModel(false)
  }

  // delete party with confirmation
  const onClickHandler = (id) => {
    if (window.confirm("Are you sure want to delete this User ?")) {
      deleteStock(id).finally(() => {
        getData(), setStock({ ...stock, LotNo: "", stoneId: "" });
      });
    }
  };

  // update status
  const updateHandler = () => {
    const data = JSON.stringify({
      stockId : valurToEdit?.id,
      status : valurToEdit?.status
    })
    updateStock(data).finally(() => {
      getData(), setStock({ ...stock, LotNo: "", stoneId: "" }), setvalurToEdit({}), setisOpenModel(false)
    });
  }

  return (
    <>
    <Modal show={isOpenModel} handleClose={modalClose}>
        <div>
        
          <select style={{ minWidth : 200 }} name="status" className="btn-custom" onChange={onChangeHandlerForEdit}>
            <option value={0} selected={valurToEdit?.status === 0}>Issue</option>
            <option value={1} selected={valurToEdit?.status === 1}>Receive</option>
          </select>

          <br />

          <button className="btn btn-success" onClick={updateHandler}>
            Change Status
          </button>
        </div>
    </Modal>

    <div className="container">
      <h4 className="mt-3 text-success mb-4">Stock Management</h4>
      <div className="row  mb-4">
        <div
          className="col-md-6"
          style={{ border: "1px solid rgb(206 200 200)" }}
        >
          <h4 className="text-center  ml-4 mb-5 mt-4">Create Stock</h4>
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
              type="text"
              className="form-control  mb-4"
              name="stoneId"
              onChange={onInputChange}
              placeholder="Enter stoneId"
              required=""
            />
          </div>

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

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              className="form-control  mb-4"
              name="date"
              onChange={onInputChange}
              placeholder="select Date"
              required=""
              defaultValue={defaultValue}
              value={stock?.date}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <br />
            <input
              type="radio"
              className="form-check-input"
              onChange={onInputChange}
              name="status"
              id="issue"
              value="issue"
              checked
            />{" "}
            <label className="form-check-label mr-20" htmlFor="issue">
              Issue
            </label>
            <input
              type="radio"
              className="form-check-input"
              onChange={onInputChange}
              name="status"
              id="receive"
              value="receive"
            />{" "}
            <label className="form-check-label mr-20" htmlFor="receive">
              Receive
            </label>
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
      <div className="row">
        <div
          className="col-md-12 margin15"
          style={{ border: "1px solid rgb(206, 200, 200)" }}
        >
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
          <table className="table table-hover mb-5 margin15">
            <thead>
              <tr>
                <th>Id</th>
                <th>Lot No</th>
                <th>Stone Id</th>
                <th>Date</th>
                <th>Status</th>
                <th>Party</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataList?.map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <th>{item?.lot_no}</th>
                    <td>{item?.stone_id}</td>
                    <td>{item?.defaultDate}</td>
                    <td>{formatedStatus(item?.status)}</td>
                    <td>{item?.party?.name}</td>
                    <td>
                      <button
                        className="btn btn-success mx-15"
                        onClick={() => onClickEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger mx-15"
                        onClick={() => onClickHandler(item?.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
}

export default Stock;
