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