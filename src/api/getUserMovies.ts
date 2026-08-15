import { sanity } from '../utils';

export const getUserMovies = async (id: number) => {
  try {
    const query = '*[_type == "user" && id == $id][0]';
    const params = { id };

    const result = await sanity.fetch(query, params);

    if (result) {
      return result;
    }

    return false;
  } catch (err) {
    console.error('Помилка при запиті:', err);
    return false;
  }
};
