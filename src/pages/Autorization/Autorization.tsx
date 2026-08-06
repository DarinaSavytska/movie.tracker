import { useState } from 'react';
import { checkSecretCode } from '../../api';
import { sanity, checkLoginExists, checkUserInfo } from '../../utils';

interface ILoginInfo {
  login: string;
  password: string;
}

interface IAutorization {
  setIsAuthorized: (isAuthorized: boolean) => void;
}

export const Autorization: React.FC<IAutorization> = ({ setIsAuthorized }) => {
  const [loginInfo, setLoginInfo] = useState<ILoginInfo>(null);
  const [isUserExist, setIsUserExist] = useState<boolean>(true);
  const [secretCode, setSecretCode] = useState<string>('');
  const [isShowSecretCodeError, setIsShowSecretCodeError] =
    useState<boolean>(false);
  const [isShowWrongLoginError, setIsShowWrongLoginError] =
    useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sanity.create({
        _type: 'autorization',
        ...loginInfo,
        publishedAt: new Date().toISOString(),
      });

      setIsAuthorized(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div onClick={() => setIsUserExist(!isUserExist)}>Registration</div>
      {isUserExist ? (
        <form onSubmit={handleSubmit}>
          <input
            value={loginInfo?.login}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, login: e.target.value })
            }
            placeholder="Login"
          />
          <input
            value={loginInfo?.password}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
            placeholder="Password"
            type="password"
          />
          {isShowWrongLoginError ? <div>Wrong login or password</div> : null}
          <button
            type="button"
            onClick={async () => {
              const isUserExist = await checkUserInfo(
                loginInfo?.login,
                loginInfo?.password
              );

              if (isUserExist) {
                setIsAuthorized(true);
              } else {
                setIsShowWrongLoginError(true);
              }
            }}
          >
            Submit
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            value={loginInfo?.login}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, login: e.target.value })
            }
            placeholder="Login"
          />
          <input
            value={loginInfo?.password}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
            type="password"
            placeholder="Password"
          />
          <input
            value={secretCode}
            onChange={(e) => setSecretCode(e.target.value)}
            placeholder="Secret Code"
          />
          {isShowSecretCodeError ? <div>Wrong secret code</div> : null}
          {isShowWrongLoginError ? <div>Login already exists</div> : null}
          <button
            type="button"
            onClick={async (e) => {
              setIsShowSecretCodeError(false);
              setIsShowWrongLoginError(false);

              const isCodeCorrect = (await checkSecretCode(secretCode))
                ?.success;
              const isLoginExists = await checkLoginExists(loginInfo?.login);

              if (isLoginExists) {
                setIsShowWrongLoginError(true);
              } else if (isCodeCorrect) {
                handleSubmit(e);
              } else {
                setIsShowSecretCodeError(true);
              }
            }}
          >
            Registration
          </button>
        </form>
      )}
    </div>
  );
};
