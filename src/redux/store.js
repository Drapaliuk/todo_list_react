import { createStore, compose, applyMiddleware } from "redux"
import thunkMiddleware from 'redux-thunk';
import {combinedReducers} from './reducers';

const middlewares = [thunkMiddleware]

const composeEnhsncer  = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(combinedReducers, composeEnhsncer(applyMiddleware(...middlewares)));
window.store = store;