import React from 'react'
import { Navbar, Nav} from 'react-bootstrap'
import CreateNote from '../CreateNote';
import logo from '../../images/notepad.png'
import './index.css'

export const Header = (props) => {
  const { createNoteFunction } = props;  
  return (

      <Navbar staticTop fluid collapseOnSelect>

        <Navbar.Header>
          <Navbar.Brand>
            <a href='/'> <img alt='logo' src={logo} /></a>
            <h1>Notes</h1>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
        <CreateNote createNoteFunction={createNoteFunction} > </CreateNote>
        </Nav>
      </Navbar>

    );
}

export default Header
