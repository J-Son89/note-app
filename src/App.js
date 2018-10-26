import React from 'react'
import './App.css'
import Header from './containers/header'
import SavedNotes from './containers/savedNotes'
import NoteEditor from './containers/noteEditor'
import { Grid, Row, Col } from 'react-bootstrap'
export default class App extends React.Component {
  render () {
    return (
      <Grid>
        <Row className='show-grid'>
          <Col sm={12} md={12} lg={12} >

            <Header />
          </Col>
        </Row>
        <Row className='show-grid'>

          <Col xs={12} sm={3} md={3} lg={3} xlg={12}>
            <div className='main-content container-fluid text-center'>
              <SavedNotes />
            </div>
          </Col>
          <Col xs={12} sm={9} md={9} lg={9} xlg={12}>
            <NoteEditor />
          </Col>

        </Row>
      </Grid>
    )
  }
}

App.propTypes = {
}
