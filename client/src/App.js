import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [url, setUrl] = useState('');
  const [frequencyData, setFrequencyData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3001/api/frequency', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();
    setFrequencyData(data.frequencyArray);
  };

  return (
    <div className="container py-5" style={{ backgroundColor: '#f4f8fb', minHeight: '100vh' }}>
      <div className="text-center mb-5">
        <h1 className="display-4 text-primary">Word Frequency Analyzer</h1>
        <p className="lead text-secondary">Analyze the most frequently used words on any webpage.</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div
            className="p-4 mb-4"
            style={{
              background: 'linear-gradient(135deg, #4a90e2, #007bff)',
              borderRadius: '15px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h5 className="text-center text-white mb-3">Analyze URL for Word Frequency</h5>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <input
                  id="urlInput"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="form-control"
                  placeholder="https://example.com"
                  required
                  style={{
                    borderRadius: '10px',
                    border: '2px solid #fff',
                    padding: '10px',
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-light btn-block"
                style={{
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  backgroundColor: '#fff',
                  color: '#007bff',
                }}
              >
                Analyze
              </button>
            </form>
          </div>
        </div>
      </div>

      {frequencyData.length > 0 && (
        <div className="row justify-content-center mt-5">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-center text-secondary mb-4">Top Words</h5>
                <table className="table table-hover table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Word</th>
                      <th scope="col">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {frequencyData.map(({ word, count }) => (
                      <tr key={word}>
                        <td>{word}</td>
                        <td>{count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

