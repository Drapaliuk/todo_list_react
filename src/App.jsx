import './App.scss';
import React from 'react'
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Organizer, Authorization, Introduction } from './pages';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthStatus, getFetchingInitDataStatus, getInitializeStatus } from './redux/selectors';
import { initializeApp } from './redux/actions';
export function App() {
  const dispatch = useDispatch()
  const isAuthorization = useSelector(state => getAuthStatus(state));
  const isInitialized = useSelector(state => getInitializeStatus(state));
  const isFetchingInitData = useSelector(state => getFetchingInitDataStatus(state));
console.log('isInitialized', isInitialized)
  React.useEffect(() => {
    if(!isInitialized) {
      dispatch(initializeApp())
    }
  }, []);

  if(isFetchingInitData) {
    return <div className = "authorization">
      <div class="preloader-container">
        <div class="dash uno"></div>
        <div class="dash dos"></div>
        <div class="dash tres"></div>
        <div class="dash cuatro"></div>
      </div>
      <div className = 'preloader-title'>
        Loading...
      </div>
    </div>
  }
  return (
        <BrowserRouter >
            {isAuthorization && <Redirect to = '/app' />}
            {!isAuthorization && <Redirect to = '/' />}
            <Route exact path = '/' component = {Introduction} />
            <Route path = '/auth' component = {Authorization}/>
            <Route path = '/app' component = {Organizer} />
        </BrowserRouter>
  );
}