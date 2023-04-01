import React from 'react';
import { Header } from './components/Header';
import './scss/App.scss';

import classNames from 'classnames';

import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/Main';
import AboutPage from './pages/About';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { FullPost } from './pages/FullPost';
import { AddPost } from './pages/AddPost';
import { Category } from './pages/Category';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import instance from './axios';
import { useQuery } from 'react-query';
import { setUserData } from './redux/auth/slice';
import { setMode } from './redux/app/slice';

async function fetchAuthMe() {
  const { data } = await instance.get('/auth/me');
  return data;
}

function App() {
  const dispatch = useAppDispatch();
  const [mode, setThemeMode] = React.useState(localStorage.getItem('theme'));
  const theme = useAppSelector((state) => state.app.theme);

  React.useEffect(() => {
    if (mode) {
      dispatch(setMode(mode));
    }
  }, [mode]);

  useQuery('authMe', fetchAuthMe, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      dispatch(setUserData(data));
    },
  });

  return (
    <main
      className={classNames('wrapper', {
        darkTheme: theme === 'dark',
      })}>
      <Header theme={theme} />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Registration />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/post/:id" element={<FullPost />} />
          <Route path="/post/:id/edit" element={<AddPost />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
