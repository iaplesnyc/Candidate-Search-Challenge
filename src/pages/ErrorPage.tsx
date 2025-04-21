import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <section style={{ textAlign: 'center', padding: '3rem', color: 'white' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404: Page Not Found</h1>
      <p style={{ fontSize: '2rem' }}>¯\_(ツ)_/¯</p>
      <p style={{ marginTop: '2rem' }}>
        <Link to="/" style={{ color: 'lightblue', textDecoration: 'underline' }}>
          Go back home
        </Link>
      </p>
    </section>
  );
};

export default ErrorPage;
