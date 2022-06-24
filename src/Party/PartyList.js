import React,{useState ,useEffect} from 'react'
import {updateParty, deleteParty, fetchParty } from "../Services";
import { Link } from 'react-router-dom';
import Modal from "./Modal";
import ReactLoader from 'react-loader';

function PartyList() {

    const [valurToEdit, setvalurToEdit] = useState({})
    const [isOpenModel, setisOpenModel] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setdata] = useState([])
    const [loaded, setLoaded] = useState(false);

    const formatedStatus = (selectType) => {
        switch (selectType) {
          case 0:
            return "Outside";
          case 1:
            return "Inside";
          default:
            return "Inside";
        }
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
        console.log("valurToEdit",valurToEdit)
    }

    const updateHandler = () => {
        const data = JSON.stringify({
            name: valurToEdit?.name,
            mobileno: valurToEdit?.mobileno,
            description: valurToEdit?.description,
            partyId: valurToEdit?.id,
            type: valurToEdit?.status
          })
          console.log("data",data)
        updateParty(data).finally(() => {
        getData(), setvalurToEdit({}), setisOpenModel(false)
        });
    }

    const getData = async () => {
        const result = await fetchParty(1000,1,searchTerm)
        console.log("res",result)
        setdata(result?.data?.results)
        setLoaded(true)
    }

    const modalClose = () => {
        setisOpenModel(false)
    }
    
  // delete party with confirmation
    const onClickDeleteHandler = (id) => {
        if(window.confirm('Are you sure want to delete this User ?')){
        deleteParty(id).finally(() => getData(), setParty(defaultValue))
        }
    }

    return (
        <>
            <Modal show={isOpenModel} handleClose={modalClose}>
                <div>
                <h4 className="mt-3 text-success mb-4">Update Party</h4>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control  mb-4"
                            name="name"
                            defaultValue={valurToEdit?.name}
                            onChange={onChangeHandlerForEdit}
                            required=""
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone No</label>
                        <input
                            type="number"
                            className="form-control  mb-4"
                            name="mobileno"
                            onChange={onChangeHandlerForEdit}
                            defaultValue={valurToEdit?.mobileno}
                            required=""
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input
                            type="text"
                            className="form-control  mb-4"
                            name="description"
                            onChange={onChangeHandlerForEdit}
                            defaultValue={valurToEdit?.description}
                            required=""
                        />
                    </div>
                    <div className='form-group'>
                        <label>Type</label>
                        <select style={{ minWidth : 200 }} name="status" className="form-control btn-custom" onChange={onChangeHandlerForEdit}>
                            <option value={0} selected={valurToEdit?.status === 0}>Outside</option>
                            <option value={1} selected={valurToEdit?.status === 1}>Inside</option>
                        </select>
                    </div>
                    <br />

                    <button className="btn btn-success" onClick={updateHandler}>
                        Update Party
                    </button>
                </div>
            </Modal>
            <ReactLoader loaded={loaded}>
                <div className='container'>
                    <h4 className="mt-3 text-success mb-4">View All Party List</h4>
                    <div className='row btn-custom'>
                        <div className='col-md-4'></div>
                        <div className='col-md-2'>
                            <Link className='btn btn-primary' to='/party/1'>Generate Inhouse Party</Link>
                        </div>
                        <div className='col-md-2'>
                            <Link className='btn btn-primary' to='/party/2'>Generate Outside Party</Link>
                        </div>
                        <div className='col-md-4'></div>
                    </div>
                    <div className="row margin15 p0">
                        <div className="col-md-12"  style={{ border: "1px solid rgb(206, 200, 200)" }}>
                        <div className="d-flex">
                            <h5 className="text-center  ml-4 mb-5 mt-4 mr-20">Party List</h5>
                            <div className="mb-5 mt-4 margin15">
                            <input
                                type="text"
                                className="form-control outline-gray bg-transparent border-0"
                                placeholder="Search party by name"
                                value={searchTerm}
                                onChange={(e) => {
                                setSearchTerm(e?.target?.value);
                                }}
                            />
                            </div>
                        </div>
                        <table className="table table-hover mb-5">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Phone No</th>
                                <th>Description</th>
                                <th>Type</th>

                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data?.map((item,index) => {
                                return  <tr>
                                <td>{index+1}</td>
                                <td>{item?.name}</td>
                                <td>{item?.mobileno}</td>
                                <td>{item?.description}</td>
                                <td>{formatedStatus(item?.type)}</td>
                                <td>
                                    <button className="btn btn-success mr-20" onClick={() => onClickEdit(item)}>Edit</button> 
                                    <button className="btn btn-info" onClick={() => onClickDeleteHandler(item?.id)}>Delete</button>
                                </td>
                            </tr>
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

export default PartyList