import React, { useState, useEffect } from 'react';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Collapse
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { auth, db } from '../firebase';

const Header = props => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    // console.log("Header: props", props);

    return (
        <div style={{height: "56px"}}>
            <Navbar color="dark" dark expand="md" fixed="top">
                <NavbarBrand href="/">Photo Gallery</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>

                {props.user ? (
                    <Nav className="ml-auto">
                        <NavItem>
                            <NavLink exact to="/logout" className="NavLink" onClick={()=>auth.signOut()}>Logout</NavLink>
                        </NavItem>
                    </Nav>) : (
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink exact to="/login" className="NavLink">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/signup" className="NavLink">Signup</NavLink>
                        </NavItem>
                    </Nav>)}
                
                </Collapse>
            </Navbar>
        </div>
    )
}

export default Header;
