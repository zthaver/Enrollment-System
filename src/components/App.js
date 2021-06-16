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
import ProfessorHomePage from './ProfessorHomePage/ProfessorHomePage';
import HomePage from './HomePage/HomePage';
import StudentHomePage from './StudentHomePage/StudentHomePage';
import StudentRoute from './StudentRoute';
import createDepartment from './CreateDepartment/CreateDepartment'
import ViewStudent from './ViewStudent/ViewStudentInformation'
import ProfessorAccount from './ViewProfessor/ProfessorAccount';
import ViewDepartments from './ViewDepartments/ViewDepartments';
import UpdateDepartment from "./UpdateDepartment/UpdateDepartments";
import ManageStudent from "./Manage/ManageStudent"
import ManageProfessor from "./Manage/ManageProfessor"
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
            <ProfessorRoute exact path ="/professor" component={ProfessorHomePage}></ProfessorRoute>
            <AdminRoute exact path ="/createDepartment" component={createDepartment}></AdminRoute>
            <AdminRoute exact path="/updateDepartment/:id" component= {()=><UpdateDepartment/>}></AdminRoute>
            <AdminRoute exact path ="/viewDepartment" component={ViewDepartments}></AdminRoute>
            <AdminRoute exact path ="/ManageStudent" component={ManageStudent}></AdminRoute>
            <AdminRoute exact path ="/ManageProfessor" component={ManageProfessor}></AdminRoute>
            <StudentRoute exact path ="/student" component={StudentHomePage}></StudentRoute>
            <StudentRoute exact path="/viewStudent" component={ViewStudent} />
            <Route exact path="/viewProf" component={ProfessorAccount}/>
            <Route path="/signUp">
                <SignUp></SignUp>
              </Route>
            </Switch>  

</AuthProvider>
    </Router>


 
  );
}

export default App;
