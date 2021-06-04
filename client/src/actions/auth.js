import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, router) => async (dispatch) => {
    try{
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, payload: data });

        router.push('/');
    } catch(err){
        console.log(err);
    }
};

export const signup = (formData, router) => async (dispatch) => {
    try{
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, payload: data });
        
        router.push('/');
    } catch(err){
        console.log(err);
    }
}