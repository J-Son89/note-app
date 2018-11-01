import React from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

export const CreateNote = (props) => {
  const { createNoteFunction } = props
  return (
    <Button bsStyle='default' bsSize='small' onClick={createNoteFunction}> + Create</Button>
  )
}

CreateNote.propTypes = {
  createNoteFunction: PropTypes.func
}

export default CreateNote
