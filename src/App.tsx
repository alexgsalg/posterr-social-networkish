import { Route, Routes, useLocation } from 'react-router-dom';
import HeaderComponent from './components/Header/header.component';
import HomePage from './views/Home/home.page.tsx';
import UserPage from './views/User/user.page.tsx';
import { useAppDispatch } from './store/store.ts';
import { setUsers, logInUser } from './store/user/user.slice.ts';
import { useEffect } from 'react';
import api from './api/axios';

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useAppDispatch();
  useEffect(() => {
    initUsers();
  });

  const initUsers = async () => {
    const response = await api.get('/user');
    const users = response.data;
    await dispatch(setUsers(users));
    dispatch(logInUser(users[0]));
  };
  return (
    <>
      <HeaderComponent />
      <main className="main-content">
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
      </main>
    </>
  );
}

export default App;
