/* eslint-disable @next/next/no-img-element */
import { useContext, useMemo, useState } from 'react';
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
  setSelectedMovie: (selectedMovie: IFindedMovie | null) => void;
}

export const Movie: React.FC<IMovie> = ({
  selectedMovie,
  setSelectedMovie,
}) => {
  const allUserMovies = useContext<IUserMovies | null>(MoviesContext);
  const userInfo = useContext<ILoginInfo | null>(UserInfoContext);
  const updateMovies = useContext(IsUpdateMoviesContext);

  const hasMovieInList = allUserMovies?.movies?.find(
    (movie) => movie.id === selectedMovie.imdbID
  );

  const [isWatched, setIsWatched] = useState<boolean>(!!hasMovieInList?.watched);


  const hasMovieInListUpdated = useMemo(
    () => allUserMovies?.movies?.find((movie) => movie.id === selectedMovie.imdbID),
    [allUserMovies, selectedMovie.imdbID]
  );

  const onChange = async () => {
    setIsWatched(!isWatched);

    try {
      if (hasMovieInList || hasMovieInListUpdated) {
        const movieId = hasMovieInList?.id;
        const path = `movies[_key=="${movieId}"]`;

        let patch = sanity.patch((allUserMovies as IUserMovies)._id);

        if (!hasMovieInList?.watched) {
          patch = patch.set({
            [`${path}.watched`]: true,
            [`${path}.watchedAt`]: new Date().toISOString(),
          });
        } else {
          patch = patch
            .set({ [`${path}.watched`]: false })
            .unset([`${path}.watchedAt`]);
        }

        await patch.commit();
        updateMovies();
      } else {
        if (!(allUserMovies as IUserMovies)) {
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
                poster: selectedMovie.Poster,
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
              poster: selectedMovie.Poster,
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
              onChange={onChange}
            />
            Watched
          </div>
        </div>
      </div>
    </div>
  );
};
