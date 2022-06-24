import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { addStoke, fetchParty } from "../Services";
import IssuesForm from "./IssuesForm/issue";
import RecieveForm from "./RecieveForm";
import InsideForm from "./StocksForm/InsideForm";
import OutSideForm from "./StocksForm/OutSideForm";

function Stock() {
  let { stockId } = useParams();
  let navigate = useNavigate();

  const [stockType, setStockType] = useState("");

  const [partyList, setpartyList] = useState([]);

  const data = {
    LotNo: "",
    stoneId: "",
    party: "",
    status: stockType,
    current_assign:"",
  };

  const [stock, setStock] = useState(data);
  const { LotNo, stoneId, status, party,current_assign } = stock;

  const onInputChange = (e) => {
    setStock({ ...stock, [e.target.name]: e.target.value });
  };

  // get party list
  useEffect(() => {
    (async () => {
      const parties = await fetchParty(1000, 1, "");
      setpartyList(parties?.data?.results); 
      setStock({ ...stock, party: parties?.data?.results[0]?.id,current_assign:parties?.data?.results[0]?.id,current_assign: parties?.data?.results[0]?.id });

    })();
  }, []);

  const getData = () => {
    navigate("/stocklist");
  };

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

  const generateStock = (data) => {
    // console.log("mydata",stock)
    console.log("data",data)
    addStoke(data).finally(() => {
      getData(), setStock({ ...stock, LotNo: "", stoneId: "" });
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
            <div className="col-md-4"></div>
          </div>
        )}
        {stockId === "1" && (
          <div className="row btn-custom">
            <div className="col-md-4"></div>
            <div className="col-md-2">
              <button
                className="btn btn-info"
                onClick={() => {
                  setStockType("outside");
                }}
              >
                Generate Outside Stock
              </button>
            </div>
            <div className="col-md-2">
              <button 
                className="btn btn-info"
                onClick={() => {
                  setStockType("inside");
                }}
              >
                Generate Inside Stock
              </button>
            </div>
            <div className="col-md-4"></div>
          </div>
        )}
        {stockId === "1" || (stockId === "2" && stockType !== "") ? (
          <div className="row  mb-4">
            <div className="col-md-3"></div>
            <div className="col-md-6" style={{ border: "1px solid rgb(206 200 200)" }}>
              <h4 className="text-center  ml-4 mb-5 mt-4">
                {stockId === "1" ? "Create Outside Stock" : ""}
                {stockType !== "" && stockId === "2"
                  ? `Create ${stockType} Stock`
                  : ""}{" "}
              </h4>

              {stockType === "Issue" && <IssuesForm  generateStock={generateStock} partyList={partyList} />}

              {stockType === "Receive" && <RecieveForm  generateStock={generateStock} partyList={partyList}/>}

              {stockType === "outside" && <OutSideForm generateStock={generateStock} partyList={partyList} />}

              {stockType === "inside" && <InsideForm generateStock={generateStock} />}
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
