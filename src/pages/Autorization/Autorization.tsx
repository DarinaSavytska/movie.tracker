import { useContext, useState } from 'react';
import { checkSecretCode } from '../../api';
import { sanity, checkLoginExists, checkUserInfo } from '../../utils';
import { LocalizationContext } from '../../constants';
import * as S from './styled';

interface ILoginInfo {
  login: string;
  password: string;
}

interface IAutorization {
  setIsAuthorized: (isAuthorized: boolean) => void;
}

export const Autorization: React.FC<IAutorization> = ({ setIsAuthorized }) => {
  const loc = useContext(LocalizationContext);

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

  const resetAllErrors = () => {
    setIsShowSecretCodeError(false);
    setIsShowWrongLoginError(false);
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
        <S.FormContainer onSubmit={handleSubmit}>
          <S.Form>
            <input
              value={loginInfo?.login}
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, login: e.target.value })
              }
              placeholder={loc.login}
            />
            <input
              value={loginInfo?.password}
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
          <button
            type="button"
            onClick={async (e) => {
              if (isUserExist) {
                const isUserExist = await checkUserInfo(
                  loginInfo?.login,
                  loginInfo?.password
                );

                if (isUserExist) {
                  setIsAuthorized(true);
                } else {
                  setIsShowWrongLoginError(true);
                }
              } else {
                resetAllErrors();

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
              }
            }}
          >
            {isUserExist ? loc.signIn : loc.registration}
          </button>
        </S.FormContainer>
      </S.Block>
    </S.Container>
  );
};
