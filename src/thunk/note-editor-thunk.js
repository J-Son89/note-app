import axios from 'axios';
import { notesAction } from '../actions/notesActions';
import {config} from '../config';
import {EditorState,convertToRaw} from 'draft-js';


const {auth,baseURL} =config

export function getAllNotes () {
  return function (dispatch) {
    return axios.get(`${baseURL}/notes`, {
      auth
    })
      .then((res) => {
        dispatch(notesAction.setNotes(res.data.data))
      }).catch((error) => {
        console.log(error)
      })
  }
};
export function getNote(id) {
  return function (dispatch) {
    return axios.get(`${baseURL}/notes/${id}`, {
        auth
    })
      .then((res) => {
        dispatch(notesAction.setActiveNote(res.data.data))
      }).catch((error) => {
        console.log(error)
      })
  }
};

export function newNote(newId){
  const title ='New Note'
  const note = EditorState.createEmpty()
  const rawContentState = convertToRaw(
    note.getCurrentContent()
  );
  const JSONNote = JSON.stringify(rawContentState)

  return function (dispatch) {
    return axios.post(`${baseURL}/notes`, 
    {
      title: title,
      note: JSONNote
    },
    {
        auth
    })
    .then((res) => {
        Promise.all([
        dispatch(notesAction.upsertNote(newId,title,note))
      ]).then(
        function(values) {
          console.log(values);
        })
      }).catch((error) => {
        console.log(error)
      })
  }
};

export function createNote () {
  return function (dispatch) {
    return axios.get(`${baseURL}/notes`, 
    {
        auth
    })
      .then((res) => {
        const notes = res.data.data 
        const newId = notes.length
        notes.filter( (note) => { return note.title === 'New Note' }).length === 0 ?
        dispatch(newNote(newId)) : 
        alert('Please change note title and save before creating a new note')
      }).catch((error) => {
        console.log(error)
      })
  }
};

export function saveNote (id, title, note) {
  const rawContentState = convertToRaw(
    note.getCurrentContent()
  );
  const JSONNote = JSON.stringify(rawContentState)
  return function (dispatch) {
    const url = `${baseURL}/notes/${id}`
    return axios.post(url,
      { 
        title:title,
        note:JSONNote
      },
      {
        auth
      })
      .then((res) => {
        dispatch(notesAction.upsertNote(id,title,note))
        dispatch(getAllNotes())
      }).catch((error) => {
        console.log(error)
      })
  }
};
