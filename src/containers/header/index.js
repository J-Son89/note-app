import React, { Component } from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import logo from '../../images/notepad.png'
import './index.less'

class Header extends Component {
  render () {
    return (

      <Navbar staticTop fluid collapseOnSelect>

        <Navbar.Header>
          <Navbar.Brand>
            <a href='/'> <img alt='logo' src={logo} /></a>
            <h1>Notes</h1>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <Button bsStyle='primary' bsSize='large'> + Create</Button>
        </Nav>
      </Navbar>

    )
  }
}

export default Header
