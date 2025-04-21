import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load candidates on initial mount
  useEffect(() => {
    const loadCandidates = async () => {
      setIsLoading(true);
      const users = await searchGithub(); // basic list with usernames
      const detailedUsers: Candidate[] = [];

      for (let i = 0; i < users.length; i++) {
        const fullUser = await searchGithubUser(users[i].login);
        detailedUsers.push(fullUser);
        if (detailedUsers.length >= 10) break; // limit to 10 users
      }

      setCandidates(detailedUsers);
      setIsLoading(false);
    };

    loadCandidates();
  }, []);

  const handleAccept = () => {
    const saved = JSON.parse(localStorage.getItem('candidates') || '[]');
    saved.push(candidates[currentIndex]);
    localStorage.setItem('candidates', JSON.stringify(saved));
    setCurrentIndex(currentIndex + 1);
  };

  const handleReject = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const candidate = candidates[currentIndex];

  if (isLoading) return <p>Loading candidates...</p>;
  if (!candidate) return <p>No more candidates to review.</p>;

  return (
    <div style={{ textAlign: 'center', padding: '2rem', color: 'white' }}>
      <h1>Candidate Search</h1>
      <div style={{ maxWidth: '300px', margin: '1rem auto', background: 'black', borderRadius: '1rem' }}>
        <img src={candidate.avatar_url} alt={candidate.login} style={{ width: '100%', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }} />
        <div style={{ padding: '1rem' }}>
          <h2>{candidate.name} (<em>{candidate.login}</em>)</h2>
          <p>Location: {candidate.location || 'Unknown'}</p>
          <p>Email: <a href={`mailto:${candidate.email}`}>{candidate.email || 'N/A'}</a></p>
          <p>Company: {candidate.company || 'N/A'}</p>
          <p>Bio: {candidate.bio || 'No bio available.'}</p>
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleReject} style={{ fontSize: '2rem', marginRight: '1rem', color: 'red' }}>➖</button>
        <button onClick={handleAccept} style={{ fontSize: '2rem', color: 'green' }}>➕</button>
      </div>
    </div>
  );
};

export default CandidateSearch;
