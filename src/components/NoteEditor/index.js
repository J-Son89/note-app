import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'draft-js/dist/Draft.css';
import './index.css';
import Editor from "draft-js-plugins-editor"
import { Button } from 'react-bootstrap';
import {RichUtils, getDefaultKeyBinding} from 'draft-js';
import {BlockStyleControls} from '../BlockStyleControls';
import {InlineStyleControls} from '../InlineStyleControls';

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
      note:activeNote.note
    }

    this.focus = () => this.editor.focus();
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeNote = (note) => this.setState({note});
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.getBlockStyle = this.getBlockStyle.bind(this);
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
    _handleKeyCommand(command, note) {
    const newState = RichUtils.handleKeyCommand(note, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    switch (e.keyCode) {
      case 9: // TAB
        const newEditorState = RichUtils.onTab(
          e,
          this.state.note,
          4, /* maxDepth */
        );
        if (newEditorState !== this.state.note) {
          this.onChange(newEditorState);
        }
        return;
      default:
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChangeNote(
      RichUtils.toggleBlockType(
        this.state.note,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChangeNote(
      RichUtils.toggleInlineStyle(
        this.state.note,
        inlineStyle
      )
    );
  }

  getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote';
      default: return null;
    }
  }


  render () {
    const { title, note } = this.state
    const { saveNoteFunction, activeNote } = this.props
    const { id } = activeNote
    
    let className = 'RichEditor-editor';
    var contentState = note.getCurrentContent()
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
        <div className='outline'>
        <input type='text' value={title} onChange={this.onChangeTitle} />
      <div className="RichEditor-root">
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
            placeholder="Write your note here..."
            ref={(ref) => this.editor = ref}
            spellCheck={true}
          />
        </div>
      </div>
      <Button bsStyle='default' bsSize='small' onClick={x => { saveNoteFunction(id, title, note) }}> Save</Button>
      </div>
    );
  }
}



NoteEditor.propTypes = {
  activeNote: PropTypes.object,
  saveNoteFunction: PropTypes.Function
}

export default NoteEditor


