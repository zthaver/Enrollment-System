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
import viewDepartment from './ViewDepartments/ViewDepartments';

import CreateCourse from './CreateCourse/CreateCourse';
import ViewStudent from './ViewStudent/ViewStudentInformation';
import UpdateCourse from './UpdateCourse/UpdateCourse';
import ProfessorAccount from './ViewProfessor/ProfessorAccount';
import ManageCourse from './Manage Course/ManageCourse';
import CreateProgram from './CreateProgram/CreateProgram';
import ManageProgram from './ManageProgram/ManageProgram';
import UpdateProgram from './UpdateProgram/UpdateProgram';
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
            <AdminRoute exact path ="/manageStudent" component={ManageStudent}></AdminRoute>
            <AdminRoute exact path ="/manageProfessor" component={ManageProfessor}></AdminRoute>
            <AdminRoute exact path ="/createDepartment" component={createDepartment}></AdminRoute>
            <AdminRoute exact path = "/createCourse" component={CreateCourse}></AdminRoute>
            <AdminRoute exact path = "/createProgram" component={CreateProgram}></AdminRoute>
            <AdminRoute exact path = "/updateCourse/:id" component={UpdateCourse}></AdminRoute>
            <AdminRoute exact path = "/updateProgram/:id" component={UpdateProgram}></AdminRoute>
            <AdminRoute exact path = "/viewCourse" component={ManageCourse}></AdminRoute>
            <AdminRoute exact path = "/manageProgram" component={ManageProgram}></AdminRoute>
            <AdminRoute exact path="/updateDepartment/:id" component= {()=><UpdateDepartment/>}></AdminRoute>
            <AdminRoute exact path ="/viewDepartment" component={ViewDepartments}></AdminRoute>
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
