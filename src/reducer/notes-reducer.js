import { notesActions } from '../constants/constants';

const initialState = {
  notes:[],
  notesLoaded: false,
  id:'',
  activeNote: {
    title: 'New Note',
    note: ''
  }
};

export function notesReducer(state = initialState, action) {
  switch(action.type) {
    case (notesActions.SET_NOTES): {
     return Object.assign({}, state, {
        notes: action.notes,
        notesLoaded: true
      });
    }
    case (notesActions.SET_ACTIVE_NOTE): {
     return Object.assign({}, state, {
        activeNote: state.notes[action.id],
        id:action.id
      });
    }
      case (notesActions.CREATE_NOTE): {
     return Object.assign({}, state, {
        activeNote: {
          title: 'New Note',
          note: ''
        },
        id:''
      });
    }
    default:
      return state;
  }
}
