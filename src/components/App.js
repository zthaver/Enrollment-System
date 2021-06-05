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
import ProfessorTestingPage from './ProfessorTestingPage/ProfessorTestingPage';


function App() {
  return (
    <Router>
          <AuthProvider>
            <Switch>
              <Route path="/login">
                <Login></Login>
              </Route>
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
