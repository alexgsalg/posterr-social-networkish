import { ReactElement } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
// import style from './home.style.scss';

function HomePage(): ReactElement {
  const location = useLocation();

  return (
    <main>
      <span>Homepage</span>
      <Link to="/user/1223" state={{ background: location }}>
        Open user
      </Link>

      {/* User Modal */}
      <Outlet />
    </main>
  );
}

export default HomePage;
