import { Route, Routes, useLocation } from 'react-router-dom';
import HeaderComponent from './components/Header/header.component';
import HomePage from './views/Home/home.page.tsx';
import UserPage from './views/User/user.page.tsx';

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <HeaderComponent />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />}>
          <Route path="all" element={<HomePage />} />
          <Route path="following" element={<HomePage />} />
        </Route>
        <Route path="user/:id" element={<UserPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="user/:id" element={<UserPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
