import apiKey from './api-key';

let configuration = null;

const getConfiguration = () => {
	if (configuration) {
		return Promise.resolve(configuration);
	}

	return fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
		.then(response => response.json())
		.then(data => {
			configuration = data;
			return data;
		});
};

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

	return Promise.all([
		getConfiguration(),
		fetch(`https://api.themoviedb.org/3/search/${sort}?api_key=${
			apiKey
		}&page=${	page || 1	}&query=${query}${year ? '&year=' + year : ''}`)
			.then(response => response.json())
	]).then(values => {
		const baseURL = values[0].images.base_url;
		const backdropSizes = values[0].images.backdrop_sizes;
		const posterSizes = values[0].images.poster_sizes;


		values[1].results.forEach(item => {
			item.backdropPaths = backdropSizes.reduce((acc, size) => {
				acc[size] = item.backdrop_path && `${baseURL}${size}${item.backdrop_path}`;
				return acc;
			}, {});

			item.posterPaths = posterSizes.reduce((acc, size) => {
				acc[size] = item.poster_path && `${baseURL}${size}${item.poster_path}`;
				return acc;
			}, {});
		});

		return values[1];
	});
};

export default autoComplete;
