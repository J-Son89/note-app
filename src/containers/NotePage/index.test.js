import React from 'react'
import NotePage from './'
import { createStore, storeEnhancer } from 'redux'
import { render } from 'react-testing-library'
import { Provider } from 'react-redux'
import reducer from '../../global-reducer'
import { EditorState, convertToRaw } from 'draft-js'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'
import { testSamples } from './testSamples'

jest.mock('draft-js/lib/generateRandomKey', () => () => '123')

const middleware = applyMiddleware(
  thunk
)

export function renderWithRedux (ui, initialState) {
  const store = createStore(reducer, initialState, middleware)

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  }
}
//
describe('Note Page', () => {
  it('should render a blank note when the notes loaded and the active note is newly created', () => {
    let param = {
      notes: {
        notesLoaded: true,
        notes: [
          {
            id: 1,
            title: 'New Note',
            note: EditorState.createEmpty()
          }],
        activeNote: {
          id: 1,
          title: 'New Note',
          note: EditorState.createEmpty()
        }
      }
    }

    const { container, queryByValue } = renderWithRedux(
      <NotePage />,
	   		param
    )
    expect(queryByValue('New Note')).toBeTruthy()

    expect(container.firstChild).toMatchSnapshot()
  })
  it('should render "loading..." when notes are not loaded', () => {
    let param = {
      notes: {
        notesLoaded: false,
        notes: [
          {
            id: 1,
            title: 'New Note',
            note: EditorState.createEmpty()
          }],
        activeNote: {
          id: 1,
          title: 'New Note',
          note: EditorState.createEmpty()
        }
      }
    }

    const { container, queryByText } = renderWithRedux(
      <NotePage />,
	   		param
    )
    expect(queryByText('loading...')).toBeTruthy()

    expect(container.firstChild).toMatchSnapshot()
  })
})
