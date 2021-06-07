import logo from './logo.svg';
import './App.css';
import {Route,BrowserRouter as Router,Switch} from 'react-router-dom'
import SignUp from "./SignUp/SignUp"
import Login from "./Login/Login"
import AdminHomePage from "./AdminHomePage/AdminHomePage"
import { AuthProvider } from "../Contexts/AuthContext"
import AdminRoute from './AdminRoute';
import ProfessorRoute from './ProfessorRoute';
import CreateProfessor from './CreateProfessor/CreateProfessor';
import CreateAdmin from './CreateAdmin/CreateAdmin';
import ProfessorTestingPage from './ProfessorTestingPage/ProfessorTestingPage';
import HomePage from './HomePage/HomePage'

function App() {
  return (
    <Router>
          <AuthProvider>
            <Switch>
              <Route path="/login">
                <Login></Login>
              </Route>
            <Route exact path="/" component={ HomePage } />
            <AdminRoute exact path ="/createAdmin" component={CreateAdmin}></AdminRoute>
           <AdminRoute exact path ="/admin" component={AdminHomePage}></AdminRoute>
           <AdminRoute exact path ="/createProfessor" component={CreateProfessor}></AdminRoute>
           <ProfessorRoute exact path ="/professor" component={ProfessorTestingPage}></ProfessorRoute>
           <Route path="/signUp">
                <SignUp></SignUp>
              </Route>
            </Switch>
           

</AuthProvider>
    </Router>


 
  );
}

export default App;
