import React from 'react';
import NotePage from '../containers/NotePage';
import { createStore, storeEnhancer } from 'redux';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import reducer from '../global-reducer';

export function renderWithRedux(ui,initialState) {
	const store = createStore(reducer, initialState);
	return {
		...render(<Provider store={store}>{ui}</Provider>),
		store
	};
}
//
describe('Note Page', () => {
	it('should render a blank note when the notes loaded and the active note is new', () => {
		let param = {
				notes:{
					state: {	
						notesLoaded: true,
						notes: [
							{
								id: 1,
								title: 'example',
								note: '<p>asd</p>'
							}],
						activeNote: {
								id:'',
								title: 'New Note',
								note: ''
							}
						},
					action:'SET_NOTES'
					}
				};
		
		const { container, queryByText } = renderWithRedux(
			<NotePage/>,
	   		param
		);
		expect(queryByText('New Note')).toBeTruthy();

		expect(container.firstChild).toMatchSnapshot();
	});
});