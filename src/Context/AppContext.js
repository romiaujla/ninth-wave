import React from 'react';

const AppContext = React.createContext({
    results: [],
    setResults: () => {},
});

export default AppContext;