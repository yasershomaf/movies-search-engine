import React, { Component } from 'react';

import autoComplete from '../../services/api';

import './SearchInput.css';

export default class SearchInput extends Component {
	constructor() {
		super();

		this.timer = null;

		this.state = {
			query: '',
			autoCompleteList: [],
			autoCompleteListIndex: 0
		};
	}

	autoCompleteHandler = (query) => {
		autoComplete(query).then(list => {
			this.setState({
				autoCompleteList: list,
				autoCompleteListIndex: 0
			});
		});
	}

	render() {
		return <div className="query-container">
			<input
				value={this.state.query}

				placeholder="Search"

				onChange={e => {
					clearTimeout(this.timer);

					this.setState({query: e.target.value});

					this.timer = setTimeout(() => this.autoCompleteHandler(e.target.value), 300);
				}}

				onFocus={(e) => this.autoCompleteHandler(e.target.value)}

				onBlur={() => setTimeout(() => {
					this.setState({autoCompleteList: []});
				}, 50)}

				onKeyUp={(e) => {
					if (this.state.autoCompleteList.length > 0) {
						const key = e.key || e.keyCode;

						if (key === 'Escape' || key === 'Esc' || key === 27) {
							this.setState({
								autoCompleteList: []
							});
						} else if (key === 'Enter' || key === 'Ent' || key === 13) {
							this.setState({
								autoCompleteList: [],
								query: this.state.autoCompleteList[
									this.state.autoCompleteListIndex
								].name
							});
						} else if (key === 'ArrowDown' || key === 'ArrowDown' || key === 40) {
							let newIndex = this.state.autoCompleteListIndex + 1;

							if (newIndex > this.state.autoCompleteList.length - 1) {
								newIndex = 0;
							}

							this.setState({autoCompleteListIndex: newIndex});
						} else if (key === 'ArrowUp' || key === 'ArrowUp' || key === 38) {
							let newIndex = this.state.autoCompleteListIndex - 1;

							if (newIndex < 0) {
								newIndex = this.state.autoCompleteList.length - 1;
							}

							this.setState({autoCompleteListIndex: newIndex});
						}
					}
				}}
			/>

			{this.state.autoCompleteList.length > 0 && <ul className="autocomplete-results">
				{this.state.autoCompleteList.map((item, index) => <li
					className={index === this.state.autoCompleteListIndex ? 'active' : ''}
					key={item.id}
					dangerouslySetInnerHTML={{__html: item.styledName}}
					onClick={() => this.setState({
						query: item.name,
						autoCompleteList: []
					})}
				/>)}
			</ul>}
		</div>;
	}
}
