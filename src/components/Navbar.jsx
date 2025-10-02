import {Link} from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar" style={{fontSize:25,display:"flex",width:"100%",justifyContent:"space-between",paddingLeft:20}}>
            <div>WellnessWeb</div>
            <div className="nav-items" style={{display:"flex",width:"30%",justifyContent:"space-around",textDecoration:'none'}}>
                <Link to={"/"} style={{textDecoration:'none',color:'black'}}>Home</Link>
                <Link to={"/languages"} style={{textDecoration:'none',color:'black'}}>Languages</Link>
                <Link to={"/about"} style={{textDecoration:'none',color:'black'}}>About</Link>
            </div>
        </nav>
    );
}

export default Navbar;