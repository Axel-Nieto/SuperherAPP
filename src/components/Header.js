import React from "react";
import {Nav, Navbar} from 'react-bootstrap';
import logo from '../img/super-logo.png';
import '../index.css';

function Header({setAut}){

    function manejadorLogout(){
        localStorage.clear();
        setAut(false);
    }

    return(
        <div>
            <Navbar bg="dark" variant="dark" fixed="top" expand="sm" className="barra">
                <Navbar.Brand className="mx-3">
                    <img src={logo} alt="logo" width="48px" height="36px"/>
                </Navbar.Brand>

                <Navbar.Toggle/>

                <Navbar.Collapse>
                    <Nav className="text-center">
                        <Nav.Link href="/">HOME</Nav.Link>
                        <Nav.Link href="/search">Search</Nav.Link>
                        <Nav.Link href="https://github.com/Axel-Nieto/SuperherAPP" target="_blank">GitHub</Nav.Link>
                        <Nav.Link onClick={manejadorLogout}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}


export default Header;