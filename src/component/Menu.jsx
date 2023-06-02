import React from 'react'

import { NavLink } from 'react-router-dom'

function Menu(props){
    return(
        <nav className='navbar navbar-expand-md navbar-dark bg-success'>
            <div className='container'>
                <NavLink to={'/'} className="navbar-brand">Music player</NavLink>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id='menu'>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to={'/'} className="nav-link">Music</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink to={'/track'}  className="nav-link">Track</NavLink>
                        </li> */}
                       
                    </ul>
                    
                </div>
            </div>
        </nav>
        
    )
}

export default Menu