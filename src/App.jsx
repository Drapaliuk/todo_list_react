import './App.scss';
import React from 'react'
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Organizer, Authorization, Introduction } from './pages';
import { batch, useDispatch, useSelector } from 'react-redux';
import { getAuthStatus, getFetchingInitDataStatus, getInitializeStatus } from './redux/selectors';
import { initializeApp, lostConnection, networkConnectionStatus } from './redux/actions';
export function App() {
  const dispatch = useDispatch()
  const isAuthorization = useSelector(state => getAuthStatus(state));
  const isInitialized = useSelector(state => getInitializeStatus(state));
  const isFetchingInitData = useSelector(state => getFetchingInitDataStatus(state));
  const isConnectionToNetwork = useSelector(state => state.initialize.isConnectionToNetwork)
  const isLostConnection = useSelector(state => state.initialize.isLostConnection)

  console.log('isLostConnection', isLostConnection)


  React.useEffect(() => {
    if(!isInitialized) {
      dispatch(initializeApp())
    }
  }, []);


  React.useEffect(() => {
    function networkStatusHandler() {
      batch(() => {
        dispatch(networkConnectionStatus(true))
        dispatch(lostConnection(false))
        dispatch(initializeApp())
      })
    }

    window.addEventListener('online', networkStatusHandler)
    return () => {
      window.removeEventListener('online', networkStatusHandler)
    }
  }, [])

  React.useEffect(() => {
    function networkStatusHandler() {
        dispatch(lostConnection(true))
    }

    window.addEventListener('offline', networkStatusHandler)
    return () => {
      window.removeEventListener('offline', networkStatusHandler)
    }
  }, [])



  if(!isConnectionToNetwork) {
    return <h1>NOT CONNECTION TO NETWORK</h1>
  }

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