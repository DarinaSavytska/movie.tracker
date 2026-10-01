'use client'

import { useContext, useState } from 'react';
// styles
import * as S from './styled';
// types
import { ILoginInfo } from '../../types';
// other
import { checkLoginExists, checkUserInfo, registerUser } from '../../utils';
import { checkSecretCode } from '../../api';
import { LocalizationContext } from '../../constants';

interface IAutorization {
  setIsAuthorized: (isAuthorized: boolean) => void;
  setUserInfo: (userInfo: ILoginInfo) => void;
}

export const Autorization: React.FC<IAutorization> = ({
  setIsAuthorized,
  setUserInfo,
}) => {
  const loc = useContext(LocalizationContext);

  const [loginInfo, setLoginInfo] = useState<Partial<ILoginInfo>>({});
  const [isUserExist, setIsUserExist] = useState<boolean>(true);
  const [secretCode, setSecretCode] = useState<string>('');
  const [isShowSecretCodeError, setIsShowSecretCodeError] =
    useState<boolean>(false);
  const [isShowWrongLoginError, setIsShowWrongLoginError] =
    useState<boolean>(false);

  const resetAllErrors = () => {
    setIsShowSecretCodeError(false);
    setIsShowWrongLoginError(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isUserExist) {
      // const userExist = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ login: loginInfo.login, password: loginInfo.password }) })
      const userExist = await checkUserInfo(
        loginInfo.login as string,
        loginInfo.password as string
      );

      console.log('userExist', userExist);

      if (userExist) {
        setIsAuthorized(true);
        setUserInfo(userExist);
      } else {
        setIsShowWrongLoginError(true);
      }
    } else {
      resetAllErrors();

      const isCodeCorrect = (await checkSecretCode(secretCode))?.success;
      const isLoginExists = await checkLoginExists(loginInfo.login as string);

      if (isLoginExists) {
        setIsShowWrongLoginError(true);
      } else if (isCodeCorrect) {
        await registerUser(loginInfo as ILoginInfo, setIsUserExist);
      } else {
        setIsShowSecretCodeError(true);
      }
    }
  };

  return (
    <S.Container>
      <S.Block>
        <S.Registration
          onClick={() => {
            setIsUserExist(!isUserExist);
            resetAllErrors();
          }}
        >
          {isUserExist ? loc.registration : loc.signIn}
        </S.Registration>
        <S.FormContainer onSubmit={handleFormSubmit}>
          <S.Form>
            <input
              value={loginInfo.login ?? ''}
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, login: e.target.value })
              }
              placeholder={loc.login}
            />
            <input
              value={loginInfo.password ?? ''}
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, password: e.target.value })
              }
              placeholder={loc.password}
              type="password"
            />
            {!isUserExist && (
              <input
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                placeholder={loc.secretCode}
              />
            )}
            {isShowWrongLoginError && (
              <S.ErrorBlock>
                {isUserExist
                  ? loc.wrongLoginOrPassword
                  : loc.loginAlreadyExists}
              </S.ErrorBlock>
            )}
            {isShowSecretCodeError ? (
              <S.ErrorBlock>{loc.wrongSecretCode}</S.ErrorBlock>
            ) : null}
          </S.Form>
          <button type="submit">
            {isUserExist ? loc.signIn : loc.registration}
          </button>
        </S.FormContainer>
      </S.Block>
    </S.Container>
  );
};
