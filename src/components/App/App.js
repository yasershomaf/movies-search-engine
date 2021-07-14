import React, { Component } from 'react';

import {getResults} from '../../services/api';

import SearchInput from '../SearchInput/SearchInput';
import SortSelector from '../SortSelector/SortSelector';
import ReleaseYear from '../ReleaseYear/ReleaseYear';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';

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
			results: [],
			currentPage: 0,
			noOfPages: 0
		};
	}

	searchHandler = page => {
		const {sort, query, year} = this.searchQueries;

		getResults({sort, query, year , page}).then(data => this.setState({
			results: data.results,
			noOfPages: data.total_pages,
			currentPage: data.page
		}));
	}

	render() {
		return <>
			<form onSubmit={(e) => {
				e.preventDefault();

				this.searchHandler(1);
			}} >
				<SortSelector onSortSelect={sort => this.searchQueries.sort = sort} />

				<SearchInput onQueryChange={query => this.searchQueries.query = query} />

				<ReleaseYear onYearSelect={year => this.searchQueries.year = year}/>

				<button type="submit" >Search</button>
			</form>

			{this.state.results.length > 0 && <>
				<div className="results-container">
					{this.state.results.map(card => <Card key={card.id} details={card} />)}
				</div>

				<Pagination
					currentPage={this.state.currentPage}
					noOfPages={this.state.noOfPages}
					onSelect={this.searchHandler}
				/>
			</>}
		</>;
	}
}