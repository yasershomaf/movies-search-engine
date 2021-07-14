import React from 'react';
import './Pagination.css';

export default function Pagination({noOfPages, currentPage, onSelect}) {
	return <div className="pagination">
		{currentPage > 1 && <>
			<button onClick={() => onSelect(currentPage - 1)}>{'< Previous'}</button>

			<button onClick={() => onSelect(1)}>1</button>
		</>}

		{currentPage > 3 && <span>...</span>}

		{currentPage > 2 && <button
			onClick={() => onSelect(currentPage - 1)}
		>{currentPage - 1}</button>}

		<button disabled>{currentPage}</button>

		{currentPage < noOfPages - 1 && <button
			onClick={() => onSelect(currentPage + 1)}
		>{currentPage + 1}</button>}

		{currentPage < noOfPages - 2 && <span>...</span>}

		{currentPage < noOfPages && <>
			<button onClick={() => onSelect(noOfPages)}>{noOfPages}</button>

			<button onClick={() => onSelect(currentPage + 1)}>{'Next >'}</button>
		</>}
	</div>;
}
