import { notesActions } from '../constants/constants'

const notesAction = {
  setNotes: (notes) => ({
    type: notesActions.SET_NOTES,
    notes: notes
  }),
  createNote: () => ({
    type: notesActions.CREATE_NOTE
  }),
  setActiveNote: (activeNote) => ({
    type: notesActions.SET_ACTIVE_NOTE,
    activeNote: activeNote
  }),
  upsertNote: (id, title, note) => ({
    type: notesActions.UPSERT_NOTE,
    id: id,
    title: title,
    note: note
  })
}

export { notesAction }
