import React, { useState, useEffect } from 'react'
import ReactLoader from 'react-loader';
import { Link, useNavigate } from 'react-router-dom';
import {
    fetchStoke,
    updateStock,
} from "../Services";
import Modal from "./Modal";

function StockList() {

    const [valurToEdit, setvalurToEdit] = useState({})
    const [isOpenModel, setisOpenModel] = useState(false)
    const [dataList, setdataList] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const navigate = useNavigate()

    const getData = async () => {
        const stokes = await fetchStoke(1000, 1);
        const data = []

        stokes?.data?.results?.map((item) => {
            const elm = data.find(element => element?.party?.name === item?.party?.name)
            if (!elm) {
                item.total = 1
                data.push(item)
            }
            else {
                const currentDetails = data.findIndex(element => element?.party?.name === item?.party?.name)
                data[currentDetails].total = data[currentDetails]?.total + 1
            }
        })
        // console.log("mydata", data)
        let gtotal = 0
        const arr = data.map(item => {
            gtotal = gtotal + parseInt(item.total)
            return item
        })
        data.push({ gtotal })
        // console.log(arr);
        setdataList(data);
        setLoaded(true);
    };

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
                return "()";
        }
    }

    return (
        <>
            <Modal show={isOpenModel} handleClose={modalClose}>
                <div>
                    <select style={{ minWidth: 200 }} name="status" className="btn-custom" onChange={onChangeHandlerForEdit}>
                        <option value={0} selected={valurToEdit?.status === 0}>Issue</option>
                        <option value={1} selected={valurToEdit?.status === 1}>Receive</option>
                    </select>

                    <br />

                    <button className="btn btn-success" onClick={updateHandler}>
                        Change Status
                    </button>
                </div>
            </Modal>
            <ReactLoader loaded={loaded}>
                <div className='container'>
                    <h4 className="mt-3 text-success mb-4">View All Stock List</h4>
                    <div className='row btn-custom'>
                        <div className='col-md-4'></div>
                        <div className='col-md-2'>
                            <Link className='btn btn-primary' to='/stock/1'>Generate Outside Stock</Link>
                        </div>
                        <div className='col-md-2'>
                            <Link className='btn btn-primary' to='/stock/2'>Generate Issue/Receive Stock</Link>
                        </div>
                        <div className='col-md-4'></div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 margin15" style={{ border: "1px solid rgb(206, 200, 200)" }}>
                            <h5 className="text-center  ml-4 mb-5 mt-4">Stock</h5>
                            <table className="table table-hover mb-5 margin15">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Total Diamond</th>
                                        <th>Party</th>
                                        <th>Type</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataList?.map((item, index) => {
                                        return (

                                            <tr>
                                                <td>{item.gtotal == undefined || null ? index + 1 : <b>Total Diamonds</b>}</td>
                                                <th>{item?.total !== undefined || null ? item?.total : item.gtotal}</th>
                                                <td>{item?.party?.name}</td>
                                                <td>{formatedType(item?.stock_type)} {fomatedParty(item?.outsideParty)}</td>
                                                <td>
                                                    {item.gtotal == undefined || null ?
                                                        (<button
                                                            className="btn btn-success mx-15"
                                                            onClick={() => onClickView(item)}
                                                        >
                                                            View
                                                        </button>) : null}
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
    )
}

export default StockList