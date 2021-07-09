import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import HeroSection from './components/Hero Section/HeroSection';
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
