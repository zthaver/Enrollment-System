import {react,useEffect,useState,useRef} from 'react';
import JqxScheduler, {  jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxscheduler';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import { firestore } from '../../../firebase';
function SubmitAvailiblity ()  {

    let [dataFetched,setDataFetched] = useState(false);
    let [appointmentData,setAppointmentData] = useState([]);

    useEffect(() => {
        let arrayAppointments = [];
        firestore.collection("appointments").get().then((appointmentsData) => {
       setAppointmentData(appointmentsData.docs.map((appointment => 
              {
            let convertedAppointment = {};
            appointment.data();
            convertedAppointment.start = appointment.get("start").toDate();
            convertedAppointment.end = appointment.get("end").toDate();
            convertedAppointment.description = appointment.get("description");
            convertedAppointment.subject = appointment.get("subject");
            arrayAppointments.push(convertedAppointment);
               return convertedAppointment;
               

            }
            
            
       )));
       setDataFetched(true);
    }, [])})

        let myScheduler = useRef();
        const appointments = new Array();
        const appointment1 = {
            calendar: "Room 1",
            description: "George brings projector for presentations.",
            end: new Date(2018, 10, 23, 16, 0, 0),
            id: "id1",
            location: "",
            start: new Date(2018, 10, 23, 9, 0, 0),
            subject: "Quarterly Project Review Meeting"
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
            dataType: 'array',
            id: 'id',
            localData: appointmentData
        };
        const dataAdapter = new jqx.dataAdapter(source);

        let state = {
            dataFetched:false,
            appointmentDataFields: {
                description: "description",
                from: "start",
                id: "id",
                location: "location",
                resourceId: "calendar",
                subject: "subject",
                to: "end"
            },
            date: new jqx.date(2018, 11, 23),
            height: 600,
            source: dataAdapter,
            resources: {
                colorScheme: "scheme05",
                dataField: "calendar",
                source: new jqx.dataAdapter(source)
            },
            views: [
                'dayView',
                'weekView',
                'agendaView'
            ]
        };


      
        appointments.push(appointment1);

    
      
        
    

   

 
    
  
        return (
            dataFetched?
            <JqxScheduler ref={myScheduler}
                height={state.height}
                date={state.date}
                source={state.source}
                showLegend={true}
                dayNameFormat={"abbr"}
                resources={state.resources}
                view={"agendaView"}
                views={state.views}
                appointmentDataFields={state.appointmentDataFields}
                onAppointmentAdd={onAppointmentAdd} 
            />:null
        );
    
     function onAppointmentAdd(e) {
        alert('do something...');
        console.log(e.args.appointment.originalData)
      }
    }
    


export default SubmitAvailiblity;









// import { useEffect,useState,useRef }  from 'react';
// import JqxScheduler, {  jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxscheduler';
// import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
// import { firestore } from '../../../firebase';
// function SubmitAvailibility(){
//    let  myScheduler = useRef();
//     const [appointmentData, setAppointments] = useState([]);

//         const appointments = new Array();
//         // useEffect(() => {
         
//         //     firestore.collection("appointments").get().then((appointmentsData) => {
//         //         setAppointments(appointmentsData.docs.map((appointment => 
//         //             {
//         //                 let convertedAppointment = {};
//         //                 appointment.data();
//         //                 convertedAppointment.start = appointment.get("start").toDate();
//         //                 convertedAppointment.end = appointment.get("end").toDate();
//         //                 convertedAppointment.description = appointment.get("description");
//         //                 convertedAppointment.subject = appointment.get("subject");
//         //                 console.log(convertedAppointment)
//         //                 console.log(appointment.data())
//         //                 return convertedAppointment;
//         //             }


//         //         )));
//         //     })
//         // }, [])
//         // appointmentData.forEach((appointment)=>{
//         //     appointments.push(appointment);
//         // })
 
//             const appointment1 = {
//             calendar: 'Room 1',
//             description: 'George brings projector for presentations.',
//             end: new Date(2018, 10, 23, 16, 0, 0),
//             id: 'id1',
//             location: '',
//             start: new Date(2018, 10, 23, 9, 0, 0),
//             subject: 'Quarterly Project Review Meeting'
//         };
//         appointments.push(appointment1);
 
//         const source = {
//             dataFields: [
//                      { name: 'id', type: 'string' },
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
    
    
  

//         return (
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
//         );
//              function onAppointmentAdd(e) {
//                      alert('do something...');
//                    console.log(e.args.appointment.originalData)
//              }

// }
// export default SubmitAvailibility;