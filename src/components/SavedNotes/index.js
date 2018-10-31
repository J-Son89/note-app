import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './index.css';

const SavedNotes = (props) => {
  const { notesLoaded, notes, showClicked, activeNote } = props
  if (!notesLoaded) {
    return <p>loading...</p>
  }
  return (
    <ListGroup>
      {notes.map((note, i) => {
        return (
          <ListGroupItem key={i}
            className={note.id === activeNote.id ? 'active' : ''}
            onClick={x => { showClicked(note.id) }}>
            {note.title}
          </ListGroupItem>
        )
      }
      )}
    </ListGroup>
  )
}

SavedNotes.propTypes = {
  notes: PropTypes.Array,
  showClicked: PropTypes.Function
}

export default SavedNotes
