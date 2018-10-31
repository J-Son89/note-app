import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const CreateNote = (props) => {
  const { createNoteFunction } = props
  return (
    <Button bsStyle='primary' bsSize='large' onClick={createNoteFunction}> + Create</Button>
  )
}

CreateNote.propTypes = {
  createNoteFunction: PropTypes.Function
}

export default CreateNote
