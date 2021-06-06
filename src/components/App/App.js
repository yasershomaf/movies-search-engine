import React, { Component } from 'react';

import autoComplete from '../../services/api';

import './App.css';

export default class App extends Component {
	constructor() {
		super();
		this.timer = null;

		this.state = {
			query: '',
			autoCompleteList: []
		};
	}

	documentClickHandler = () => {
		this.setState({autoCompleteList: []});
		document.removeEventListener('click', this.documentClickHandler);
	}

	autoCompleteHandler = (query) => {
		autoComplete(query).then(list => {
			this.setState({autoCompleteList: list});

			if (list.length > 0) {
				document.addEventListener('click', this.documentClickHandler);
			}
		});
	 }
	
	componentWillMount() {
		document.removeEventListener('click', this.documentClickHandler);
	}

	render() {
		return <div>
			<form onSubmit={(e) => {
				e.preventDefault();

				
			}} >
				<select value="movie">
					<option value="movie">movies</option>
					<option value="tv">tv shows</option>
				</select>

				<div className="query-container">
					<input
						value={this.state.query}
						placeholder="Search"
						onChange={e => {
							clearTimeout(this.timer);

							this.setState({query: e.target.value});

							this.timer = setTimeout(() => this.autoCompleteHandler(e.target.value), 300);
						}}
						onFocus={(e) => this.autoCompleteHandler(e.target.value)}
					/>

					{this.state.autoCompleteList.length > 0 && <ul className="autocomplete-results">
						{this.state.autoCompleteList.map(item => <li
							key={item.id}
							dangerouslySetInnerHTML={{__html: item.styledName}}
							onClick={() => {
								this.setState({
									query: item.name,
									autoCompleteList: []
								});
							}}
						/>)}
					</ul>}
				</div>

				<input type="number" placeholder="Release year" />

				<button type="submit" >Search</button>
			</form>

			<section>card list</section>

			<footer>pages</footer>
		</div>;
	}
}