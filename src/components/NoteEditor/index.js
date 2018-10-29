import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css'

class NoteEditor extends Component {
    constructor(props) {
    	super(props);
    	const {activeNote,id} = props;
    	this.state = {
    		id:id,
    		title: activeNote.title,
    		note: activeNote.note
    	};
    	this.onChangeTitle = this.onChangeTitle.bind(this);
    	this.onChangeNote = this.onChangeNote.bind(this);
    }

    componentDidUpdate() {
    	const {id,activeNote} = this.props;
    	if (id !== this.state.id ) {
	    	this.setState({
	    		id: id,
				title: activeNote.title,
	    		note: activeNote.note,
	    	});
    	}
    }

    onChangeTitle(e) {
    	const newVal = e.currentTarget.value;
    	this.setState({
    		title: newVal
    	})
    }

    onChangeNote(e) {
    	const newVal = e.currentTarget.value;
    	this.setState({
    		note: newVal
    	})
    }
	
	render() {
	const {title, note} = this.state;
  
    return (

      <div className='outline'>
      	<input type="text" value={title} onChange={this.onChangeTitle} />
      	<textarea value={note} onChange={this.onChangeNote}  />
      </div>

    );
}
}
NoteEditor.propTypes = {
    activeNote:PropTypes.object
};
export default NoteEditor
