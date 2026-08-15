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
import { getUserMovies } from './api';

export const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<ILoginInfo>(null);
  const [allUserMovies, setAllUserMovies] = useState<IUserMovies>(null);
  const [isUpdateAllMovies, setIsUpdateAllMovies] = useState<boolean>(false);

  const updateMovies = useCallback(() => {
    setIsUpdateAllMovies((prev) => !prev);
  }, [setIsUpdateAllMovies]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserMovies(userInfo?.id);

      setAllUserMovies(res);
    };

    fetchData();
  }, [userInfo, isUpdateAllMovies]);

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
