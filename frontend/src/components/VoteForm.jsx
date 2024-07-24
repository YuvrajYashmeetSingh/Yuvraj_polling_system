
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const VoteForm = () => {
  const [name, setName] = useState('');
  const [votingChoice, setVotingChoice] = useState(true);
  const [castedAt, setCastedAt] = useState('');

  const handleSubmit = async (e) => {
    //e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, voting_choice: votingChoice, casted_at: castedAt }),
      });

      if (response.ok) {
        const data = await response.json();
       
      } else {
        console.error("failed to submit vote");
      }
    } catch (error) {
      console.error('Error occurs:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Vote</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Voting Choice</label>
          <select
            className="form-select"
            value={votingChoice}
            onChange={(e) => setVotingChoice(e.target.value === 'true')}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="mb-3">
          <label For="castedAt" className="form-label">Date of Submission</label>
          <input
            type="datetime-local"
            className="form-control"
            id="castedAt"
            value={castedAt}
            onChange={(e) => setCastedAt(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default VoteForm;
