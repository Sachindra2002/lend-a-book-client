import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path="/register" component={Register}/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
