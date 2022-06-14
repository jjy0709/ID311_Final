import { Link } from 'react-router-dom'
import React from 'react'

import './Home.css';

function Home() {  
    return(
        <div className="home">
            <img src={'/logo.png'} className="logo" />
            <Link to="/room" style={{textDecoration:'none'}}><div className="start" href="/select" > START </div></Link>
        </div>
    )
}

export default Home