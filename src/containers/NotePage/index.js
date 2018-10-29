import React, { Component } from 'react';
import Header from '../../components/Header';
import SavedNotes from '../../components/SavedNotes';
import NoteEditor from '../../components/NoteEditor';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {notesAction} from '../../actions/notesActions';
import {getAllNotes} from '../../thunk/note-editor-thunk';

class NotePage extends Component {
    constructor(props) {
      super(props);
      this.createNote = this.createNote.bind(this);
      this.showClicked = this.showClicked.bind(this);
    }
    componentDidMount() {
      const {noteState, dispatch} = this.props;
      if(!noteState.notesLoaded) {
        dispatch(getAllNotes());
      }
    }
    createNote() {
      this.props.dispatch(notesAction.createNote());
    }
    showClicked(id) {
      this.props.dispatch(notesAction.setActiveNote(id));
    }
    render() {
    const {notes, notesLoaded, activeNote,id} = this.props.noteState;

      return (
        <Grid>
          <Row className='show-grid'>
            <Col sm={12} md={12} lg={12} >
              <Header createNoteFunction={this.createNote} />
            </Col>
          </Row>
          <Row className='show-grid'>
            <Col xs={12} sm={3} md={3} lg={3} xlg={3}>
              <div className='main-content container-fluid text-center'>
                <SavedNotes notesLoaded={notesLoaded} notes={notes} showClicked={this.showClicked} />
              </div>
            </Col>
            <Col xs={12} sm={9} md={9} lg={9} xlg={9}>
              <NoteEditor activeNote={activeNote} id = {id}/>
            </Col>
          </Row>
        </Grid>
      );
    }
};

NotePage.propTypes = {
    notes:PropTypes.object
};

const mapStateToProps = (state) => ({noteState: state.notes});
export default connect(mapStateToProps)(NotePage);
