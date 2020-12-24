import './App.css';
import React from 'react'
import {Route, BrowserRouter, Redirect} from 'react-router-dom';
import { Application, Authorization, Introduction } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthStatus, getFetchingInitDataStatus, getInitializeStatus } from './redux/selectors';
import { initialize } from './redux/actions';

function App() {
  const dispatch = useDispatch()
  const isAuthorization = useSelector(state => getAuthStatus(state));
  const isInitialized = useSelector(state => getInitializeStatus(state));
  const isFetchingInitData = useSelector(state => getFetchingInitDataStatus(state));

  React.useEffect(() => {
    if(!isInitialized) {
      dispatch(initialize())
    }
  }, []);

  if(isFetchingInitData) {
    
    return <div className = "authorization">
      <h1>Loading</h1>
    </div>
  }

  return (
        <BrowserRouter >
            {isAuthorization && <Redirect to = '/tasks' />}
            <Route exact path = '/' component = {Introduction} />
            <Route path = '/auth' component = {Authorization}/>
            <Route path = '/tasks' component = {Application}/>
        </BrowserRouter>
  );
}

export default App;
