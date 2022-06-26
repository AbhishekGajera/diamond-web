import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactLoader from "react-loader";
import { getStockByParty, deleteStock } from "../../Services";

const StockListById = () => {
  let { id, name } = useParams();

  const [loaded, setLoaded] = useState(true);
  const [dataList, setdataList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoaded(true);
    const response = await getStockByParty(id,1000,1);
    setdataList(response?.data?.results);
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

  // delete party with confirmation
  const onClickHandler = (id) => {
    if (window.confirm("Are you sure want to delete this User ?")) {
      deleteStock(id).finally(() => {
        getData(), setStock({ ...stock, LotNo: "", stoneId: "" });
      });
    }
  };

  return (
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
                      <td>{formatedType(item?.stock_type)}</td>
                      <td>{item?.weight}</td>
                      <td>{item?.defaultDate}</td>
                      <td>{item?.party?.name}</td>
                      <td>
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
  );
};

export default StockListById;
