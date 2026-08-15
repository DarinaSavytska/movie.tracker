import { createContext } from 'react';
import { engLoc, ILoc } from '../localization';
import { ILoginInfo, IUserMovies } from '../types';

export const LocalizationContext = createContext<ILoc>(engLoc);
export const MoviesContext = createContext<IUserMovies>(null);
export const UserInfoContext = createContext<ILoginInfo>(null);
export const IsUpdateMoviesContext = createContext<() => void>(null);
