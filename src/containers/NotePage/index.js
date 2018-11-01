import React, { Component } from 'react'
import Header from '../../components/Header'
import SavedNotes from '../../components/SavedNotes'
import NoteEditor from '../../components/NoteEditor'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getAllNotes, saveNote, getNote, createNote } from '../../thunk/note-editor-thunk'
import './index.less'

class NotePage extends Component {
  constructor (props) {
    super(props)
    this.createNote = this.createNote.bind(this)
    this.showClicked = this.showClicked.bind(this)
    this.saveNote = this.saveNote.bind(this)
  }
  componentDidMount () {
    const { noteState, dispatch } = this.props
    if (!noteState.notesLoaded) {
      dispatch(getAllNotes())
    }
  }
  createNote (newId) {
    this.props.dispatch(createNote())
  }
  showClicked (id) {
    this.props.dispatch(getNote(id))
  }
  saveNote (id, title, note) {
    this.props.dispatch(saveNote(id, title, note))
  }
  render () {
    const { notes, notesLoaded, activeNote } = this.props.noteState
    return (
      <Grid className='main-grid'>
        <Row className='show-grid header'>
          <Col sm={12} md={12} lg={12} >
            <Header createNoteFunction={this.createNote} />
          </Col>
        </Row>
        <Row className='show-grid main-content'>
          <Col xs={12} sm={5} md={4} lg={4} xlg={3}>
            <SavedNotes notesLoaded={notesLoaded} notes={notes} showClicked={this.showClicked} />
          </Col>
          <Col xs={12} sm={7} md={8} lg={8} xlg={9}>
            <NoteEditor activeNote={activeNote} saveNoteFunction={this.saveNote} />
          </Col>
        </Row>
      </Grid>
    )
  }
};

NotePage.propTypes = {
  notes: PropTypes.array
}

const mapStateToProps = (state) => ({ noteState: state.notes })
export default connect(mapStateToProps)(NotePage)
