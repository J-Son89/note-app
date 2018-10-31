import { notesActions } from '../constants/constants'
import {EditorState, convertFromRaw} from 'draft-js';

const initialState = {
  notes: [],
  notesLoaded: false,
  activeNote: {
    id: '',
    title: 'New Note',
    note: EditorState.createEmpty()
  }
}

export function notesReducer (state = initialState, action) {
  switch (action.type) {
    case (notesActions.SET_NOTES): {
      return Object.assign({}, state, {
        notes: action.notes,
        notesLoaded: true
      })
    }
    case (notesActions.SET_ACTIVE_NOTE): {
      const{id,title,note} = action.activeNote
      const editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(note))
      );
      return Object.assign({}, state, {
        activeNote:{
          id:id,
          title:title,
          note:editorState
        } 
      })
    }
    case (notesActions.UPSERT_NOTE): {
      const { id, title, note } = action
      let { notes } = state
      let newNotes
      newNotes = notes.slice()
      let index = notes.findIndex(note => note.id === id)
      newNotes[index] = { id, title, note }
      return Object.assign({}, state, {
        notes: newNotes,
        activeNote: {
          id,
          title,
          note
        }
      })
    }
    default:
      return state
  }
}
