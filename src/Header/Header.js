import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to='/'><a className="navbar-brand" >Dashboard</a></Link>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link to='/barcode'><a className="nav-item nav-link">Barcode</a></Link>
                  <Link to='/stock'><a className="nav-item nav-link">Stock</a></Link>
                  <Link to='/party'><a className="nav-item nav-link">Party</a></Link>
              </div>
            </div>
        </nav>                              
    </div>
  )
}

export default Header