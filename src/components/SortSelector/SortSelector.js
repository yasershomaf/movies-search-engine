import React from 'react';

export default function SortSelector({onSortSelect}) {
	return <select onChange={e => onSortSelect(e.target.value)}>
		<option value="movie">movies</option>
		<option value="tv">tv shows</option>
	</select>;
}
