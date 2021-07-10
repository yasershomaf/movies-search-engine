import React, { Component } from 'react';

import {getResults} from '../../services/api';

import SearchInput from '../SearchInput/SearchInput';
import SortSelector from '../SortSelector/SortSelector';
import ReleaseYear from '../ReleaseYear/ReleaseYear';

import './App.css';

export default class App extends Component {
	constructor() {
		super();

		this.searchQueries = {
			sort: 'movie',
			query: '',
			year: '',
		};

		this.state = {
			results: []
		};
	}

	render() {
		return <>
			<form onSubmit={(e) => {
				e.preventDefault();

				const {sort, query, year} = this.searchQueries;

				getResults({sort, query, year , page: 1}).then(data => this.setState({
					results: data.results
				}));
			}} >
				<SortSelector onSortSelect={sort => this.searchQueries.sort = sort} />

				<SearchInput onQueryChange={query => this.searchQueries.query = query} />

				<ReleaseYear onYearSelect={year => this.searchQueries.year = year}/>

				<button type="submit" >Search</button>
			</form>

			<ul>
				{this.state.results.map(card => <li key={card.id}>{card.title}</li>)}
			</ul>

			<footer>pages</footer>
		</>;
	}
}