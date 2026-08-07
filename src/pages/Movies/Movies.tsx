import { useState } from 'react';
import { findMovie } from '../../api';

export const Movies: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [findedMovies, setFindedMovies] = useState<
    {
      imdbID: string;
      Title: string;
      Poster: string;
    }[]
  >([]);
  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent, page: number) => {
    e.preventDefault();

    try {
      const result = await findMovie(searchQuery, page);

      return result;
    } catch (err) {
      console.error(err);
    }

    return null;
  };

  return (
    <div>
      <form
        onSubmit={async (e) => {
          const result = await handleSubmit(e, 1);

          setPage(1);
          setFindedMovies(result.Search);
          setTotalResults(result.totalResults);
        }}
      >
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        {findedMovies?.length ? (
          <ul>
            {findedMovies.map((movie) => (
              <li key={movie.imdbID}>
                <div>{movie.Title}</div>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  style={{ width: '20%' }}
                />
              </li>
            ))}
          </ul>
        ) : null}
        {totalResults > findedMovies?.length && (
          <button
            type="button"
            onClick={async (e) => {
              setPage(page + 1);

              const result = await handleSubmit(e, page + 1);

              setFindedMovies([...findedMovies, ...result.Search]);
            }}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};
