import { notesActions } from '../constants/constants';

const notesAction = {
  getNotes: () => ({
    type: notesActions.GET_NOTES
  }),
  setNotes:(notes)  => ({
    type: notesActions.SET_NOTES,
    notes:notes
  }),
   getNote: (id) => ({
    type: notesActions.GET_NOTE,
    id: id
  }),
  setNote: (note) => ({
    type: notesActions.GET_NOTE,
    note: note
  }),
  createNote: () => ({
  	type: notesActions.CREATE_NOTE
  }),
  setActiveNote:(id) => ({
  	type: notesActions.SET_ACTIVE_NOTE,
    id: id
  })
 }

 export {notesAction};