import { createContext } from 'react';
import { engLoc, ILoc } from '../localization';

export const LocalizationContext = createContext<ILoc>(engLoc);
