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

export default autoComplete;
