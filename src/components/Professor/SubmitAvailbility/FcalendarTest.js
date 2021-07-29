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
//           lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
//         },
//       ]);
    
//       const [data, setData] = useState([
//         { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
//         { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
//       ]);

//     const col = [
//         {
//             title:'Description',
//             field:'description'
//         },
//         {
//             title:'To',
//             field:'end'
//         },
//         {
//             title:'Appointnment Id',
//             field:'id'
//         },
//         {
//             title:'Start',
//             field:'start'
//         },
//         {
//             title:'Subject',
//             field:'subject'
//         },

//     ]

//     useEffect(() => {
//         let arrayAppointments = [];
//         firestore.collection("appointments").get().then((appointmentsData) => {
//        setAppointmentData(appointmentsData.docs.map((appointment => 
//               {
//             let convertedAppointment = {};
//             appointment.data();
//             convertedAppointment.start = appointment.get("start").toDate().toString();
//             convertedAppointment.end = appointment.get("end").toDate().toString();
//             convertedAppointment.description = appointment.get("description");
//             convertedAppointment.id = appointment.get("id");
//             convertedAppointment.subject = appointment.get("subject");
//             arrayAppointments.push(convertedAppointment);
//                return convertedAppointment;
               

//             }
            
            
//        )));
//        setDataFetched(true);
//     }, [])})


  
//         return (
//             dataFetched?
//             <MaterialTable
//             icons={tableIcons}
//             title="Editable Preview"
//             columns={col}
//             data={appointmentData}
//             editable={{
//               onRowAdd: newData =>
//                 new Promise((resolve, reject) => {
//                     const UpdatedRow = [...appointmentData,newData];
//                     setAppointmentData(UpdatedRow);
//                 }),
//               onRowUpdate: (newData, oldData) =>
//                 new Promise((resolve, reject) => {
                    
//                     resolve();
//                 }),
//               onRowDelete: oldData =>
//                 new Promise((resolve, reject) => {
//                   setTimeout(() => {
//                     const dataDelete = [...appointmentData];
//                     const index = oldData.tableData.id;
//                     dataDelete.splice(index, 1);
//                     setAppointmentData([...dataDelete]);
                    
//                     resolve()
//                   }, 1000)
//                 }),
//             }}
//           />
//             :null
//         );
    

//     }
    


// export default SubmitAvailiblity;


// function SubmitAvailiblity()  {

//   const user = (firebase.auth().currentUser).uid;
//   const uid = user;

//     function onAppointmentAdd(e) {
//         alert('do something...'); s
//         console.log('do something...');
//         console.log(e.args.appointment.originalData)
//         e.args.appointment.originalData.id = uid
        
//       //   appointmentData.push(e.args.appointment.originalData)

//       //   appointmentData.forEach((appointment)=>{

//       //     console.log("APPOINTMENTS")
//       //     console.log(appointment)
//       // })

//       newAppointmentData.push(e.args.appointment.originalData)


//       newAppointmentData.forEach((appointment)=>{

//           console.log("NEW APPOINTMENTS")
//           console.log(appointment)
//       })
        
//       }

//    let  myScheduler = useRef();
//     const [appointmentData, setAppointments] = useState([]);


//     // create a new array in order to store new appointment dates
//     // previous dates will not be duplicated in the db this way
//     const newAppointmentData = [];

//         const appointments = new Array();
//         useEffect(() => {
         
//             firestore.collection("appointments").get().then((appointmentsData) => {
//                 setAppointments(appointmentsData.docs.map((appointment => 
//                     {
//                         let convertedAppointment = {};
//                         appointment.data();
//                         convertedAppointment.start = appointment.get("start").toDate();
//                         convertedAppointment.end = appointment.get("end").toDate();
//                         convertedAppointment.description = appointment.get("description");
//                         convertedAppointment.subject = appointment.get("subject");
//                         console.log(convertedAppointment)
//                         console.log(appointment.data())
//                         return convertedAppointment;
//                     }


//                 )));
//             })
//         }, [])
//         appointmentData.forEach((appointment)=>{
//             appointments.push(appointment);
            
//         })


//         const appointment1 = {
//             calendar: 'Room 1',
//             description: 'George brings projector for presentations.',
//             end: new Date(2018, 10, 23, 16, 0, 0),

//             start: new Date(2018, 10, 23, 9, 0, 0),
//         };
 
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
        
//             let appointmentDataFields = {
//                 description: "description",
//                 from: "start",
//                 subject: "subject",
//                 to: "end",
//                 id: "id",
//             }
//             let date = new jqx.date(2018, 11, 23)
//             let height = 600 
//             let resources=  {
//                 colorScheme: "scheme05",
//                 dataField: "calendar",
//                 source: new jqx.dataAdapter(source)
//             }
//             let sourcer = dataAdapter
//             let views = [
//                 'dayView',
//                 'weekView',
//                 'agendaView'
//             ]
    
    
//             function submit(e){
//               console.log(e)
//               newAppointmentData.forEach((appointment)=>{

//                 console.log("APPOINTMENTS")
//                 console.log(appointment)

//                 firestore.collection("appointments").add(               
//                   appointment
//                 )
//                 .then(()=>{
//                   console.log("Data Submitted")
//                   alert("Success")
//                 })
//                 .catch((err) =>{
//                   console.log("Handle update Error: ", err);
//                 })
//             })
//             }

//         return (
//           <div>

//             <JqxScheduler ref={myScheduler}
//                 height={height}
//                 date={date}
//                 source={sourcer}
//                 showLegend={true}
//                 dayNameFormat={"abbr"}
//                 resources={resources}
//                 view={"agendaView"}
//                 views={views}
//                 appointmentDataFields={appointmentDataFields}
//                 onAppointmentAdd={onAppointmentAdd} 
//             />

//             <button onClick={(e) => submit(e)}>Submit</button>
//           </div>

//         );

// }
// export default SubmitAvailibility;

import React, {useState, useEffect, useRef } from 'react';
import { firestore } from "../../../firebase";
import ProfNav from '../ProfessorNavbar/ProfNav';
import { useLocation } from "react-router-dom";
import { TextField } from '@material-ui/core';
import firebase from '../../../firebase';

import Paper from '@material-ui/core/Paper';

import JqxScheduler, {  jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxscheduler';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';





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

  let  myScheduler = useRef();
  const [appointmentData, setAppointments] = useState([]);
  const newAppointmentData = [];

  const appointments = new Array();

  function onAppointmentAdd(e) {
    alert('do something...');
    console.log('do something...');
    console.log(e.args.appointment.originalData)
    e.args.appointment.originalData.id = uid
    
  //   appointmentData.push(e.args.appointment.originalData)

  //   appointmentData.forEach((appointment)=>{

  //     console.log("APPOINTMENTS")
  //     console.log(appointment)
  // })
  newAppointmentData.push(e.args.appointment.originalData)


  newAppointmentData.forEach((appointment)=>{

      console.log("NEW APPOINTMENTS")
      console.log(appointment)
  })
    
  }

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
                console.log("convertedAppointment")
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
        to: "end",
        id: "id",
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


    function submit(e){
      console.log(e)
      newAppointmentData.forEach((appointment)=>{

        console.log("APPOINTMENTS")
        console.log(appointment)

        firestore.collection("appointments").add(               
          appointment
        )
        .then(()=>{
          console.log("Data Submitted")
          alert("Success")
        })
        .catch((err) =>{
          console.log("Handle update Error: ", err);
        })
    })
    }



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

    </div>
)
}

export default SubmitAvailiblity;


// MON 19 - FRI 23
// end: Mon 19 November 2018 at 02:30:00 UTC-5
// end: Mon 19 November 2018 at 02:00:00 UTC-5