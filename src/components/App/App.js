import React, { Component } from 'react';

import SearchInput from '../SearchInput/SearchInput';

import './App.css';

export default class App extends Component {
	constructor() {
		super();

		this.timer = null;

		this.state = {
			query: '',
			autoCompleteList: [],
			autoCompleteListIndex: 0
		};
	}

	render() {
		return <>
			<form onSubmit={(e) => {
				e.preventDefault();
			}} >
				<select value="movie">
					<option value="movie">movies</option>
					<option value="tv">tv shows</option>
				</select>

				<SearchInput />

				<input type="number" placeholder="Release year" />

				<button type="submit" >Search</button>
			</form>

			<section>card list</section>

			<footer>pages</footer>
		</>;
	}
}