import { globalConstants } from '../constants';

export const findMovie = async (query: string, page: number) => {
  try {
    const res = await fetch(`${globalConstants.mainUrl}/api/searchMovies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, page }),
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.error('Error fetching:', err);
  }

  return null;
};
