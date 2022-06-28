import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { addStoke, fetchOutsideParty, fetchParty } from "../Services";
import ExportForm from "./ExportForm/Export";
import IssuesForm from "./IssuesForm/issue";
import RecieveForm from "./RecieveForm";
import InsideForm from "./StocksForm/InsideForm";
import OutSideForm from "./StocksForm/OutSideForm";

function Stock() {
  let { stockId } = useParams();
  let navigate = useNavigate();

  const [stockType, setStockType] = useState("");

  const [partyList, setpartyList] = useState([]);
  const [outsidePartyList, setoutsidePartyList] = useState([])

  useEffect(() => {
    if(stockId === '1'){
      setStockType("outside")
    }
  }, [stockId])
  

  // get party list
  useEffect(() => {
    (async () => {
      const parties = await fetchParty(1000, 1, "");
      const outsideparties = await fetchOutsideParty(1000, 1, "",0);

      setpartyList(parties?.data?.results); 
      setoutsidePartyList(outsideparties?.data?.results)
    })();
  }, []);

  const getData = () => {
    navigate("/stocklist");
  };


  const generateStock = (data) => {
    addStoke(data).finally(() => {
      getData()
    });
  };

  return (
    <>
      <div className="container">
        <h4 className="mt-3 text-success mb-4">Stock Management</h4>
        <div className="row btn-custom">
          <div className="col-md-3"></div>
          <div className="col-md-2">
            <Link className="btn btn-primary" to="/stock/1">
              Create Stock
            </Link>
          </div>
          <div className="col-md-2">
            <Link className="btn btn-primary" to="/stock/2">
              Issue/Receive Stock
            </Link>
          </div>
          <div className="col-md-2">
            <Link className="btn btn-success" to="/stocklist">
              View All Stock List
            </Link>
          </div>
          <div className="col-md-3"></div>
        </div>
        {stockId === "2" && (
          <div className="row btn-custom">
            <div className="col-md-4"></div>
            <div className="col-md-2">
              <button
                className="btn btn-info"
                onClick={() => {
                  setStockType("Issue");
                }}
              >
                Generate Issue Stock
              </button>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-info"
                onClick={() => {
                  setStockType("Receive");
                }}
              >
                Generate Receive Stock
              </button>
            </div>
            <div className="col-md-1">
              <button 
                className="btn btn-warning"
                onClick={() => {
                  setStockType("export");
                }}
                >Export</button>
            </div>
            <div className="col-md-3"></div>
          </div>
        )}
        {stockId === "1" || (stockId === "2" && stockType !== "") ? (
          <div className="row  mb-4">
            <div className="col-md-3"></div>
            <div className="col-md-6" style={{ border: "1px solid rgb(206 200 200)" }}>
              <h4 className="text-center  ml-4 mb-5 mt-4">
                {stockId === "1" ? `Create ${stockType} Stock` : ""}
                {stockType !== "" && stockId === "2"
                  ? `Create ${stockType} Stock`
                  : ""}{" "}
              </h4>

              {stockType === "Issue" && <IssuesForm  generateStock={generateStock} partyList={partyList} />}

              {stockType === "Receive" && <RecieveForm  generateStock={generateStock} partyList={partyList}/>}

              {stockId === "1" && <OutSideForm generateStock={generateStock} partyList={outsidePartyList} />}

              {stockType === "inside" && <InsideForm generateStock={generateStock} />}

              {stockType === "export" && <ExportForm />}
            </div>
            <div className="col-md-3"></div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Stock;
