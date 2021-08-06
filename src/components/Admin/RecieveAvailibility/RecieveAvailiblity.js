import {react,useEffect,useState,useRef,forwardRef} from 'react';
import JqxScheduler, {  jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxscheduler';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import app, { firestore } from '../../../firebase';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

function ReceiveAvailiblity ()  {

    let [dataFetched,setDataFetched] = useState(false);
    let [appointmentData,setAppointmentData] = useState([]);
    let [data,setData] = useState([
      {description: "",
      end: "Mon Nov 19 2018 02:30:00 GMT-0500 (Eastern Standard Time)",
      id: "6a4F6qQpoGXSY7S1rKh1sR7hpe03",
      start: "Mon Nov 19 2018 02:00:00 GMT-0500 (Eastern Standard Time)",
    },
      {description: "",
      end: "Mon Nov 19 2018 02:30:00 GMT-0500 (Eastern Standard Time)",
      id: "6a4F6qQpoGXSY7S1rKh1sR7hpe03",
      start: "Mon Nov 19 2018 02:00:00 GMT-0500 (Eastern Standard Time)",
        }
    ])
    
  
    const col = [

      {
          title:'To',
          field:'end'
      },
      {
          title:'Appointnment Id',
          field:'id'
      },
      {
          title:'Start',
          field:'start'
      },


  ]


   

    useEffect(() => {
        let arrayAppointments = [];
        firestore.collection("appointments").get().then((appointmentsData) => {
       setAppointmentData(appointmentsData.docs.map((appointment => 
              {
            return appointment.data();

               

            }
            
            
       )));
       setDataFetched(true);
    }, [])})


  
    return (
      <MaterialTable
        title="Remote Data Preview"
        icons={tableIcons}
        columns={col}
        data={appointmentData}
        editable={{
          onRowAdd: async newData =>
          new Promise((resolve, reject) => {
            const addedRow = [...appointmentData,newData];
            console.log(addedRow);
              setTimeout(() => {
                firestore.collection("appointments").add({
                  "start":newData.start,
                  "end":newData.end
                }).then((data)=>{
                  data.update({"id":data.id})
                })
                setAppointmentData(addedRow);
                console.log(data);
                  resolve();
              }, 2000);
          }),
          onRowUpdate:  (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log(oldData);
            },2000);

          }),
          onRowDelete:  oldData =>
          new Promise((resolve, reject) => {
            
              setTimeout(() => {
                console.log(oldData)


                  resolve();
              }, 2000);
          })
        }}

        
      />
    )
    

    }
    


export default ReceiveAvailiblity;









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