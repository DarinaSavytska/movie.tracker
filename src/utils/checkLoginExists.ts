import { sanity } from './sanityClient';

export const checkLoginExists = async (login: string) => {
  try {
    const query = '*[_type == "autorization" && login == $login][0]';
    const params = { login };

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
