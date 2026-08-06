import React from 'react';
import { Autorization } from './pages';

export const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false);

  return (
    <div>
      {isAuthorized ? (
        <img
          src="https://media.tenor.com/1ZMQ6_PMf9MAAAAM/raccoon-rave.gif"
          alt="Test"
        />
      ) : (
        <Autorization setIsAuthorized={setIsAuthorized} />
      )}
    </div>
  );
};
