<<<<<<< HEAD
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

  // variables for setting the availability
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

  // variables for retrieving thr availability from the db

  const [userStartTime, setUserStartTime ] = useState();
  const [userEndTime, setUserEndTime ] = useState();
  const [userDay, setUserDay ] = useState();

  const [availabilityArr, setAvailabilityArr] = useState([]);

//   useEffect(() => {
//     firestore.collection("programs").get().then((programs) => {
//         setProgramData(programs.docs.map((program => program.data())));
//     })
// }, [])

      // if user id exists , get data from firestore
      useEffect(() => {
        profUser.get().then((doc) => {
            setAvailabilityArr(doc.data().availability);

        })
    }, [])
    console.log(availabilityArr)
    console.log(typeof availabilityArr)
    //   if (user !== null) {
    //     console.log(uid);
  
    //     profUser.get().then((doc) => {
    //         if (doc.exists) {
    //             console.log("Document data:", doc.data().availability);           
    //             setAvailabilityArr(doc.data().availability)
               
    //         } else {
    //             // doc.data() will be undefined in this case
    //             console.log("No such document!");
    //         }
    //     }).catch((error) => {
    //         console.log("Error getting document:", error);
    //     });
  
    // }



  // var userAvailability = availabilityArr.map((a) => 
  //     <li>
  //       <span key={a.day}> {a.day} </span>
  //       <span key={a.start}> {a.start} </span>
  //       <span key={a.end}> {a.end} </span>
  //     </li>)

// var listItems = timesArray.map((time) =>  <li >
// <span key={time.day}> {time.day} </span>  
// <span key={time.start}> {time.start} </span>  
// <span key={time.end}> {time.end} </span>  
// </li>);



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

        {/* View Availabikity */}
        {/* <p>This is the start time: {userStartTime}</p>
        <p>This is the start time: {userEndTime}</p>
        <p>This is the start time: {userDay}</p> */}
        <div>
          {/* {userAvailability} */}

          {/* { Object.entries(availabilityArr).map(([key, available]) =>(
            <div key={available}>
              <li>{key}</li>
            </div>
            ))
          } */}

        </div>
    </div>

  )
=======
import React, { useState, useEffect, Fragment, useRef } from "react";

import { firestore } from "../../../firebase";

import JqxScheduler, {  jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxscheduler';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
function SubmitAvailiblity()  {
    function onAppointmentAdd(e) {
        alert('do something...');
        console.log(e.args.appointment.originalData)
      }

   let  myScheduler = useRef();
    const [appointmentData, setAppointments] = useState([]);

        const appointments = new Array();
        useEffect(() => {
         
            firestore.collection("appointments").get().then((appointmentsData) => {
                setAppointments(appointmentsData.docs.map((appointment => 
                    {
                        let convertedAppointment = {};
                        appointment.data();
                        convertedAppointment.start = appointment.get("start").toDate();
                        convertedAppointment.end = appointment.get("end").toDate();
                        convertedAppointment.description = appointment.get("description");
                        convertedAppointment.subject = appointment.get("subject");
                        console.log(convertedAppointment)
                        console.log(appointment.data())
                        return convertedAppointment;
                    }


                )));
            })
        }, [])
        appointmentData.forEach((appointment)=>{
            appointments.push(appointment);
        })
        const appointment1 = {
            calendar: 'Room 1',
            description: 'George brings projector for presentations.',
            end: new Date(2018, 10, 23, 16, 0, 0),

            start: new Date(2018, 10, 23, 9, 0, 0),
        };
 
        const source = {
            dataFields: [
                { name: 'id', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'location', type: 'string' },
                { name: 'subject', type: 'string' },
                { name: 'calendar', type: 'string' },
                { name: 'start', type: 'date' },
                { name: 'end', type: 'date' }
            ],
            dataType: "array",
            id: 'id',
            localData: appointments
        };
        const dataAdapter = new jqx.dataAdapter(source);
        
            let appointmentDataFields = {
                description: "description",
                from: "start",
                subject: "subject",
                to: "end"
            }
            let date = new jqx.date(2018, 11, 23)
            let height = 600 
            let resources=  {
                colorScheme: "scheme05",
                dataField: "calendar",
                source: new jqx.dataAdapter(source)
            }
            let sourcer = dataAdapter
            let views = [
                'dayView',
                'weekView',
                'agendaView'
            ]
    
    
  

        return (
            <JqxScheduler ref={myScheduler}
                height={height}
                date={date}
                source={sourcer}
                showLegend={true}
                dayNameFormat={"abbr"}
                resources={resources}
                view={"agendaView"}
                views={views}
                appointmentDataFields={appointmentDataFields}
                onAppointmentAdd={onAppointmentAdd} 
            />
        );

>>>>>>> origin
}

export default SubmitAvailiblity;
