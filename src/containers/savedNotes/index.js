import React, { Component } from 'react';
import {ListGroup,ListGroupItem} from 'react-bootstrap';
import PropTypes from 'prop-types';
import './index.css'

class savedNotes extends Component {

   constructor(props) {
    super(props);
    this.state = {
    };
    this.showClicked = this.showClicked.bind(this);
  }
  
  showClicked (e) {
    e.preventDefault();
    alert('click');
  }

  render () {
    // const notes = this.props.notes;
    const notes =[ {name:"name",stuff:"stuff"},{name:"name2",stuff:"stuff"}]
    return (
            <ListGroup>
             {notes.map((note,i) => {
                return(
                  <ListGroupItem onClick={this.showClicked} href={"#link"+i}>
                   {note.name}
                  </ListGroupItem>
                )}
              )}
             </ListGroup>
    );
  }
}

savedNotes.propTypes = {
    notes:PropTypes.object
};
export default savedNotes
