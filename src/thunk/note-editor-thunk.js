import axios from 'axios';
import {notesAction} from '../actions/notesActions';

export function getAllNotes() {
	return function (dispatch) {
		return axios.get('/notes', {
		    auth: {
			    username: 'admin',
			    password: '1234'
			}
		  })
		  .then((res) => {
		  		dispatch(notesAction.setNotes(res.data));		  	
		  }).catch((error) => {
		  	console.log(error);
		  	dispatch(notesAction.setNotes([
		  		{
					title: 'Note title 1',
					note: '<p>Note detail 1.</p>'
				},
				{
					title: 'Note title 2',
					note: '<p>Note detail 2.</p>'
				}
	  		]));
		  });
	}
};