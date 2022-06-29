import React,{useState ,useEffect, useRef} from 'react'
import { useReactToPrint } from 'react-to-print';
import { getStockByParty } from "../../Services";

const Modal = ({ show, handleClose}) => {
    const showHideClassName = show ? "modal d-block" : "modal d-none";

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    const [dataList, setdataList] = useState([]);
    const [partyName, setpartyName] = useState([]);


    useEffect(() => {
      getData();
    }, []);
  
    const getData = async () => {
      const response = await getStockByParty('62b7f3319ba68b4ad1026b7a',1000,1);
      console.log("res",response?.data?.results)
      setdataList(response?.data?.results);
      setpartyName(response?.data?.results[0].party.name);

    };
  return (
    <div className={showHideClassName}>
        <div className="modal-container">
            <div className='row col-md-6'>
            <div className='p12' ref={componentRef}>
                <table>
                    <tr>
                        <th className='text-center'><h4>MAA BRAHMANI GEMS</h4></th>
                    </tr>
                    <tr></tr>
                    <tr className='text-left'>
                        <td>GSTIN : 24ASD76kKI5685</td>
                    </tr>
                </table>
                <table>
                    <tr className='text-left'>
                        <td>Party :</td>
                        <td colspan='3'>{partyName}</td>
                    </tr>
                    <tr>
                        <td className='text-left'>Process :</td>
                        <td className='text-left'>Laser</td>
                        <td className='text-right'>Date :</td>
                        <td className='text-right'>27/06/2022</td>
                    </tr>
                    <tr>
                        <td className='text-left'>Jangad No :</td>
                        <td className='text-left'>25</td>
                        <td className='text-right'>Time :</td>
                        <td className='text-right'>11:50 AM</td>
                    </tr>
                </table>
                <table>
                    <thead>
                        <th>sr.no</th>
                        <th>Kapan</th>
                        <th>Stone ID</th>
                        <th>Comment</th>
                        <th>Weight</th>
                    </thead>
                    <tbody>
                        {dataList?.map((item, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <th>{item?.lot_no}</th>
                                    <td>{item?.stone_id}</td>
                                    <td></td>
                                    <td>{item?.weight}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            
            </div>
            <div className='row col-md-6'>
            <div className='p12' ref={componentRef}>
                <table>
                    <tr>
                        <th className='text-center'><h4>MAA BRAHMANI GEMS</h4></th>
                    </tr>
                    <tr></tr>
                    <tr className='text-left'>
                        <td>GSTIN : 24ASD76kKI5685</td>
                    </tr>
                </table>
                <table>
                    <tr className='text-left'>
                        <td>Party :</td>
                        <td colspan='3'>{partyName}</td>
                    </tr>
                    <tr>
                        <td className='text-left'>Process :</td>
                        <td className='text-left'>Laser</td>
                        <td className='text-right'>Date :</td>
                        <td className='text-right'>27/06/2022</td>
                    </tr>
                    <tr>
                        <td className='text-left'>Jangad No :</td>
                        <td className='text-left'>25</td>
                        <td className='text-right'>Time :</td>
                        <td className='text-right'>11:50 AM</td>
                    </tr>
                </table>
                <table>
                    <thead>
                        <th>sr.no</th>
                        <th>Kapan</th>
                        <th>Stone ID</th>
                        <th>Comment</th>
                        <th>Weight</th>
                    </thead>
                    <tbody>
                        {dataList?.map((item, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <th>{item?.lot_no}</th>
                                    <td>{item?.stone_id}</td>
                                    <td></td>
                                    <td>{item?.weight}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
           
            </div>
            <button className='btn btn-primary mr-20' onClick={handlePrint}>Print</button>
            <button className="btn btn-danger btn-custom modal-close" onClick={handleClose}>
                Close
            </button>
           
        </div>
    </div>
  )
}

export default Modal