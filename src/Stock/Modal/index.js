import React,{useState ,useEffect, useRef} from 'react'
import { useReactToPrint } from 'react-to-print';

const Modal = ({ show, data, partyName, handleClose}) => {
    const showHideClassName = show ? "modal d-block" : "modal d-none";

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });
    const [dataList ,setDataList] = useState();
    const today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var time =  today.getHours() + ":" + today.getMinutes();

    useEffect(() => {
       
        setDataList(data);
    }, []) 
       
   let totalWeight = 0 ;
   let totalkapn = 0 ;

  return (
    <div className={showHideClassName}>
        <div className="modal-container">
            <div className="row jangadDetail" ref={componentRef}>
                <div className='col-md-6'>
                    <div className='p12' >
                        <table>
                            <tr>
                                <th className='text-center'><h4>MAA BRAHMANI GEMS</h4></th>
                            </tr>
                            <tr></tr>
                            <tr className='text-left'>
                                <td>GSTIN : 24ABSFM5443Q1ZG</td>
                            </tr>
                        </table>
                        <table>
                            <tr className='text-left'>
                                <td>Party :</td>
                                <td colSpan='3'><input type="text" Value={partyName} /></td>
                            </tr>
                            <tr>
                                <td className='text-left'>Process :</td>
                                <td className='text-left'><input type="text" Value='Laser' /></td>
                                <td className='text-right'>Date :</td>
                                <td className='text-right'><input type="text" Value={date} /></td>
                            </tr>
                            <tr>
                                <td className='text-left'>Jangad No :</td>
                                <td className='text-left'><input type="text" Value='25' /></td>
                                <td className='text-right'>Time :</td>
                                <td className='text-right'><input type="text" Value={time} /></td>
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
                                    totalWeight += parseFloat(item?.weight);
                                    totalkapn += parseFloat(item?.lot_no);
                                    return (
                                        <tr> 
                                            <td>{index + 1}</td>
                                            <td>{item?.lot_no}</td>
                                            <td>{item?.stone_id}</td>
                                            <td></td>
                                            <td>{item?.weight}</td>
                                        </tr>   
                                    );
                                })}
                                <tr>
                                    <th>Total</th>
                                    <th>{totalkapn.toFixed(2)}</th>
                                    <td></td>
                                    <td></td>
                                    <th>{totalWeight.toFixed(2)}</th>
                                </tr>
                                <tr>
                                    <td colSpan={3}></td>
                                    <td colSpan={5}>Receiver Sign</td>
                                </tr>                               
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='p12'>
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
                                <td colSpan='3'><input type="text" Value={partyName} /></td>
                            </tr>
                            <tr>
                                <td className='text-left'>Process :</td>
                                <td className='text-left'><input type="text" Value='Laser' readonly/></td>
                                <td className='text-right'>Date :</td>
                                <td className='text-right'><input type="text" Value={date} /></td>
                            </tr>
                            <tr>
                                <td className='text-left'>Jangad No :</td>
                                <td className='text-left'><input type="text" Value='25' /></td>
                                <td className='text-right'>Time :</td>
                                <td className='text-right'><input type="text" Value={time} /></td>
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
                                            <td>{item?.lot_no}</td>
                                            <td>{item?.stone_id}</td>
                                            <td></td>
                                            <td>{item?.weight}</td>
                                        </tr>
                                    );
                                })}
                                <tr>
                                    <th>Total</th>
                                    <th>{totalkapn.toFixed(2)}</th>
                                    <td></td>
                                    <td></td>
                                    <th>{totalWeight.toFixed(2)}</th>
                                </tr>
                                <tr>
                                    <td colSpan={3}></td>
                                    <td colSpan={5}>Receiver Sign</td>
                                </tr>  
                            </tbody>
                        </table>
                    </div>
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