import { combineReducers } from 'redux';
import { notesReducer } from './reducer/notes-reducer';

const reducer = combineReducers({
  notes: notesReducer
});

export default reducer;
