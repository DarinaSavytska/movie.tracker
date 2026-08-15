interface IMovie {
  id: string;
  title: string;
  watched: boolean;
  watchedAt: string;
}

interface ISearial {
  id: string;
  seasons: {
    season: number;
    episodes: {
      episode: number;
      id: string;
      title: string;
      watched: boolean;
      watchedAt: string;
    }[];
  }[];
  title: string;
}

export interface IUserMovies {
  id: number;
  movies: IMovie[];
  serials: ISearial[];
  title: string;
  _id: string;
}
