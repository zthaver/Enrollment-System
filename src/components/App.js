import logo from './logo.svg';
import './App.css';
import {Route,BrowserRouter as Router,Switch} from 'react-router-dom'
import SignUp from "./Student/SignUp/SignUp"
import Login from "./General/Login/Login"
import { AuthProvider } from "../Contexts/AuthContext"

//homepage
import AdminHomePage from "./Admin/AdminHomePage/AdminHomePage"
import ProfessorHomePage from './Professor/ProfessorHomePage/ProfessorHomePage';
import StudentHomePage from './Student/StudentHomePage/StudentHomePage';
import HomePage from './General/HomePage/HomePage';

//routes
import AdminRoute from './AdminRoute';
import ProfessorRoute from './ProfessorRoute';
import StudentRoute from './StudentRoute';

//create
import CreateProfessor from './Admin/CreateProfessor/CreateProfessor';
import CreateAdmin from './Admin/CreateAdmin/CreateAdmin';
import createDepartment from './Admin/CreateDepartment/CreateDepartment'
import ViewDepartments from './Admin/ViewDepartments/ViewDepartments';
import CreateCourse from './Admin/CreateCourse/CreateCourse';
import CreateProgram from './Admin/CreateProgram/CreateProgram';

//update & view
import ViewStudent from './Student/ViewStudent/ViewStudentInformation';
import UpdateCourse from './Admin/UpdateCourse/UpdateCourse';
import ProfessorAccount from './Professor/ViewProfessor/ProfessorAccount';
import ManageCourse from './Admin/Manage Course/ManageCourse';

import ManageProgram from './Admin/ManageProgram/ManageProgram';
import UpdateProgram from './Admin/UpdateProgram/UpdateProgram';
import UpdateDepartment from "./Admin/UpdateDepartment/UpdateDepartments";
import SearchCourses from './Student/SearchCourses/SearchCourses';
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
            <StudentRoute exact path="/searchCourses" component={SearchCourses}></StudentRoute>
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
