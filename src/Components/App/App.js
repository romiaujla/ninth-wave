import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import AppContext from '../../Context/AppContext';
import { Route } from 'react-router-dom';
import FinancialInstitution from '../FinancialInstitution/FinancialInstitution';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      results: [],
    }
  }

  setResults = (results) => {
    this.setState({results});
  }

  setFi = (fi) => {
    this.setState({fi});
  }

  render(){
    const val = {
      results: this.state.results,
      setResults: this.setResults,
    }

    return (
      <AppContext.Provider value={val}>
        <div className='App'>
            <Route 
              exact
              path='/'
              component={SearchBar}
            />
            <Route 
              exact
              path='/'
              component={() => <SearchResults results={this.state.results} />}
            />
            <Route  
              exact
              path='/fi/:fiId'
              component={(rprops) => <FinancialInstitution fi={this.state.fi} rprops={rprops} /> }
            />
        </div>
      </AppContext.Provider>
    )
  }

}

export default App;
