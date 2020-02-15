import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FinancialInstitutionServices from '../../Services/FinancialInstitutionServices';
import AppContext from '../../Context/AppContext';
import './Suggestions.css';

export default class Suggestions extends Component{

    static defaultProps = {
        suggestions: [],
        renderSuggestions: () => {},
    }

    static contextType = AppContext;

    handleClick = (term) => {
        FinancialInstitutionServices.getSearchResults(term)
            .then(response => this.context.setResults(response.results))
            .catch(err => console.log(err));

        this.props.resetSuggestions();
    }

    renderSuggestions = (suggestions = []) => {
        return suggestions.map((suggestion, i) => ( 
            <li key={i}>
                <Link to={`/`} onClick={() => {this.handleClick(suggestion)}}>{suggestion}</Link>
            </li>
        ))
    }

    render(){
        console.log(`before rendering suggestion`, this.props.suggestions);
        return (
            <div className='Suggestions'>
                <ul className='Suggestions__ul'>
                    {this.renderSuggestions(this.props.suggestions)}
                </ul>
            </div>
        )
    }
}

Suggestions.propTypes = {
    suggestions: PropTypes.array.isRequired,
    resetSuggestions: PropTypes.func.isRequired,
}