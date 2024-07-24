
import React from 'react';
import VoteForm from './components/VoteForm.jsx';
import PollingTrends from './components/PollingTrends';

const App = () => {
 
  return (
    <div className="container">
      <VoteForm  />
      <PollingTrends />
    </div>
  );
};

export default App;
