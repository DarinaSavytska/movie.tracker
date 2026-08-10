import React from 'react';
import { Autorization, Movies } from './pages';
import { LocalizationContext } from './constants';
import { engLoc } from './localization';

export const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false);

  return (
    <LocalizationContext.Provider value={engLoc}>
      {isAuthorized ? (
        <Movies />
      ) : (
        <Autorization setIsAuthorized={setIsAuthorized} />
      )}
    </LocalizationContext.Provider>
  );
};
// <img
//   src="https://media.tenor.com/1ZMQ6_PMf9MAAAAM/raccoon-rave.gif"
//   alt="Test"
// />
