import { useState, useEffect, forwardRef } from "react";
import firebase from "../../../firebase";
import { firestore } from "../../../firebase";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField } from "@material-ui/core";
import StudentNav from "../StudentNavbar/StudentNav";
import { Formik } from "formik";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import * as Yup from "yup";

function Enrollment() {
  const useStyles = makeStyles((theme) => ({
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      marginLeft: "240px",
    },
  }));
  const col = [
    {
      title: "Course Name",
      field: "courseName",
    },
    {
      title: "Course Code",
      field: "courseCode",
    },
    {
      title: "Course Description",
      field: "courseDescription",
    },
    {
      title: "Course ID",
      field: "id",
    },
    {
      title: "Professor Name",
      field: "professorName",
    },
    {
      title: "Program Id",
      field: "programId",
    },
    {
      title: "Program Name",
      field: "programName",
    },
  ];
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
  //get current user UID
  const user = firebase.auth().currentUser.uid;
  const uid = user;
  const studentUser = firebase.firestore().collection("student").doc(uid);
  //schema to validate course name
  const [courseData, setCourseData] = useState([]);
  const [studentCourses, setStudentCourses] = useState([]);

  const [studentData, setStudentData] = useState([]);

  const classes = useStyles();
  // get the course data


  async function deleteCourse(id) {
    await studentUser.collection("takenCourses").doc(id).delete();
    studentUser
      .collection("takenCourses")
      .get()
      .then((takenCourses) => {
        setStudentCourses(
          takenCourses.docs.map((course) => course.data().rowData)
        );

        console.log(
          "my taken:",
          takenCourses.docs.map((course) => course.data())
        );
      });
  }
  async function addCourse(rowData) {
    await studentUser
      .collection("takenCourses")
      .add({ rowData })
      .then((value) => {
        studentUser
          .collection("takenCourses")
          .doc(value.id)
          .update({ "rowData.takenID": value.id });
        studentUser
          .collection("takenCourses")
          .get()
          .then((takenCourses) => {
            setStudentCourses(
              takenCourses.docs.map((course) => course.data().rowData)
            );

            console.log(
              "my taken:",
              takenCourses.docs.map((course) => course.data())
            );
          });
      });
  }

  useEffect(() => {
    studentUser
      .get()
      .then((student) => {
        if (student.exists) {
          console.log("Document data:", student.data());
          setStudentData(student.data());
          firestore
            .collection("courses")
            .where("programName", "==", student.data().programName)
            .get()
            .then((courses) => {
              setCourseData(courses.docs.map((course) => course.data()));
            });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    studentUser
      .collection("takenCourses")
      .get()
      .then((takenCourses) => {
        setStudentCourses(
          takenCourses.docs.map((course) => course.data().rowData)
        );
        console.log(
          "my taken:",
          takenCourses.docs.map((course) => course.data().rowData)
        );
      });
  }, []);

  return (
    <div className={classes.root}>
      <StudentNav />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <h3>Student Program: {studentData.programName}</h3>
      </div>
      <MaterialTable
        icons={tableIcons}
        title="Student Available Courses"
        columns={col}
        data={courseData}
        actions={[
          {
            icon: tableIcons.Add,
            tooltip: "Add taken course",
            onClick: (event, rowData) => {
              addCourse(rowData);
            },
          },


        ]}
      />
      <MaterialTable
        icons={tableIcons}
        title="Student Added Courses"
        columns={col}
        data={studentCourses}

        // editable={{
        //     onRowDelete: oldData =>
        //     new Promise((resolve, reject) => {         
        //         setTimeout(() => {
        //             console.log(oldData.takenID);
        //             deleteCourse(oldData.takenID);
        //             resolve();
        //         }, 2000);
        //     })
        // }}

        actions={[
          {
            icon: tableIcons.Delete,
            tooltip: "delete course",
            onClick: async (event, rowData) => {
              deleteCourse(rowData.takenID);
            },
          },

        ]}
      />
    </div>
  );
}

export default Enrollment;
