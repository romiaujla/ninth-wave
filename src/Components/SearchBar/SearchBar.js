import React, { Component } from 'react';
import FinancialInstitutionServices from '../../Services/FinancialInstitutionServices';
import AppContext from '../../Context/AppContext';
import Suggestions from '../Suggestions/Suggestions';

export default class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            term: '',
            suggestions: [],
        }
    }

    static contextType = AppContext;

    handleSearchSubmit = (e) => {
        e.preventDefault()
        FinancialInstitutionServices.getSearchResults(this.state.term)
            .then(results => this.context.setResults(results.results))
            .catch((err) => console.log(err));

        this.setState({
            suggestions: [],
            term: '',
        })
    }

    resetSuggestions = () => {
        this.setState({
            suggestions: [],
        })
    }

    handleOnChange = (term) => {
        this.setState({
            term,
        })

        if(term){
            FinancialInstitutionServices.getSuggestions(term)
                .then((response) => this.setState({suggestions: response.results.suggestions}))
                .catch((err) => console.log(err));
        }
        
    }

    render(){
        return (
            <div className='SearchBar'>
                <form onSubmit={(e) => {this.handleSearchSubmit(e)}}>
                    <input 
                        type='text' 
                        value={this.state.term}
                        onChange={(e) => {this.handleOnChange(e.target.value)}}
                    />
                    <button type='submit'>Search</button>
                </form>
                {
                    this.state.term &&
                    <Suggestions suggestions={this.state.suggestions} resetSuggestions={this.resetSuggestions}/>
                }
            </div>
            
        )
    }
}