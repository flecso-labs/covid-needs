import React from 'react'
import ReactDOM from 'react-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

function NavigationBar() {
    return (
      <div>
          <Navbar bg="light" expand="lg" fixed="top">
            <Navbar.Brand href="/">Flesco</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/">What We Do</Nav.Link>
                    <Nav.Link href="/">Business Plans</Nav.Link>
                    <Nav.Link href="/">Why Us</Nav.Link>                   
                    <NavDropdown title="Customer Portal" id="basic-nav-dropdown">
                        <NavDropdown.Item href="login">Company Sign-in</NavDropdown.Item>
                        <NavDropdown.Item href="register">Register your Company</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
          </Navbar>
      </div>
    );
  }

export default NavigationBar;