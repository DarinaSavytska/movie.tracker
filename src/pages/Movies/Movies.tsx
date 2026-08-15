import { useContext, useState } from 'react';
// components
import { Movie } from '../Movie';
// styles
import * as S from './styled';
// types
import { ILoginInfo, IFindedMovie } from '../../types';
// other
import {
  globalConstants,
  LocalizationContext,
  UserInfoContext,
} from '../../constants';
import { findMovie, getUserMovies } from '../../api';

export const Movies: React.FC = () => {
  const loc = useContext(LocalizationContext);
  const userInfo = useContext<ILoginInfo>(UserInfoContext);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [findedMovies, setFindedMovies] = useState<IFindedMovie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<IFindedMovie>(null);

  const handleSubmit = async (e: React.FormEvent, page: number) => {
    e.preventDefault();

    try {
      const result = await findMovie(searchQuery, page);

      setError(result?.Error || '');

      return result;
    } catch (err) {
      console.error(err);
    }

    return null;
  };

  return (
    <div>
      <S.FormContainer>
        <S.Form
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
            placeholder={loc.min3Char}
          />
          <button type="submit">{loc.searchMovies}</button>
          <button
            type="button"
            onClick={async () => {
              const test = await getUserMovies(userInfo?.id);

              console.log('test', test);
            }}
          >
            test
          </button>
        </S.Form>
        {error?.length ? <S.ErrorText>{error}</S.ErrorText> : null}
      </S.FormContainer>
      {selectedMovie ? (
        <Movie
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      ) : (
        <S.MoviesContainer>
          {findedMovies?.length ? (
            <S.MoviesList>
              {findedMovies.map((movie) => (
                <S.MovieItem
                  key={movie.imdbID}
                  onClick={() => {
                    setSelectedMovie(movie);
                  }}
                >
                  <S.MovieTitle>{movie.Title}</S.MovieTitle>
                  <S.MovieImg
                    src={
                      movie.Poster !== 'N/A'
                        ? movie.Poster
                        : globalConstants.bookImg
                    }
                    alt={movie.Title}
                  />
                </S.MovieItem>
              ))}
            </S.MoviesList>
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
              {loc.loadMore}
            </button>
          )}
        </S.MoviesContainer>
      )}
    </div>
  );
};
