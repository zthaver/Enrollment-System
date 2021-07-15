import React, {useState, useEffect } from 'react';
import { firestore } from "../../../firebase";
import ProfNav from '../ProfessorNavbar/ProfNav';
import { useLocation } from "react-router-dom";
import { TextField } from '@material-ui/core';
import firebase from '../../../firebase';

import Paper from '@material-ui/core/Paper';




function SubmitAvailiblity()
{
  const user = (firebase.auth().currentUser).uid;
  const uid = user;
  const profUser = firebase.firestore().collection("professors").doc(uid);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [day, setDay] = useState("");
  
  const [timesArray, setTimesArray] = useState([]);
  const [timesObj, setTimesObj] = useState({});


  const time = day + " Start: " + startTime + " - End: " + endTime;

  var listItems = timesArray.map((time) =>  <li >
                                              <span key={time.day}> {time.day} </span>  
                                              <span key={time.start}> {time.start} </span>  
                                              <span key={time.end}> {time.end} </span>  
                                            </li>);


  function test(){
    console.log("working");    

    console.log(`Total time: ${time}`)
    console.log(`sTART time:::: ${startTime}`)
    console.log(`End time:::: ${endTime}`)
    console.log(`Day :::: ${day}`)
    
    setTimesObj({ 
      day: day,
      start: startTime,
      end: endTime
    })

    // setTimesArray( arr => [...arr, time]);
    setTimesArray( arr => [...arr, timesObj]);
    
    setDay("");
    setStartTime("");
    setEndTime("");

  }

  function edit(){
    // handleStartChange('Mon Jul 12 2021 20:40:21 GMT-0400 (Eastern Daylight Time)')
    console.log("TIMES ARRAY")
    console.log(listItems)
    console.log(timesArray)
  }

  function submit(e){
    e.preventDefault();

    profUser.update({
      availability: timesArray,
    })
    .then(()=>{
      console.log("Availability has been updated ");
      alert(`Availability added`);
    })
    .catch((err) => {
      console.log("Handle Update Error: ", err);
  })

  }


return (
    <div style={{paddingTop: "100px"}}>
      <ProfNav />

      <h1>Hello Wolrd</h1>

      <form  noValidate>

          <label>Please select a day: </label>
          <select onChange={(e)=> setDay(e.target.value)}>
              <option>- -</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>

          </select>
          <br/>

          <label>Start Time: </label>
          <TextField
            id="time"
            label="start time"
            type="time"
            defaultValue={startTime}
            onChange={(e)=> setStartTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          
          <br/>
          <label>End Time: </label>

          <TextField
            id="time"
            label="End time"
            type="time"
            defaultValue={endTime}
            onChange={(e)=> setEndTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />

        </form>
        <button onClick={test}>Add</button>
        
        <button onClick={edit}>Edit</button>

        <button onClick={(e) => submit(e)}>Submit</button>
        <div >
            {listItems}
        </div>
    </div>
)
}

export default SubmitAvailiblity;

// import * as React from 'react';
// import JqxScheduler, {  jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxscheduler';
// import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
// class SubmitAvailiblity extends React.PureComponent  {
    
//     constructor(props) {
//         super(props);
//         this.myScheduler = React.createRef();
//         const appointments = new Array();
//         const appointment1 = {
//             calendar: "Room 1",
//             description: "George brings projector for presentations.",
//             end: new Date(2018, 10, 23, 16, 0, 0),
//             id: "id1",
//             location: "",
//             start: new Date(2018, 10, 23, 9, 0, 0),
//             subject: "Quarterly Project Review Meeting"
//         };
//         const appointment2 = {
//             calendar: "Room 2",
//             description: "",
//             end: new Date(2018, 10, 24, 15, 0, 0),
//             id: "id2",
//             location: "",
//             start: new Date(2018, 10, 24, 10, 0, 0),
//             subject: "IT Group Mtg."
//         };
//         const appointment3 = {
//             calendar: "Room 3",
//             description: "",
//             end: new Date(2018, 10, 21, 13, 0, 0),
//             id: "id3",
//             location: "",
//             start: new Date(2018, 10, 21, 11, 0, 0),
//             subject: "Course Social Media"
//         };
//         const appointment4 = {
//             calendar: "Room 2",
//             description: "",
//             end: new Date(2018, 10, 23, 18, 0, 0),
//             id: "id4",
//             location: "",
//             start: new Date(2018, 10, 23, 16, 0, 0),
//             subject: "New Projects Planning"
//         };
//         const appointment5 = {
//             calendar: "Room 1",
//             description: "",
//             end: new Date(2018, 10, 25, 17, 0, 0),
//             id: "id5",
//             location: "",
//             start: new Date(2018, 10, 25, 15, 0, 0),
//             subject: "Interview with James"
//         };
//         const appointment6 = {
//             calendar: "Room 4",
//             description: "",
//             end: new Date(2018, 10, 26, 16, 0, 0),
//             id: "id6",
//             location: "",
//             start: new Date(2018, 10, 26, 14, 0, 0),
//             subject: "Interview with Nancy"
//         };
//         appointments.push(appointment1);
//         appointments.push(appointment2);
//         appointments.push(appointment3);
//         appointments.push(appointment4);
//         appointments.push(appointment5);
//         appointments.push(appointment6);
//         const source = {
//             dataFields: [
//                 { name: 'id', type: 'string' },
//                 { name: 'description', type: 'string' },
//                 { name: 'location', type: 'string' },
//                 { name: 'subject', type: 'string' },
//                 { name: 'calendar', type: 'string' },
//                 { name: 'start', type: 'date' },
//                 { name: 'end', type: 'date' }
//             ],
//             dataType: "array",
//             id: 'id',
//             localData: appointments
//         };
//         const dataAdapter = new jqx.dataAdapter(source);
//         this.state = {
//             appointmentDataFields: {
//                 description: "description",
//                 from: "start",
//                 id: "id",
//                 location: "location",
//                 resourceId: "calendar",
//                 subject: "subject",
//                 to: "end"
//             },
//             date: new jqx.date(2018, 11, 23),
//             height: 600,
//             resources: {
//                 colorScheme: "scheme05",
//                 dataField: "calendar",
//                 source: new jqx.dataAdapter(source)
//             },
//             source: dataAdapter,
//             views: [
//                 'dayView',
//                 'weekView',
//                 'agendaView'
//             ]
//         };
//     }
//      render() {
//         return (
//             <JqxScheduler ref={this.myScheduler}
//                 height={this.state.height}
//                 date={this.state.date}
//                 source={this.state.source}
//                 showLegend={true}
//                 dayNameFormat={"abbr"}
//                 resources={this.state.resources}
//                 view={"agendaView"}
//                 views={this.state.views}
//                 appointmentDataFields={this.state.appointmentDataFields}
//                 onAppointmentAdd={this.onAppointmentAdd} 
//             />
//         );
//     }
//      onAppointmentAdd(e) {
//         alert('do something...');
//         console.log(e.args.appointment.originalData)
//       }
// }
// export default SubmitAvailiblity;
