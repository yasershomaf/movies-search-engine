import React from 'react';

export default function ReleaseYear({onYearSelect}) {
	return <input
		type="number"
		placeholder="Release year"
		onChange={e => onYearSelect(e.target.value)}
	/>;
}
