import logo from './logo.svg';
import './App.css';
import {Route,BrowserRouter as Router,Switch} from 'react-router-dom'
import SignUp from "./SignUp/SignUp"
import Login from "./Login/Login"
import AdminHomePage from "./AdminHomePage/AdminHomePage"
import { AuthProvider } from "../Contexts/AuthContext"
import ProtectedRoute from './ProtectedRoute';


function App() {
  return (
    <Router>
          <AuthProvider>
            <Switch>
              <Route path="/login">
                <Login></Login>
              </Route>
           <ProtectedRoute exact path ="/admin" component={AdminHomePage}></ProtectedRoute>
           <Route path="/signUp">
                <SignUp></SignUp>
              </Route>
            </Switch>
           

</AuthProvider>
    </Router>


 
  );
}

export default App;
