import { Outlet } from 'react-router-dom';
import HeaderComponent from './components/Header/header.component';

function App() {
  return (
    <>
      <HeaderComponent />
      <Outlet />
    </>
  );
}

export default App;
