import React, { Component } from 'react';

import SearchInput from '../SearchInput/SearchInput';
import SortSelector from '../SortSelector/SortSelector';

import './App.css';

export default class App extends Component {
	constructor() {
		super();

		this.searchPQueries = {
			sort: 'movie',
			query: '',
			year: '',
		};

		this.state = {};
	}

	render() {
		return <>
			<form onSubmit={(e) => {
				e.preventDefault();
			}} >
				<SortSelector onSortSelect={(sort) => this.searchPQueries.sort = sort} />

				<SearchInput onQueryChange={(query) => this.searchPQueries.query = query} />

				<input type="number" placeholder="Release year" />

				<button type="submit" >Search</button>
			</form>

			<section>card list</section>

			<footer>pages</footer>
		</>;
	}
}