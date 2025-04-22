import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

const App = () => (
  <>
    <Nav />
    <main>
      <Outlet />
    </main>
  </>
);

export default App;
