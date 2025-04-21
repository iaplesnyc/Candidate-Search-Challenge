import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('candidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  const handleReject = (username: string) => {
    const updated = savedCandidates.filter(candidate => candidate.login !== username);
    setSavedCandidates(updated);
    localStorage.setItem('candidates', JSON.stringify(updated));
  };

  if (savedCandidates.length === 0) {
    return <p style={{ textAlign: 'center', color: 'white' }}>No candidates have been saved yet.</p>;
  }

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1 style={{ textAlign: 'center' }}>Potential Candidates</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2rem' }}>
        <thead style={{ backgroundColor: 'black' }}>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate) => (
            <tr key={candidate.login} style={{ backgroundColor: '#2a2a2a' }}>
              <td>
                <img src={candidate.avatar_url} alt={candidate.login} width="50" height="50" style={{ borderRadius: '50%' }} />
              </td>
              <td>{candidate.name} <br /><em>({candidate.login})</em></td>
              <td>{candidate.location || 'Unknown'}</td>
              <td>
                {candidate.email ? (
                  <a href={`mailto:${candidate.email}`} style={{ color: 'lightblue' }}>{candidate.email}</a>
                ) : 'N/A'}
              </td>
              <td>{candidate.company || 'N/A'}</td>
              <td>{candidate.bio || 'No bio available.'}</td>
              <td>
                <button onClick={() => handleReject(candidate.login)} style={{ fontSize: '1.5rem', color: 'red' }}>
                  ➖
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;
