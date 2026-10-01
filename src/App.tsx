'use client'

import React, { useCallback, useEffect, useState } from 'react';
// components
import { Autorization, Movies } from './pages';
// types
import { ILoginInfo, IUserMovies } from './types';
// other
import {
  IsUpdateMoviesContext,
  LocalizationContext,
  MoviesContext,
  UserInfoContext,
} from './constants';
import { engLoc } from './localization';
import { getUserMovies } from './utils';

export const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<ILoginInfo | null>(null);
  const [allUserMovies, setAllUserMovies] = useState<IUserMovies | null>(null);
  const [isUpdateAllMovies, setIsUpdateAllMovies] = useState<boolean>(false);

  const updateMovies = useCallback(() => {
    setIsUpdateAllMovies((prev) => !prev);
  }, [setIsUpdateAllMovies]);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const res = await fetch('/api/me');
  //       const data = await res.json();

  //       if (data.user) {
  //         setIsAuthorized(true);
  //         setUserInfo(data.user);
  //       }
  //     } catch (err) {
  //       console.error('Помилка перевірки авторизації:', err);
  //     } finally {
  //       // setIsLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, []);

  //   const handleLogout = async () => {
  //   await fetch('/api/logout', { method: 'POST' });
  //   setIsAuthorized(false);
  //   setUserInfo(null);
  // };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserMovies(Number(userInfo?.id));

      setAllUserMovies(res);
    };

    if (isAuthorized) {
      fetchData();
    }
  }, [userInfo, isUpdateAllMovies, isAuthorized]);

  return (
    <LocalizationContext.Provider value={engLoc}>
      <MoviesContext.Provider value={allUserMovies}>
        <UserInfoContext.Provider value={userInfo}>
          <IsUpdateMoviesContext.Provider value={updateMovies}>
            {isAuthorized ? (
              <Movies />
            ) : (
              <Autorization
                setIsAuthorized={setIsAuthorized}
                setUserInfo={setUserInfo}
              />
            )}
          </IsUpdateMoviesContext.Provider>
        </UserInfoContext.Provider>
      </MoviesContext.Provider>
    </LocalizationContext.Provider>
  );
};
// <img
//   src="https://media.tenor.com/1ZMQ6_PMf9MAAAAM/raccoon-rave.gif"
//   alt="Test"
// />
