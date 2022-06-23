import React,{useState ,useEffect} from 'react'
import ReactLoader from 'react-loader';
import { Link } from 'react-router-dom';
import {
    deleteStock,
    fetchStoke,
    updateStock,
  } from "../Services";
import Modal from "./Modal";

function StockList() {

    const [valurToEdit, setvalurToEdit] = useState({})
    const [isOpenModel, setisOpenModel] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [dataList, setdataList] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const getData = async () => {
        const st0kes = await fetchStoke(1000, 1);
        setdataList(st0kes?.data?.results);
        setLoaded(true);
    };
    
    useEffect(() => {
        getData()
    }, [searchTerm])

    const onClickEdit = (id) => {
        setvalurToEdit(id)
        setTimeout(() => {
          setisOpenModel(true)
        }, 700);
    };

    const onChangeHandlerForEdit = (e) => {
        setvalurToEdit({ ...valurToEdit,  [e.target.name]: e.target.value })
    }
      
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
            </ReactLoader>
        </>       
    )
}

export default StockList