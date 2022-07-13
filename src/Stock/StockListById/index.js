import React, { useState, useEffect } from "react";
import { groupBy } from 'lodash';
import { Link, useParams } from "react-router-dom";
import ReactLoader from "react-loader";
import Modal from "../Modal";
import Header from "../../Header/Header"
import { getStockByParty, deleteStock, updateStock } from "../../Services";
import moment from 'moment';

const StockListById = () => {
  let { id, name } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [dataList, setdataList] = useState([]);
  const [partyList, setpartyList] = useState([]);
  const [valurToEdit, setvalurToEdit] = useState({})
  const [isOpenModel, setisOpenModel] = useState(false)
  const [totalInsideDiamonds, settotalInsideDiamonds] = React.useState(0)
  const [groupedParty, setgroupedParty] = useState({})

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await getStockByParty(id,1000,1);
    const data = []
    setdataList(response?.data?.results);
    settotalInsideDiamonds(groupBy(response.data.results?.filter((item) => item?.stock_type === 1),'current_assign.name'))
    setgroupedParty(groupBy(response.data.results?.filter((item) => item?.stock_type === 0),'current_assign.name'))

    response?.data?.results?.map((item) => {
      const elm = data.find(element => element?.current_assign?.name === item?.current_assign?.name)
      if (!elm) {
          item.total = 1
          data.push(item)
      }
      else {
          const currentDetails = data.findIndex(element => element?.current_assign?.name === item?.current_assign?.name)
          data[currentDetails].total = data[currentDetails]?.total + 1
      }
    })

    const result = groupBy(data, 'party.type')
    // give unique id number to each element of grouped object
    let index = 1
    Object.entries(result).map((i) => {
        i[1].map((j) => {
            j.number = index
            index++
        })
    })
    index = 1
   
    setpartyList(data);
    setLoaded(true);
  };

  const formatedType = (selectType) => {
    switch (selectType) {
      case 0:
        return "Outside";
      case 1:
        return "Inside";
      default:
        return "";
    }
  };

  const modalClose = () => {
    setisOpenModel(false)
  }

  const onClickEdit = (id) => {
    setvalurToEdit(id)
    setTimeout(() => {
      setisOpenModel(true)
    }, 700);
  };

  const onChangeHandlerForEdit = (e) => {
    setvalurToEdit({ ...valurToEdit, [e.target.name]: e.target.value })
}

  const updateHandler = () => {
    const data = JSON.stringify({
        lot_no: valurToEdit?.lot_no,
        stock_type: valurToEdit?.stock_type,
        stone_id: valurToEdit?.stone_id,
        weight: valurToEdit?.weight,
    })
    updateStock(data).finally(() => {
      getData(), setvalurToEdit({}), setisOpenModel(false)
    });
  }

  // delete party with confirmation
  const onClickHandler = (id) => {
    if (window.confirm("Are you sure want to delete this User ?")) {
      deleteStock(id).finally(() => {
        getData(), setStock({ ...stock, LotNo: "", stoneId: "" });
      });
    }
  };

  let outsideTotal = 0;
  let insideTotal = 0

  return (
    <>
      <Header />
      <Modal show={isOpenModel} handleClose={modalClose}>
        <div>
            <h4 className="mt-3 text-success mb-4">Update Stock</h4>
            <div className="form-group">
                <label>Lot No</label>
                <input
                    type="text"
                    className="form-control  mb-4"
                    name="lot_no"
                    defaultValue={valurToEdit?.lot_no}
                    onChange={onChangeHandlerForEdit}
                    required=""
                />
            </div>
            <div className="form-group">
                <label>Stone Id</label>
                <input
                    type="text"
                    className="form-control  mb-4"
                    name="stone_id"
                    onChange={onChangeHandlerForEdit}
                    defaultValue={valurToEdit?.stone_id}
                    required=""
                />
            </div>
            <div className="form-group">
                <label>weight</label>
                <input
                    type="text"
                    className="form-control  mb-4"
                    name="weight"
                    onChange={onChangeHandlerForEdit}
                    defaultValue={valurToEdit?.weight}
                    required=""
                />
            </div>
            <div className='form-group'>
                <label>Type</label>
                <select style={{ minWidth: 200 }} name="stock_type" className="form-control btn-custom" onChange={onChangeHandlerForEdit}>
                    <option value={0} selected={valurToEdit?.stock_type === 0}>Outside</option>
                    <option value={1} selected={valurToEdit?.stock_type === 1}>Inside</option>
                </select>
            </div>
            <br />

            <button className="btn btn-success" onClick={updateHandler}>
                Update Stock
            </button>
        </div>
      </Modal>
      <ReactLoader loaded={loaded}>
        <div className="container">
          <h4 className="mt-3 text-success mb-4">View {name}'s' Stock List</h4>
          <div className="row btn-custom">
            <div className="col-md-4"></div>
            <div className="col-md-4 d-flex justify-content-center">
              <Link className="btn btn-primary" to="/stocklist">
                Back to the list
              </Link>
            </div>
          </div>
          <div className="row">
            <div
              className="col-md-6 margin15"
              style={{ border: "1px solid rgb(206, 200, 200)" }}
            >
              <h5 className="text-center  ml-4 mb-5 mt-4">Inside</h5>
              <table className="table table-hover mb-5 margin15">
              <thead>
                  <tr>
                    <th>Party</th>
                    <th>Diamond</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Object.entries(totalInsideDiamonds)?.map((i,index) => {
                      insideTotal = insideTotal + i[1]?.length
                      return (
                        <tr key={index}>
                          <td>{i[0]}</td>
                          <td>{i[1]?.length}</td>
                        </tr>
                      );
                    })
                  }
                  <tr>
                    <th>Total Diamond</th>
                    <th>{insideTotal}</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              className="col-md-6 margin15"
              style={{ border: "1px solid rgb(206, 200, 200)" }}
            >
              <h5 className="text-center  ml-4 mb-5 mt-4">Outside</h5>
              <table className="table table-hover mb-5 margin15">
                <thead>
                  <tr>
                    <th>Party</th>
                    <th>Diamond</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Object.entries(groupedParty)?.map((i,index) => {
                      outsideTotal = outsideTotal + i[1]?.length
                      return (
                        <tr key={index}>
                          <td>{i[0]}</td>
                          <td>{i[1]?.length}</td>
                        </tr>
                      );
                    })
                  }
                  <tr>
                    <th>Total Diamond</th>
                    <th>{outsideTotal}</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div
              className="col-md-12 margin15"
              style={{ border: "1px solid rgb(206, 200, 200)" }}
            >
              <h5 className="text-center  ml-4 mb-5 mt-4">Stock</h5>
              <table className="table table-hover mb-5 margin15">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Lot No</th>
                    <th>Stone Id</th>
                    <th>Stock Type</th>
                    <th>Weight</th>
                    <th>Date</th>
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
                        <td>{formatedType(item?.stock_type)}</td>
                        <td>{item?.weight}</td>
                        <td>{item?.defaultDate ? moment(item?.defaultDate).format('DD-MM-YYYY') : ''}</td>
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
      </ReactLoader>
    </>
  );
};

export default StockListById;
