import React,{useState ,useEffect} from 'react'
import { deleteParty, fetchParty } from "../Services";
import { Link } from 'react-router-dom';

function PartyList() {

    const [searchTerm, setSearchTerm] = useState("");
    const [data, setdata] = useState([])

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

    const getData = async () => {
        const result = await fetchParty(1000,1,searchTerm)
        setdata(result?.data?.results)
    }

    
  // delete party with confirmation
    const onClickDeleteHandler = (id) => {
        if(window.confirm('Are you sure want to delete this User ?')){
        deleteParty(id).finally(() => getData(), setParty(defaultValue))
        }
    }

    return (
        <div className='container'>
            <h4 className="mt-3 text-success mb-4">View All Party List</h4>
            <div className='row btn-custom'>
                <div className='col-md-2'>
                    <Link className='btn btn-primary' to='/party/1'>Generate InOut Party</Link>
                </div>
                <div className='col-md-2'>
                    <Link className='btn btn-primary' to='/party/2'>Generate Outside Party</Link>
                </div>
            </div>
            <div className="row margin15 p0">
                <div className="col-md-12"  style={{ border: "1px solid rgb(206, 200, 200)" }}>
                <div className="d-flex">
                    <h5 className="text-center  ml-4 mb-5 mt-4">Party List</h5>
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

                        <td> <button className="btn btn-info" onClick={() => onClickDeleteHandler(item?.id)}>Delete</button> </td>
                    </tr>
                    })}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}

export default PartyList