import { FETCH_ALL } from '../constants/actionTypes';
import * as api from '../api';

export const getPosts = () => async(dispatch) => {
    //since we need to get data from api as payload to be passed with action, we need to make the function async,
    //redux-thunk allows us to make it async and we get dispatch also as a parameter
    try{
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data });
    }catch(err){
        console.log(err.message);
    }
};