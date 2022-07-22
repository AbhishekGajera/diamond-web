import { groupBy } from "lodash";
import React, { useState, useEffect } from "react";
import ReactLoader from "react-loader";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import useDebounce from "../Hooks/useDebounce";
import { fetchStoke, stockByStone, updateStock } from "../Services";
import Modal from "./Modal";

function StockList() {
  const [valurToEdit, setvalurToEdit] = useState({});
  const [isOpenModel, setisOpenModel] = useState(false);
  const [dataList, setdataList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [searchStock, setsearchStock] = useState('');
  const [stockInformation, setstockInformation] = useState(null)
  const debouncedSearch = useDebounce(searchStock, 500)

  const navigate = useNavigate();

  const getData = async () => {
    const stokes = await fetchStoke(1000, 1);
    const data = [];

    // console.log("stokes---",groupBy(stokes.data.results,'party.id'));
    const TotalParty = (groupBy(stokes.data.results, 'party.id'));

    // fetch all stock and make them uniq by party name
    // and total field is to see how much diamond the current party is holding
    // TODO: it's bad practice but @mayur_jani you need to find some way to get it filter from backend
    stokes?.data?.results?.map((item) => {
      // console.log("item",item);
      const elm = data.find(
        (element) => element?.party?.name === item?.party?.name
      );
      if (!elm) {
        item.total = 1;
        data.push(item);
      } else {
        const currentDetails = data.findIndex(
          (element) => element?.party?.name === item?.party?.name
        );
        data[currentDetails].total = data[currentDetails]?.total + 1;
      }
    });

    // get total of all diamonds that all parties are holding
    let gtotal = 0;
    data.map((item, index) => {
      gtotal = gtotal + parseInt(item.total);
      data[index]['inside'] = groupBy(TotalParty[item.party.id]?.filter((item) => item?.stock_type === 1), "current_assign.id");
      data[index]['outside'] = groupBy(TotalParty[item.party.id]?.filter((item) => item?.stock_type === 0), "current_assign.id");
      return item;
    });
    data.push({ gtotal });

    console.log("data---", data)

    // grouped all parties by their type to show differnt in table
    const result = groupBy(data, "party.type");

    // give unique id number to each element of grouped object
    let index = 1;
    Object.entries(result).map((i) => {
      i[1].map((j) => {
        j.number = index;
        index++;
      });
    });
    index = 1;
    setdataList(result);
    setLoaded(true);

    console.log("dataList", dataList);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getStockInformation(searchStock);
  }, [debouncedSearch]);

  const onChangeHandlerForEdit = (e) => {
    setvalurToEdit({ ...valurToEdit, [e.target.name]: e.target.value });
  };

  const modalClose = () => {
    setisOpenModel(false);
  };

  // update status
  const updateHandler = () => {
    const data = JSON.stringify({
      stockId: valurToEdit?.id,
      status: valurToEdit?.status,
    });
    updateStock(data).finally(() => {
      getData(),
        setStock({ ...stock, LotNo: "", stoneId: "" }),
        setvalurToEdit({}),
        setisOpenModel(false);
    });
  };

  const onClickView = (item) => {
    navigate(`/stocklist/${item?.party?.id}/${item?.party?.name}`);
  };

  const formatedType = (selectType) => {
    switch (selectType) {
      case 0:
        return "Outside Stock";
      case 1:
        return "Inside Stock";
      default:
        return "";
    }
  };

  const fomatedParty = (selectOutsideParty) => {
    switch (selectOutsideParty) {
      case 0:
        return "(Job-Work)";
      case 1:
        return "(Merchant)";
      default:
        return "";
    }
  };

  const getStockInformation = async (id) => {
    try {
      const { data } = await stockByStone(id)
      if (data) {
        setstockInformation(data)
      }
    } catch (error) {
      setstockInformation(null)
    }
  }

  let outsideTotal = 0;
  let insideTotal = 0
  let partyname = '';

  return (
    <>
      <Header />
      <Modal show={isOpenModel} handleClose={modalClose}>
        <div>
          <select
            style={{ minWidth: 200 }}
            name="status"
            className="btn-custom"
            onChange={onChangeHandlerForEdit}
          >
            <option value={0} selected={valurToEdit?.status === 0}>
              Issue
            </option>
            <option value={1} selected={valurToEdit?.status === 1}>
              Receive
            </option>
          </select>

          <br />

          <button className="btn btn-success" onClick={updateHandler}>
            Change Status
          </button>
        </div>
      </Modal>
      <ReactLoader loaded={loaded}>
        <div className="container">
          <h4 className="mt-3 text-success mb-4">View All Stock List</h4>
          <div className="row btn-custom">
            <div className="col-md-4"></div>
            <div className="col-md-2">
              <Link className="btn btn-primary" to="/stock/1">
                Generate Outside Stock
              </Link>
            </div>
            <div className="col-md-2">
              <Link className="btn btn-primary" to="/stock/2">
                Generate Issue/Receive Stock
              </Link>
            </div>
            <div className="col-md-4"></div>
          </div>
          <div className="row">
            <div className="d-flex">
              <h5 className="text-center  ml-4 mb-5 mt-4 mr-20">Search Stock</h5>
              <div className="mb-5 mt-4 margin15">
                <input
                  type="text"
                  className="form-control outline-gray bg-transparent border-0"
                  placeholder="Search stock by id"
                  value={searchStock}
                  onChange={(e) => setsearchStock(e?.target?.value)}
                />
              </div>
            </div>
          </div>
          {stockInformation && <div className="stone-details" style={{ position: 'relative', left: '-15px' }}>
            <tr>
              <th>Stone Id</th>
              <td>{stockInformation?.stone_id}</td>
            </tr>
            <tr>
              <th>Lot No</th>
              <td>{stockInformation?.lot_no}</td>
            </tr>
            <tr>
              <th>Current Party</th>
              <td>{stockInformation?.party?.name}</td>
            </tr>
            <tr>
              <th>Party Type</th>
              <td>{formatedType(stockInformation?.party?.type)}  {fomatedParty(stockInformation?.party?.outsideParty)}</td>
            </tr>
            <tr>
              <th>Original Party</th>
              <td>{stockInformation?.current_assign?.name}</td>
            </tr>
          </div>}

          <div className="row  margin15">
            {Object.entries(dataList)?.map((item, index) => {
              return (
                <>
                  <div className="row">
                    <h2>
                      {" "}
                      <b> {formatedType(+item[0])} </b>{" "}
                      {" "}
                    </h2>

                    {item[1]?.map((i, ind) => {
                      return (
                        <>
                        {i.gtotal == undefined || null ? ( 
                          <div className="row card">
                            <div className="col-md-4" key={ind}>
                              <div className="d-flex">
                                <h4>Id : </h4>
                                <span className="pl-6">{i?.number}</span>
                              </div>
                              <div className="d-flex">
                                <h4>Total Diamond : </h4>
                                <span className="pl-6">
                                  {i?.total}
                                </span>
                              </div>
                              <div className="d-flex">
                                <h4>Current Party : </h4>
                                <span className="pl-6">{i?.party?.name}</span>
                              </div>
                              <div className="d-flex">
                                <h4>Party Type :</h4>
                                <span className="pl-6">
                                  {formatedType(i?.party?.type)}{" "}
                                  {fomatedParty(i?.party?.outsideParty)}
                                </span>
                              </div>
                              <div className="d-flex">
                                <h4>Original Party : </h4>
                                <span className="pl-6">{i?.current_assign?.name}</span>
                              </div>
                              <div className="d-flex">
                                <button
                                  className="btn btn-success"
                                  onClick={() => onClickView(i)}
                                >
                                  View
                                </button>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <h5 className="text-center  ml-4 mb-5 mt-4">Inside</h5>
                              <table className="table table-hover mb-5 margin15">
                                <thead>
                                  <tr>
                                    <th>Party</th>
                                    <th>Diamond</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {[i['inside']]?.map((j, index) => {
                                    {
                                      partyname = j && Object.values(j)?.map(detail => (
                                        [detail[0]?.current_assign?.name,detail.length]
                                      ))
                                    }
                                  })}
                                  {partyname && partyname?.map((name, index) => {
                                    insideTotal += name[1] ;
                                    return (
                                      <tr key={index}>
                                        <td>{name[0]}</td>
                                        <td>{name[1]}</td>
                                      </tr>
                                    );
                                  })}
                                  <tr>
                                    <th>Total Diamond</th>
                                    <th>{insideTotal}</th>
                                  </tr>
                                  <tr style={{display:'none'}}>
                                    {insideTotal = 0}
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div className="col-md-4">
                              <h5 className="text-center  ml-4 mb-5 mt-4">Outside</h5>
                              <table className="table table-hover mb-5 margin15">
                                <thead>
                                  <tr>
                                    <th>Party</th>
                                    <th>Diamond</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {[i['outside']]?.map((j, index) => {
                                    {
                                      partyname = j && Object.values(j)?.map(detail => (
                                        
                                        [detail[0]?.current_assign?.name,detail.length]
                                      ))
                                    }
                                  })}
                                  {partyname && partyname?.map((name, index) => {
                                    outsideTotal += name[1];
                                    return (
                                      <tr key={index}>
                                        <td>{name[0]}</td>
                                        <td>{name[1]}</td>
                                      </tr>
                                    );
                                  })}
                                  <tr>
                                    <th>Total Diamond</th>
                                    <th>{outsideTotal}</th>
                                  </tr>
                                  <tr style={{display:'none'}}>
                                    {outsideTotal = 0}
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ):(
                          <div className="row card">
                             <div className="col-md-4">
                              <div className="d-flex">
                                <h4>Total Diamonds : </h4>
                                <h4 className="pl-6">{i.gtotal}</h4>
                                </div>
                              </div>
                          </div>
                        )}
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </ReactLoader>
    </>
  );
}

export default StockList;
