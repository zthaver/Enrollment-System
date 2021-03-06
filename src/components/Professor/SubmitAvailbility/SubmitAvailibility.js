// import * as React from 'react';
import React, {
  useState,
  useEffect,
  useRef
} from "react";
import ProfNav from "../ProfessorNavbar/ProfNav";
import {
  TextField
} from "@material-ui/core";
import firebase from "../../../firebase";
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import {
  Link
} from "react-router-dom";
import {
  makeStyles
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {
  firestore
} from "../../../firebase";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navBar: {
    background: "#D92A1D",
    minHeight: "84px",
    paddingTop: "10px",
    zIndex: theme.zIndex.drawer + 1,
  },

  updateBtn: {
    background: "#fff",
    "&:hover": {
      background: "#D92A1D",
      color: "#fff",
    },
    color: "#000",
    marginLeft: "20px",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },

  gridContainer: {
    paddingTop: "0px",
    paddingLeft: "250px",
    height: "100vh",
  },

  profDetails: {
    background: "#E3DFFF",
  },

  profUpdateInfo: {
    background: "#e3e3e3",
    padding: "20px",
  },

  infoItem: {
    padding: "10px 0 10px 0",
    margin: "25px 0 5px 0",
  },

  erroMsg: {
    width: "100%",
    marginTop: "20px",
    textAlign: "center",
    color: "#D92A1D",
    fontWeight: "bold",
    letterSpacing: "1px",
    wordSpacing: "5px",
  },
}));

function SubmitAvailiblity() {
  const classes = useStyles();
  const user = firebase.auth().currentUser.uid;
  const uid = user;
  const profUser = firebase.firestore().collection("professors").doc(uid);
  const departmentCollection = firebase.firestore().collection("department");
  const [profDepartment, setProfDepartment] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [day, setDay] = useState("");
  const [timesArray, setTimesArray] = useState([]);
  const [timesObj, setTimesObj] = useState({});
  const time = day + " Start: " + startTime + " - End: " + endTime;
  const [appointmentData, setAppointments] = useState([]);
  const newAppointmentData = [];
  const appointments = new Array();

  let [departmentHead, setDepartmentHead] = useState(false);

  //appointment id when adding a new appointment
  const [aptId, setAptId] = useState(1);

  //authenticate usert to view submit availability in the navbar
  useEffect(() => {
    console.log("in use effect");
    firestore
      .collection("professors")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((val) => {
        setDepartmentHead(val.data().isDepartmentHead);
      });
  }, []);

  useEffect(() => {
    profUser.get().then((appointmentsData) => {
      if (appointmentsData.exists) {
        console.log("Document data:", appointmentsData.data().departmentid);

        setAppointments(
          appointmentsData.data().availability.map((appointment) => {
            console.log(appointment.start.toDate());
            let convertedAppointment = {};
            // appointment.data();
            convertedAppointment.start = appointment.start.toDate();
            convertedAppointment.end = appointment.end.toDate();
            // convertedAppointment.description = appointment.get("description");
            // convertedAppointment.subject = appointment.get("subject");
            console.log("convertedAppointment");
            console.log(convertedAppointment);
            // console.log(appointment.data())
            return convertedAppointment;
          })
        );

        //retrieve the department for this professor
        setProfDepartment(appointmentsData.data().departmentid);
        console.log("profDepartment");
        console.log(profDepartment);
      } else {
        console.log("No availability");
      }
    });
  }, []);

  appointmentData.forEach((appointment) => {
    appointments.push(appointment);
  });

  const appointment1 = {
    calendar: "Room 1",
    description: "George brings projector for presentations.",
    end: new Date(2018, 10, 23, 16, 0, 0),

    start: new Date(2018, 10, 23, 9, 0, 0),
  };

  // var listItems = timesArray.map((time) =>
  // <li key={time.id}>
  //     <span key={time.start}> {time.start.toString()} </span> to
  //     <span key={time.end}> {time.end.toString()} </span>
  //     <button type="button" onClick={() => handleRemove(time.id)}> Remove </button>
  // </li>);

  var listItems = timesArray.map((time) => ( <
    li key = {
      time.id
    } >
    <
    span > {
      time.start.toString()
    } < /span> to{" "} <
    span > {
      time.end.toString()
    } < /span>{" "} <
    Button color = "secondary"
    type = "button"
    onClick = {
      () => handleRemove(time.id)
    } > {
      " "
    }
    Remove {
      " "
    } <
    /Button>{" "} < /
    li >
  ));

  function add() {
    if (startTime == null || endTime == null) {
      alert("Please Select Fields");
    } else {
      console.log("Apppointment ID");
      console.log(aptId);
      console.log("working");
      console.log(`Total time: ${time}`);
      console.log(`sTART time:::: ${startTime}`);
      console.log(`End time:::: ${endTime}`);
      console.log(`Day :::: ${day}`);

      // setTimesObj({
      //   day: day,
      //   start: startTime,
      //   end: endTime
      // })

      const myObj = {
        id: aptId,
        start: startTime, //new Date(`${day}, 2018 ${startTime}`),
        end: endTime, //new Date(`${day}, 2018 ${endTime}`)
      };
      // setTimesArray( arr => [...arr, time]);
      // setTimesArray( arr => [...arr, timesObj]);
      timesArray.push(myObj);

      setDay(null);
      setStartTime("");
      setEndTime("");

      let newId = aptId + 1;
      setAptId(newId);
      // aptId = aptId +1;
    }
  }

  function handleRemove(id) {
    console.log(id);
    const newArr = timesArray.filter((item) => item.id !== id);
    setTimesArray(newArr);
  }

  function submit(e) {
    e.preventDefault();

    //update information in prof collection
    // profUser.update({
    //   availability: timesArray,
    // })
    // .then(()=>{
    //   console.log("Availability has been updated ");
    //   alert(`Prof Availability added`);
    // })
    // .catch((err) => {
    //   console.log("Handle Update Error: ", err);
    // })

    timesArray.forEach((element) => {
      profUser
        .collection("availabilities")
        .add({
          start: startTime,
          end: endTime,
          professorId: uid,
        })
        .then(() => {
          console.log("Availability has been updated ");
          alert(`Prof Availability added`);
        })
        .catch((err) => {
          console.log("Handle Update Error: ", err);
        });

      //create availlabilities collection
      departmentCollection
        .doc(profDepartment)
        .collection("availabilities")
        .add({
          start: element.start,
          end: element.end,
          professorId: uid,
        })
        .then(() => {
          console.log("Availability has been updated in the department");
          alert(`Availability added to department`);
        })
        .catch((err) => {
          console.log("Handle Update Error: ", err);
        });
    });

    //update information in the

    // departmentCollection.doc(profDepartment).update({
    //     availability: timesArray,
    //   })
    //   .then(()=>{
    //     console.log("Availability has been updated in the department");
    //     alert(`Availability added to department`);
    //   })
    //   .catch((err) => {
    //     console.log("Handle Update Error: ", err);
    //   })

    // alert("Doesn't exist")

    //     //create availlabilities collection
    //     departmentCollection.doc(profDepartment).collection("availabilities").add({
    //       "availability": timesArray,
    //       "professorId": uid,
    //     })
    //     .then(()=>{
    //       console.log("Availability has been updated in the department");
    //       alert(`Availability added to department`);
    //     })
    //     .catch((err) => {
    //       console.log("Handle Update Error: ", err);
    //     })
  }

  return ( <
    div style = {
      {
        paddingTop: "100px",
      }
    } >
    <
    ProfNav isDepartmentHead = {
      departmentHead
    }
    /> <
    Drawer className = {
      classes.drawer
    }
    variant = "permanent"
    classes = {
      {
        paper: classes.drawerPaper,
      }
    } >
    <
    Toolbar / >
    <
    div className = {
      classes.drawerContainer
    } >
    <
    List >
    <
    ListItem button component = {
      Link
    }
    to = "/professor" >
    <
    ListItemText primary = "Home"
    style = {
      {
        paddingTop: "20px",
      }
    }
    />{" "} < /
    ListItem > {
      " "
    } <
    /List>{" "} <
    Divider / >
    <
    List >
    <
    ListItem button component = {
      Link
    }
    to = "/viewProf" >
    <
    ListItemText primary = "Details"
    style = {
      {
        paddingTop: "20px",
      }
    }
    />{" "} < /
    ListItem > {
      " "
    } <
    /List>{" "} < /
    div > {
      " "
    } <
    /Drawer> <
    div container className = {
      classes.gridContainer
    } >
    <
    form noValidate > {
      " "
    } {
      /* <label> Please select a day: </label>{" "}
                      <select id="daySelect" onChange={(e) => setDay(e.target.value)}>
                        <option value=""> - - </option>{" "}
                        <option value="November 19"> Monday </option>{" "}
                        <option value="November 20"> Tuesday </option>{" "}
                        <option value="November 21"> Wednesday </option>{" "}
                        <option value="November 22"> Thursday </option>{" "}
                        <option value="November 23"> Friday </option>
                      </select>{" "} */
    } {
      " "
    } <
    br / >
    <
    br / >
    <
    br / >
    <
    label > {
      " "
    } <
    strong > Start Time: < /strong>{" "} < /
    label > {
      " "
    } <
    TextField id = "datetime"
    type = "datetime-local"
    // defaultValue={startTime}
    value = {
      startTime
    }
    onChange = {
      (e) => setStartTime(e.target.value)
    }
    InputLabelProps = {
      {
        shrink: true,
      }
    }
    inputProps = {
      {
        step: 300, // 5 min
      }
    }
    />{" "} <
    br / >
    <
    br / >
    <
    br / >
    <
    label > {
      " "
    } <
    strong > End Time: < /strong>{" "} < /
    label > {
      " "
    } <
    TextField id = "datetime"
    type = "datetime-local"
    // defaultValue={endTime}
    value = {
      endTime
    }
    onChange = {
      (e) => setEndTime(e.target.value)
    }
    InputLabelProps = {
      {
        shrink: true,
      }
    }
    inputProps = {
      {
        step: 300, // 5 min
      }
    }
    />{" "} < /
    form > {
      " "
    } <
    br / >
    <
    br / >
    <
    br / >
    <
    Button color = "secondary"
    onClick = {
      add
    } > {
      " "
    }
    Add {
      " "
    } <
    /Button>{" "} <
    Button color = "secondary"
    onClick = {
      (e) => submit(e)
    } > {
      " "
    }
    Submit {
      " "
    } <
    /Button>{" "} <
    div > {
      listItems
    } < /div>{" "} < /
    div > {
      " "
    } <
    /div>
  );
}

export default SubmitAvailiblity;

// DATA TABLE  //

// import {react,useEffect,useState,useRef,forwardRef} from 'react';

// import JqxScheduler, {  jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxscheduler';
// import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
// import { firestore } from '../../../firebase';
// import MaterialTable from 'material-table';
// import AddBox from '@material-ui/icons/AddBox';
// import ArrowDownward from '@material-ui/icons/ArrowDownward';
// import Check from '@material-ui/icons/Check';
// import ChevronLeft from '@material-ui/icons/ChevronLeft';
// import ChevronRight from '@material-ui/icons/ChevronRight';
// import Clear from '@material-ui/icons/Clear';
// import DeleteOutline from '@material-ui/icons/DeleteOutline';
// import Edit from '@material-ui/icons/Edit';
// import FilterList from '@material-ui/icons/FilterList';
// import FirstPage from '@material-ui/icons/FirstPage';
// import LastPage from '@material-ui/icons/LastPage';
// import Remove from '@material-ui/icons/Remove';
// import SaveAlt from '@material-ui/icons/SaveAlt';
// import Search from '@material-ui/icons/Search';
// import ViewColumn from '@material-ui/icons/ViewColumn';

// const tableIcons = {
//     Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
//     Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
//     Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//     Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
//     DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//     Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
//     Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
//     Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
//     FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
//     LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
//     NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//     PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
//     ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//     Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
//     SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
//     ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
//     ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
//   };

// function SubmitAvailiblity ()  {

//     let [dataFetched,setDataFetched] = useState(false);
//     let [appointmentData,setAppointmentData] = useState([]);

//     const [columns, setColumns] = useState([
//         { title: 'Name', field: 'name' },
//         { title: 'Surname', field: 'surname', initialEditValue: 'initial edit value' },
//         { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
//         {
//           title: 'Birth Place',
//           field: 'birthCity',
//           lookup: { 34: '??stanbul', 63: '??anl??urfa' },
//         },
//       ]);

//             }