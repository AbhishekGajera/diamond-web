import React from 'react'
import { Link } from "react-router-dom";

function index() {
  return (
    <>
        <div className='container'>
            <h4 className="mt-3 text-success mb-4">Dashboard</h4>
              <div className='row'>
                <div className='col-md-12'>
                  <Link className='btn btn-primary' to='/barcode'>Scan Barcode</Link>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <Link className='btn btn-primary' to='/party'>Party Management</Link>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <Link className='btn btn-primary' to='/stock'>stock Management</Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default index;