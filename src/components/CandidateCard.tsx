import { Candidate } from '../interfaces/Candidate.interface';

interface Props {
  candidate: Candidate;
  onReject?: () => void;
  onAccept?: () => void;
}

const CandidateCard = ({ candidate, onReject, onAccept }: Props) => {
  const isCardView = !!onAccept; // if onAccept exists, we're in the homepage card view

  if (isCardView) {
    return (
      <div
        style={{
          maxWidth: '350px',
          margin: '2rem auto',
          background: 'black',
          borderRadius: '1rem',
          color: 'white',
          textAlign: 'center',
          paddingBottom: '1rem',
          boxShadow: '0 0 15px rgba(255,255,255,0.1)'
        }}
      >
        <img
          src={candidate.avatar_url}
          alt={candidate.login}
          style={{
            width: '100%',
            height: 'auto',
            borderTopLeftRadius: '1rem',
            borderTopRightRadius: '1rem'
          }}
        />
        <div style={{ padding: '1rem' }}>
          <h2>
            {candidate.name} <em>({candidate.login})</em>
          </h2>
          <p>Location: {candidate.location || 'Unknown'}</p>
          <p>
            Email:{' '}
            <a href={`mailto:${candidate.email}`} style={{ color: 'lightblue' }}>
              {candidate.email || 'N/A'}
            </a>
          </p>
          <p>Company: {candidate.company || 'N/A'}</p>
          <p>Bio: {candidate.bio || 'No bio available.'}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button onClick={onReject} style={{ fontSize: '2rem', color: 'red' }}>
            ➖
          </button>
          <button onClick={onAccept} style={{ fontSize: '2rem', color: 'green' }}>
            ➕
          </button>
        </div>
      </div>
    );
  }

  // Fallback: table row (used in SavedCandidates)
  return (
    <tr style={{ backgroundColor: '#2a2a2a' }}>
      <td>
        <img
          src={candidate.avatar_url}
          alt={candidate.login}
          width="50"
          height="50"
          style={{ borderRadius: '50%' }}
        />
      </td>
      <td>
        {candidate.name} <br />
        <em>({candidate.login})</em>
      </td>
      <td>{candidate.location || 'Unknown'}</td>
      <td>
        {candidate.email ? (
          <a href={`mailto:${candidate.email}`} style={{ color: 'lightblue' }}>
            {candidate.email}
          </a>
        ) : (
          'N/A'
        )}
      </td>
      <td>{candidate.company || 'N/A'}</td>
      <td>{candidate.bio || 'No bio available.'}</td>
      <td>
        {onReject && (
          <button onClick={onReject} style={{ fontSize: '1.5rem', color: 'red' }}>
            ➖
          </button>
        )}
      </td>
    </tr>
  );
};

export default CandidateCard;
