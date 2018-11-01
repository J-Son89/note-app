import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Editor from 'draft-js-plugins-editor'
import { Button, Glyphicon } from 'react-bootstrap'
import { RichUtils, getDefaultKeyBinding, convertToRaw } from 'draft-js'
import { BlockStyleControls } from './BlockStyleControls'
import { InlineStyleControls } from './InlineStyleControls'
import 'draft-js/dist/Draft.css'
import './index.css'

// const styleMap = {
//   CODE: {
//     backgroundColor: 'rgba(0, 0, 0, 0.05)',
//     fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
//     fontSize: 16,
//     padding: 2,
//   },
// };

class NoteEditor extends Component {
  constructor (props) {
    super(props)
    const { activeNote } = props
    this.state = {
      id: activeNote.id,
      title: activeNote.title,
      note: activeNote.note
    }

    this.focus = () => this.editor.focus()
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeNote = (note) => this.setState({ note })
    this.handleKeyCommand = this._handleKeyCommand.bind(this)
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this)
    this.toggleBlockType = this._toggleBlockType.bind(this)
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this)
    this.getBlockStyle = this.getBlockStyle.bind(this)
  }

  componentDidUpdate () {
    const { activeNote } = this.props
    if (activeNote.id !== this.state.id) {
      this.setState({
        id: activeNote.id,
        title: activeNote.title,
        note: activeNote.note
      })
    }
  }

  onChangeTitle (e) {
    const newVal = e.currentTarget.value
    this.setState({
      title: newVal
    })
  }

  _handleKeyCommand (command, note) {
    const newState = RichUtils.handleKeyCommand(note, command)
    if (newState) {
      this.onChangeNote(newState)
      return true
    }
    return false
  }

  _mapKeyToEditorCommand (e) {
    switch (e.keyCode) {
      case 9: // TAB
        const newEditorState = RichUtils.onTab(
          e,
          this.state.note,
          4 /* maxDepth */
        )
        if (newEditorState !== this.state.note) {
          this.onChangeNote(newEditorState)
        }
        return
      default:
    }
    return getDefaultKeyBinding(e)
  }

  _toggleBlockType (blockType) {
    this.onChangeNote(
      RichUtils.toggleBlockType(
        this.state.note,
        blockType
      )
    )
  }

  _toggleInlineStyle (inlineStyle) {
    this.onChangeNote(
      RichUtils.toggleInlineStyle(
        this.state.note,
        inlineStyle
      )
    )
  }

  getBlockStyle (block) {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote'
      default: return null
    }
  }

  render () {
    const { title, note } = this.state
    const { saveNoteFunction, activeNote } = this.props
    const rawNote = JSON.stringify(convertToRaw(note.getCurrentContent()))
    const rawActiveNote = JSON.stringify(convertToRaw(activeNote.note.getCurrentContent()))
    const noChangesMade = rawNote === rawActiveNote
    const { id } = activeNote

    let className = 'RichEditor-editor'
    var contentState = note.getCurrentContent()
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder'
      }
    }

    return (
      <div className='note-editor-container'>

        <div className='RichEditor-root'>
            <input type='text' className='note-editor-title' value={title} onChange={this.onChangeTitle} />
          <BlockStyleControls
            editorState={note}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={note}
            onToggle={this.toggleInlineStyle}
          />
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={this.getBlockStyle}
              customStyleMap={this.styleMap}
              editorState={note}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.onChangeNote}
              placeholder='Write your note here...'
              ref={(ref) => {
                this.editor= ref
                return 1
                }}
              spellCheck
            />
          </div>
        </div>
        <div className='save-note-btn-container'>
          <Button disabled={noChangesMade} bsStyle='primary' className='save-note-btn' onClick={x => { saveNoteFunction(id, title, note) }}>
            <Glyphicon glyph='glyphicon glyphicon-floppy-disk' />
          </Button>
        </div>
      </div>
    )
  }
}

NoteEditor.propTypes = {
  activeNote: PropTypes.object,
  saveNoteFunction: PropTypes.func,
  lastSave: PropTypes.object
}

export default NoteEditor
