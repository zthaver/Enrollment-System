import logo from './logo.svg';
import './App.css';
import {Route,BrowserRouter as Router,Switch} from 'react-router-dom'
import SignUp from "./SignUp/SignUp"
import Login from "./Login/Login"
import AdminHomePage from "./AdminHomePage/AdminHomePage"
import { AuthProvider } from "../Contexts/AuthContext"

function App() {
  return (
    <Router>
          <AuthProvider>
            <Switch>
              <Route path="/signUp">
                <SignUp></SignUp>
              </Route>
              <Route path="/login">
                <Login></Login>
              </Route>
              <Route path="/">
                <AdminHomePage></AdminHomePage>
              </Route>
            </Switch>

</AuthProvider>
    </Router>


 
  );
}

export default App;
