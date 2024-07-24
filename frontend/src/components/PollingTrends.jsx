import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PollingTrends = () => {
  const [votes, setVotes] = useState([]);
  const [counts, setCounts] = useState({ true: [], false: [] });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const votesResponse = await fetch('http://localhost:8000/api/data');
        const votesData = await votesResponse.json();
        setVotes(votesData.data);

        const countsTrueResponse = await fetch('http://localhost:8000/api/counts?voting_choice=true');
        const countsTrueData = await countsTrueResponse.json();

        const countsFalseResponse = await fetch('http://localhost:8000/api/counts?voting_choice=false');
        const countsFalseData = await countsFalseResponse.json();

        setCounts({
          true: countsTrueData.data,
          false: countsFalseData.data,
        });

        const resultsResponse = await fetch('http://localhost:8000/api/results');
        const resultsData = await resultsResponse.json();
        setResults(resultsData.data);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const lineChartData = {
    labels: counts.true.map(item => item.date),
    datasets: [
      {
        label: 'Yes',
        data: counts.true.map(item => item.count),
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'No',
        data: counts.false.map(item => item.count),
        borderColor: 'red',
        fill: false,
      },
    ],
  };

  const barChartData = {
    labels: ['Yes', 'No'],
    datasets: [
      {
        label: 'Votes',
        data: results.map(result => result.count),
        backgroundColor: ['green', 'red'],
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2>Polling Trends</h2>
      <div className="card mt-4">
        <div className="card-body" style={{overflowY:"scroll" ,height:"20rem"}}>
          <h5 className="card-title">Votes</h5>
          <ul className="list-group">
            {votes.map(vote => (
              <li key={vote.id} className="list-group-item">
                {vote.name} - {vote.voting_choice ? 'Yes' : 'No'} - {new Date(vote.casted_at).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4">
        <h5>Line Chart (Votes Over Time)</h5>
        <Line data={lineChartData} />
      </div>
      <div className="mt-4">
        <h5>Bar Chart (Total Votes)</h5>
        <Bar data={barChartData} />
      </div>
    </div>
  );
};

export default PollingTrends;
