import './Home.css';

import { Link } from 'react-router-dom'

function Home() {
    return(
        <div className="home">
            <img src={'/logo.png'} className="logo" />
            <Link to="/select" style={{textDecoration:'none'}}><div className="start" href="/select" > Start </div></Link>
        </div>
    )
}

export default Home