import React from 'react';

const AllContextsProvider = ({ contexts, children }) => {
    return contexts.reduce((acc, [Context, value]) => (
        <Context.Provider value={value}>{acc}</Context.Provider>
    ), children);
};

export default AllContextsProvider;
