import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCandidates = async () => {
      setIsLoading(true);
      const users = await searchGithub();
      const detailedUsers: Candidate[] = [];

      for (let i = 0; i < users.length; i++) {
        const fullUser = await searchGithubUser(users[i].login);
        detailedUsers.push(fullUser);
        if (detailedUsers.length >= 10) break;
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

  if (isLoading) return <p style={{ color: 'white', textAlign: 'center' }}>Loading candidates...</p>;
  if (!candidate) return <p style={{ color: 'white', textAlign: 'center' }}>No more candidates to review.</p>;

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1 style={{ textAlign: 'center' }}>Candidate Search</h1>

      <CandidateCard
        candidate={candidate}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </div>
  );
};

export default CandidateSearch;
