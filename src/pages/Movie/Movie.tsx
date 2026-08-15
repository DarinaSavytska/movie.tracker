import { useContext, useEffect, useState } from 'react';
// types
import { IFindedMovie, ILoginInfo, IUserMovies } from '../../types';
// other
import {
  globalConstants,
  IsUpdateMoviesContext,
  MoviesContext,
  UserInfoContext,
} from '../../constants';
import { sanity } from '../../utils';

interface IMovie {
  selectedMovie: IFindedMovie;
  setSelectedMovie: (selectedMovie: IFindedMovie) => void;
}

export const Movie: React.FC<IMovie> = ({
  selectedMovie,
  setSelectedMovie,
}) => {
  const allUserMovies = useContext<IUserMovies>(MoviesContext);
  const userInfo = useContext<ILoginInfo>(UserInfoContext);
  const updateMovies = useContext(IsUpdateMoviesContext);

  const hasMovieInList = allUserMovies?.movies?.find(
    (movie) => movie.id === selectedMovie.imdbID
  );

  const [hasMovieInListUpdated, setHasMovieInListUpdated] = useState(null);
  const [isWatched, setIsWatched] = useState<boolean>(hasMovieInList?.watched);

  const onChange = async () => {
    setIsWatched(!isWatched);

    try {
      if (hasMovieInList || hasMovieInListUpdated) {
        console.log('need update');
      } else {
        if (!allUserMovies) {
          await sanity.create({
            _id: allUserMovies?._id,
            _type: 'user',
            title: userInfo?.login,
            id: userInfo?.id,
            movies: [
              {
                _type: 'movie',
                _key: selectedMovie.imdbID,
                title: selectedMovie.Title,
                id: selectedMovie.imdbID,
                watchedAt: new Date().toISOString(),
                watched: true,
              },
            ],
          });
        }
        await sanity
          .patch(allUserMovies?._id)
          .setIfMissing({ movies: [] })
          .append('movies', [
            {
              _type: 'movie',
              _key: selectedMovie.imdbID,
              title: selectedMovie.Title,
              id: selectedMovie.imdbID,
              watchedAt: new Date().toISOString(),
              watched: true,
            },
          ])
          .commit();

        updateMovies();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setHasMovieInListUpdated(
      allUserMovies?.movies?.find((movie) => movie.id === selectedMovie.imdbID)
    );
  }, [allUserMovies]);

  return (
    <div>
      <button
        type="button"
        style={{ marginTop: '50px' }}
        onClick={() => {
          setSelectedMovie(null);
          updateMovies();
        }}
      >
        Back
      </button>
      <div style={{ display: 'flex' }}>
        <img
          src={
            selectedMovie.Poster !== 'N/A'
              ? selectedMovie.Poster
              : globalConstants.bookImg
          }
          alt={selectedMovie.Title}
        />
        <div>
          <div>{selectedMovie.Title}</div>
          <div
            onClick={() => {
              onChange();
            }}
          >
            <input
              type="checkbox"
              id="scales"
              name="scales"
              checked={isWatched}
            />
            Watched
          </div>
        </div>
      </div>
    </div>
  );
};
