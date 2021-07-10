import apiKey from './api-key';

const autoComplete = (query) => {
	if (!query) {
		return Promise.resolve([]);
	}

	return fetch(`https://api.themoviedb.org/3/search/keyword?api_key=${apiKey}&query=${query}`)
		.then(response => response.json())
		.then(data => data.results.map(item => ({
			...item,
			styledName: item.name.replace(new RegExp(query, 'gi'), '<span>$&</span>')
		})));
};

export const getResults = ({query, sort, year, page}) => {
	if (!query) {
		return Promise.resolve({
			page: 0,
			results: [],
			totalPages: 0,
			totalResults: 0
		});
	}

	return fetch(`https://api.themoviedb.org/3/search/${sort}?api_key=${apiKey}&page=${
		page || 1
	}&query=${query}${year ? '&year=' + year : ''}`)
		.then(response => response.json())
		.then(data => ({
			page: data.page,
			results: data.results,
			totalPages: data.total_pages,
			totalResults: data.total_results
		}));
};

export default autoComplete;
