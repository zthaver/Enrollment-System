
import './App.css';
import './components/Signup'
import Signup from './components/Signup';
import Home from './components/Home';
import { AuthProvider } from "./Authentication/Auth"
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signup" component={ Signup } />
          <Route exact path="/" component={ Home } />
        </Switch>

      </AuthProvider>
    </Router>


  );
}

export default App;
