import './App.scss';
import React from 'react'
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Organizer, Authorization, Introduction } from './pages';
import { batch, useDispatch, useSelector } from 'react-redux';
import { getAuthStatus, getFetchingInitDataStatus, getInitializeStatus } from './redux/selectors';
import { initializeApp, lostConnection, networkConnectionStatus } from './redux/actions';
import { InaccessibleServer, InitializePreloader, NoConnection } from './components';

export function App() {
  const dispatch = useDispatch()
  const isAuthorization = useSelector(state => getAuthStatus(state));
  const isInitialized = useSelector(state => getInitializeStatus(state));
  const isFetchingInitData = useSelector(state => getFetchingInitDataStatus(state));
  const isConnectionToNetwork = useSelector(state => state.initialize.isConnectionToNetwork)
  const isServerInaccessible = useSelector(state => state.initialize.isServerInaccessible)
  const wasLostConnection = useSelector(state => state.initialize.wasLostConnection)

  React.useEffect(() => {
    if(!isInitialized) {
      dispatch(initializeApp())
    }
  }, []);


  React.useEffect(() => {
    const networkStatusHandler = () => {
      batch(() => {
        dispatch(networkConnectionStatus(true))
        if(wasLostConnection) {
          dispatch(initializeApp())
        }
        dispatch(lostConnection(false))
      })
    }

    window.addEventListener('online', networkStatusHandler)
    return () => window.removeEventListener('online', networkStatusHandler)
  }, [])

  React.useEffect(() => {
    const networkStatusHandler = () => dispatch(lostConnection(true))
    window.addEventListener('offline', networkStatusHandler)

    return () => window.removeEventListener('offline', networkStatusHandler)
  }, [])

  if(!isConnectionToNetwork) return <NoConnection />
  if(isServerInaccessible) return <InaccessibleServer />
  if(isFetchingInitData) return <InitializePreloader />

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