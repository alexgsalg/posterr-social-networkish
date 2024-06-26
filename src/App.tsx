import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import HeaderComponent from './components/Header/header.component';
import HomePage from './views/Home/home.page.tsx';
import UserPage from './views/User/user.page.tsx';

import { useAppDispatch } from './store/store.ts';
import { resetTimeout } from './store/general/general.slice.ts';

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetTimeout());
  });

  return (
    <>
      <HeaderComponent />
      <main className="main-content">
        <Routes location={background || location}>
          <Route path="/">
            <Route element={<Navigate replace to="/all" />} index />
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
      </main>
    </>
  );
}

export default App;
