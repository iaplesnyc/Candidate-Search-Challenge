import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [filterLocation, setFilterLocation] = useState('All');
  const [sortKey, setSortKey] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('candidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  const handleReject = (username: string) => {
    const updated = savedCandidates.filter(candidate => candidate.login !== username);
    setSavedCandidates(updated);
    localStorage.setItem('candidates', JSON.stringify(updated));
  };

  const uniqueLocations = ['All', ...new Set(savedCandidates.map(c => c.location || 'Unknown'))];

  const filteredCandidates = savedCandidates
    .filter(candidate =>
      filterLocation === 'All' || (candidate.location || 'Unknown') === filterLocation
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      const aVal = (a[sortKey as keyof Candidate] || '').toString().toLowerCase();
      const bVal = (b[sortKey as keyof Candidate] || '').toString().toLowerCase();
      return aVal.localeCompare(bVal);
    });

  if (savedCandidates.length === 0) {
    return <p style={{ textAlign: 'center', color: 'white' }}>No candidates have been saved yet.</p>;
  }

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1 style={{ textAlign: 'center' }}>Potential Candidates</h1>

      {/* 🔍 Filter & Sort Controls */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <label>
          Filter by Location:
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          >
            {uniqueLocations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </label>

        <label>
          Sort by:
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          >
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="company">Company</option>
          </select>
        </label>
      </div>

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
          {filteredCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.login}
              candidate={candidate}
              onReject={() => handleReject(candidate.login)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;
