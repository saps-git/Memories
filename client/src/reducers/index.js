//here we will combine all the reducers that we have

import { combineReducers } from 'redux';
import posts from './posts';

export const reducers = combineReducers({
    posts,
});