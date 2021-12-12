import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <div>{new Date().toLocaleTimeString()}</div>
            <div>{new Date().toLocaleDateString()}</div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/fast">Fast Stopwatch</Link></li>
            </ul>
        </div>
    )
}

export default Navbar
