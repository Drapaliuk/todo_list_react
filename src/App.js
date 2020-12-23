import './App.css';
// import Authorization from './components/authorization/Authorization';
import {Route, BrowserRouter, Redirect} from 'react-router-dom';
import { Application, Authorization, Introduction } from './components';
function App() {
  return (
        <BrowserRouter >
            <Route exact path = '/' component = {Introduction} />
            <Route path = '/auth' component = {Authorization}/>
            <Route path = '/tasks' component = {Application}/>

            
        </BrowserRouter>
  );
}

export default App;
