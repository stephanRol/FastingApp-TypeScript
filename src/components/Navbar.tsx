import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <div>{new Date().toLocaleTimeString()}</div>
            <div>{new Date().toLocaleDateString()}</div>
            <ul>
                <li ><Link to="/" style={{ color: "rgb(10, 220, 204)" }}>Home</Link></li>
                <li><Link to="/fast" style={{ color: "rgb(10, 220, 204)" }}>Fast Stopwatch</Link></li>
            </ul>
        </div>
    )
}

export default Navbar
