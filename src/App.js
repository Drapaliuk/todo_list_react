import './App.css';
// import Authorization from './components/authorization/Authorization';
import {Route, BrowserRouter, Redirect} from 'react-router-dom';
import { Application, Authorization } from './components';
function App() {
  return (
        <BrowserRouter >
            <Route path = '/auth' component = {Authorization}/>
            <Route exact path = '/' component = {Application} />
            {/* <Redirect to = '/auth/introduction' /> */}
        </BrowserRouter>
  );
}

export default App;
