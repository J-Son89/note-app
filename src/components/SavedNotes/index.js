import React from 'react'
import { ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './index.less'

const SavedNotes = (props) => {
  const { notesLoaded, notes, showClicked } = props
  if (!notesLoaded) {
    return <p className='saved-notes-list-loading'>loading...</p>
  }
  return (
    <ListGroup className='saved-notes-list'>
      {notes.map((note, i) => {
        return (
          <ListGroupItem className='saved-notes-list-item' key={i}
            onClick={x => { showClicked(note.id) }}>
            {note.title}
            <Glyphicon className='saved-notes-list-item-arrow' glyph='glyphicon glyphicon-chevron-right' />
          </ListGroupItem>
        )
      }
      )}
    </ListGroup>
  )
}

SavedNotes.propTypes = {
  notes: PropTypes.array,
  showClicked: PropTypes.func
}

export default SavedNotes
