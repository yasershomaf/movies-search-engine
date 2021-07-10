import React, { Component } from 'react';

import SearchInput from '../SearchInput/SearchInput';
import SortSelector from '../SortSelector/SortSelector';

import './App.css';

export default class App extends Component {
	constructor() {
		super();

		this.searchQueries = {
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
				<SortSelector onSortSelect={sort => this.searchQueries.sort = sort} />

				<SearchInput onQueryChange={query => this.searchQueries.query = query} />

				<ReleaseYear onYearSelect={year => this.searchQueries.year = year}/>

				<button type="submit" >Search</button>
			</form>

			<section>card list</section>

			<footer>pages</footer>
		</>;
	}
}