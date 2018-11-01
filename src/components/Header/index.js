import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import CreateNote from '../CreateNote'
import logo from '../../images/notepad.png'
import './index.less'

export const Header = (props) => {
  const { createNoteFunction } = props
  return (

    <Navbar staticTop fluid collapseOnSelect className='header-container'>
      <Navbar.Header>
        <Navbar.Brand >
          <a href='/'> <img alt='logo' src={logo} /></a>
          <h1>Notes</h1>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        <CreateNote createNoteFunction={createNoteFunction} />
      </Nav>
    </Navbar>

  )
}

export default Header
