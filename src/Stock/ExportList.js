import { groupBy } from 'lodash';
import React, { useState, useEffect } from 'react'
import ReactLoader from 'react-loader';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import {
    fetchExport,
    updateStock,
} from "../Services";
import Modal from "./Modal";

function ExportList() {

    const [valurToEdit, setvalurToEdit] = useState({})
    const [isOpenModel, setisOpenModel] = useState(false)
    const [data, setdata] = useState([])

    const [loaded, setLoaded] = useState(false);

    const navigate = useNavigate()

  
    const getData = async () => {
        const result = await fetchExport(1000, 1)
        setdata(result?.data?.results)
       
        setLoaded(true)
    }

    useEffect(() => {
        getData()
    }, [])

    const onChangeHandlerForEdit = (e) => {
        setvalurToEdit({ ...valurToEdit, [e.target.name]: e.target.value })
    }

    const modalClose = () => {
        setisOpenModel(false)
    }


    // update status
    const updateHandler = () => {
        const data = JSON.stringify({
            stockId: valurToEdit?.id,
            status: valurToEdit?.status
        })
        updateStock(data).finally(() => {
            getData(), setStock({ ...stock, LotNo: "", stoneId: "" }), setvalurToEdit({}), setisOpenModel(false)
        });
    }

    const onClickView = (item) => {
        navigate(`/stocklist/${item?.party?.id}/${item?.party?.name}`)
    }

    const formatedStatus = (selectType) => {
        switch (selectType) {
            case 0:
                return "Issue";
            case 1:
                return "Receive";
            default:
                return "";
        }
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

    const fomatedParty = (selectOutsideParty) => {
        switch (selectOutsideParty) {
            case 0:
                return "(Job-Work)";
            case 1:
                return "(Merchant)";
            default:
                return "";
        }
    }

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
            <h4 className="mt-3 text-success mb-4">View All Export List</h4>
            {/* <div className="row btn-custom">
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
            </div> */}
            <div className="row">
              <div
                className="col-md-12 margin15"
                style={{ border: "1px solid rgb(206, 200, 200)" }}
              >
                <h5 className="text-center  ml-4 mb-5 mt-4">Export</h5>
                <table className="table table-hover mb-5 margin15">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Stone Id</th>
                      <th>Lot No</th>
                      <th>Weight</th>
                      <th>To Party</th>
                      <th>Original Party</th>
                      <th>Date</th>

                    </tr>
                  </thead>
                  <tbody>
                                    {data?.map((item, index) => {
                                        return <tr>
                                            <td >{index + 1}</td>
                                            <td >{item?.stone_id}</td>
                                            <td >{item?.lot_no}</td>
                                            <td >{item?.weight}</td>

                                            <td >{item?.current_assign?.name}</td>
                                            <td >{item?.party?.name}</td>


                                          
                                            <td>{item?.defaultDate ? moment(item?.defaultDate).format('DD-MM-YYYY') : ''}</td>

                                           
                                        </tr>
                                    })}
                                </tbody>
                </table>
              </div>
            </div>
          </div>
        </ReactLoader>
      </>
    );
}

export default ExportList