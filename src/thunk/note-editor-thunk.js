import axios from 'axios'
import { notesAction } from '../actions/notesActions'
import { config } from '../config'
import { EditorState, convertToRaw } from 'draft-js'

const { auth, baseURL } = config

export function getAllNotes () {
  return function (dispatch) {
    return axios.get(`${baseURL}/notes`, {
      auth
    })
      .then((res) => {
        const { id } = res.data.data[0]
        dispatch(notesAction.setNotes(res.data.data))
        dispatch(getNote(id))
      }).catch((error) => {
        console.log(error)
      })
  }
};
export function getNote (id) {
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

export function createNote () {
  const title = 'New Note'
  const note = EditorState.createEmpty()
  const rawContentState = convertToRaw(
    note.getCurrentContent()
  )
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
        dispatch(getAllNotes())
        dispatch(notesAction.insertNote())
      }).catch((error) => {
        console.log(error)
      })
  }
};

export function saveNote (id, title, note) {
  const rawContentState = convertToRaw(
    note.getCurrentContent()
  )
  const JSONNote = JSON.stringify(rawContentState)
  return function (dispatch) {
    const url = `${baseURL}/notes/${id}`
    return axios.post(url,
      {
        title: title,
        note: JSONNote
      },
      {
        auth
      })
      .then((res) => {
        dispatch(notesAction.updateNote(id, title, note))
      }).catch((error) => {
        console.log(error)
      })
  }
};
