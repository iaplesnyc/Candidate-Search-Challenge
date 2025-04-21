// src/components/Nav.tsx
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'flex-start',
      padding: '1rem',
      background: 'black',
      color: 'white',
      gap: '1rem'
    }}>
      <Link to="/" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>
        Home
      </Link>
      <Link to="/saved" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>
        Potential Candidates
      </Link>
    </nav>
  );
};

export default Nav;
