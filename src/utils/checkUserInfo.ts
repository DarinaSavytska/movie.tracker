import { sanity } from './sanityClient';

export const checkUserInfo = async (login: string, password: string) => {
  try {
    const query =
      '*[_type == "autorization" && login == $login && password == $password][0]';
    const params = { login, password };

    const result = await sanity.fetch(query, params);

    if (result) {
      return true;
    }

    return false;
  } catch (err) {
    console.error('Помилка при запиті:', err);
    return false;
  }
};
