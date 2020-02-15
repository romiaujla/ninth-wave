import React from 'react';
import { Link } from 'react-router-dom';

const renderResults = (results) => {
    return results.map(fi => (
    <li key={fi.fiID}>
        <Link to={`/fi/${fi.fiID}`}>
            {fi.fiName}
        </Link>
    </li>
    ))
}

const SearchResults = ({results = []}) => {
    return (
        <ul className='SearchResults'>
            {renderResults(results)}
        </ul>
    )
}

export default SearchResults;

