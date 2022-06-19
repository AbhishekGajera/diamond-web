import React, { useState, useEffect } from "react";
import { getAllProduct } from "../src/Services/ApiService";
import Barcodes from "react-barcode";
import { toast } from "react-toastify";

function Barcode() {
  const [barcod, setBarcod] = useState({
    cuttingNumber: 0,
    totalWeight: 0,
    stoneNo: 0,
  });
  const [data, setdata] = useState({
    stoneNo: 0,
    cuttingNumber: 0,
    totalWeight: 0,
  });
  const [list, setlist] = useState([]);
  const [getbarcode, setGetbarcode] = useState([]);

  const { cuttingNumber, totalWeight, stoneNo } = barcod; // Array Destructutring

  // Handling Input values here
  const onInputChange = (e) => {
    if (
      (e.target.name === "stoneNo") &&
      !isNaN(+e.target.value)
    ) {
      setBarcod({ ...barcod, [e.target.name]: e.target.value });
    }
    if (e.target.name !== "stoneNo") {
      setBarcod({ ...barcod, [e.target.name]: e.target.value });
    }
  };

  // Code for fetching Barcode Number from database  on window load
  const loadBrcode = async () => {
    await getAllProduct(
      (res) => {
        setGetbarcode(res.data.data);
        //   console.log("res",res.data);
      },
      (err) => {
        alert(err);
      }
    );
  };
  useEffect(() => {
    loadBrcode();
  }, []);

  const submitResult = async (
    cuttingno,
    totalweight,
    stoneweight,
    currentweight,
    stoneid,
    barcodenumber
  ) => {
    console.info("cuttingno++ ", cuttingno);
    await fetch("http://167.99.13.120:8001/addproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cuttingno: cuttingno,
        totalweight: totalweight,
        stoneweight: stoneweight,
        currentweight: currentweight,
        stoneid: stoneid,
        barcodenumber: barcodenumber,
      }), // This will send to php
    });
    await loadBrcode();
  };

  const validation = () => {
    if (!stoneNo) {
      alert("kapan number is required");
      return false;
    }
    if (!totalWeight) {
      alert("Please add weight");
      return false;
    }
    if (!cuttingNumber) {
      alert("cutting number is required");
      return false;
    }
    return true;
  };

  const generateList = () => {
    if (validation()) {
      setdata({
        cuttingNumber,
        totalWeight,
        stoneNo,
      });
    }
  };

  const onChangeHandler = (id, value, name, defaultId) => {
    const find = list?.find((i) => i?.id === id);
    if (find) {
      const filteredList = list?.map((i) => {
        if (i?.id === id) {
          i[name] = value;
        }
        return i;
      });
      setlist(filteredList);
      return;
    }

    const newObj = { id, stone : defaultId, [name]: value };
    setlist([...list, newObj]);
  };

  const createAllBarcodes = async () => {
    if (
      window.confirm(
        "if you have some empty fields then that record will not insert inside the database, please take care about that"
      )
    ) {
      for (let index = 0; index < list.length; index++) {
        const { stone, currenteWeight, stoneId, barcodeNo } = list[index];
        if (stone && currenteWeight && stoneId && barcodeNo) {
          await submitResult(
            data?.cuttingNumber,
            data?.totalWeight,
            stone,
            currenteWeight,
            stoneId,
            barcodeNo
          );
        }

        if (index + 1 === list?.length) {
          setlist([]);
          setdata({
            stoneNo: 0,
            cuttingNumber: 0,
            totalWeight: 0,
          });
          setBarcod({
            cuttingNumber: 0,
            totalWeight: 0,
            stoneNo: 0,
          });
          toast.success("All record were added successfully", {
            autoClose: 4000,
          });
        }
      }
    }
  };

  return (
    <div className="container">
      <h4 className="mt-3 text-success mb-4">Generate Barcode</h4>
      <div className="row">
        <div
          className="col-md-4"
          style={{ border: "1px solid rgb(206 200 200)" }}
        >
          <h5 className="text-center  ml-4 mb-5 mt-4">Generate Barcode</h5>
          <div className="form-group">
            <label>Enter Kapan Number</label>
            <input
              type="text"
              className="form-control  mb-4"
              value={cuttingNumber}
              name="cuttingNumber"
              onChange={onInputChange}
              placeholder="Enter Kapan Number"
              required=""
            />
          </div>
          <div className="form-group">
            <label>Enter totalWeight</label>
            <input
              type="text"
              className="form-control  mb-4"
              value={totalWeight}
              name="totalWeight"
              onChange={onInputChange}
              placeholder="Enter totalWeight"
              required=""
            />
          </div>
          <div className="form-group">
            <label>Enter total stone no to generate</label>
            <input
              type="text"
              className="form-control  mb-4"
              value={stoneNo}
              name="stoneNo"
              onChange={onInputChange}
              placeholder="Enter total stone no to generate"
              required=""
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary mb-2"
            onClick={generateList}
            name="submit"
          >
            Generate list for barcodes
          </button>
        </div>

        <div className="col-md-8">
          <table>
            <tr>
              <th style={{ display : 'none' }}>id</th>
              <th>Kapan No</th>
              <th>Total Weight</th>
              <th>Stone</th>
              <th>Current Weight</th>
              <th>Stone Id</th>
              <th>Barcode No</th>
            </tr>

            {Array(+data?.stoneNo)
              .fill(undefined)
              ?.map((_, index) => {
                return (
                  <tr key={index}>
                    <td style={{ display : 'none' }}>{+1 + index}</td>
                    <td>{data?.cuttingNumber}</td>
                    <td>{data?.totalWeight}</td>
                    <td>
                      <input
                        onChange={(e) =>
                          onChangeHandler(
                            1 + index,
                            e?.target?.value,
                            e?.target?.name,
                            (1000 + index)
                          )
                        }
                        placeholder="enter stone no"
                        defaultValue={(1000 + index)}
                        name="stone"
                      />
                    </td>
                    <td>
                      <input
                        onChange={(e) =>
                          onChangeHandler(
                            1 + index,
                            e?.target?.value,
                            e?.target?.name,
                            (1000 + index)
                          )
                        }
                        placeholder="enter stone weight"
                        name="currenteWeight"
                      />
                    </td>
                    <td>
                      <input
                        onChange={(e) =>
                          onChangeHandler(
                            1 + index,
                            e?.target?.value,
                            e?.target?.name,
                            (1000 + index)
                          )
                        }
                        placeholder="enter stone id"
                        name="stoneId"
                      />
                    </td>
                    <td>
                      <input
                        onChange={(e) =>
                          onChangeHandler(
                            1 + index,
                            e?.target?.value,
                            e?.target?.name,
                            (1000 + index)
                          )
                        }
                        placeholder="enter barcode no"
                        name="barcodeNo"
                      />
                    </td>
                  </tr>
                );
              })}
            {Array(+data?.stoneNo).fill(undefined).length > 0 && (
              <tr>
                <td colspan="6">
                  {" "}
                  <button
                    onClick={createAllBarcodes}
                    className="btn btn-primary my-2"
                  >
                    Create All Barcodes
                  </button>{" "}
                </td>
              </tr>
            )}
          </table>
        </div>

        <div
          className="col-md-12"
          style={{ border: "1px solid rgb(206 200 200)" }}
        >
          <h5 className="text-center  ml-4 mb-5 mt-4">Barcodes</h5>
          <table className="table table-hover mb-5">
            <thead>
              <tr>
                <th>Id</th>
                <th>Kapan No</th>
                <th>Total Weight</th>
                <th>Stone </th>
                <th>Current Weight</th>
                <th>Stone Id</th>
                <th>Barcode Number</th>
              </tr>
            </thead>
            {/* {console.info("test123 ",getbarcode)}/ */}
            {getbarcode?.map((item) => {
              return (
                <tbody id="output">
                  <tr>
                    <td>1</td>
                    <td>{item.cuttingno}</td>
                    <td>{item.totalweight}</td>
                    <td>{item.stoneweight}</td>
                    <td>{item.currentweight}</td>
                    <td>{item.stoneid}</td>
                    <td>
                      <Barcodes
                        value={item.barcodenumber}
                        format="CODE39"
                        width="1"
                        height="30"
                      />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Barcode;
