import { useAuth } from "../../../Contexts/AuthContext";
import { useHistory } from 'react-router';
import ProfNav from '../ProfessorNavbar/ProfNav'
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect,useState, useRef } from "react";
import { firestore }  from "../../../firebase";
import firebase from "../../../firebase";
import JqxScheduler, {  jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxscheduler';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';


function ProfessorHomePage()
{
    const user = (firebase.auth().currentUser).uid;
    const uid = user;
    const profUser = firebase.firestore().collection("professors").doc(uid);

    const location = useLocation();
    const { currentUser,logout } = useAuth();

    let [departmentHead,setDepartmentHead] = useState(false);
    const history = useHistory();
    console.log((firebase.auth().currentUser).uid)

    let  myScheduler = useRef();
    const [appointmentData, setAppointments] = useState([]);
    const newAppointmentData = [];
    const appointments = new Array();

    appointmentData.forEach((appointment)=>{
        appointments.push(appointment);  
      })

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



    useEffect(() => {
        console.log("in use effect");
        firestore.collection("professors").doc((firebase.auth().currentUser).uid).get().then((val)=>{
            setDepartmentHead(val.data().isDepartmentHead);
        })
        }, [])

        useEffect(() => {
         
            // firestore.collection("appointments").get().then((appointmentsData) => {
            //     setAppointments(appointmentsData.docs.map((appointment => 
            //         {
            //             let convertedAppointment = {};
            //             appointment.data();
            //             convertedAppointment.start = appointment.get("start").toDate();
            //             convertedAppointment.end = appointment.get("end").toDate();
            //             convertedAppointment.description = appointment.get("description");
            //             convertedAppointment.subject = appointment.get("subject");
            //             console.log("convertedAppointment")
            //             console.log(convertedAppointment)
            //             console.log(appointment.data())
            //             return convertedAppointment;
            //         }
            //     )));
            // })
            profUser.get().then((appointmentsData) => {
              if(appointmentsData.exists){
                console.log("Document data:", appointmentsData.data().availability);
                setAppointments(appointmentsData.data().availability.map((appointment => 
                  {
                    console.log(appointment.start.toDate())
                      let convertedAppointment = {};
                      // appointment.data();
                      convertedAppointment.start = appointment.start.toDate();
                      convertedAppointment.end = appointment.end.toDate();
                      // convertedAppointment.description = appointment.get("description");
                      // convertedAppointment.subject = appointment.get("subject");
                      console.log("convertedAppointment")
                      console.log(convertedAppointment)
                      // console.log(appointment.data())
                      return convertedAppointment;
                  }
              )));
              } else {
                console.log("No availability");
              }
              // setAppointments(appointmentsData.docs.map((appointment => 
              //     {
              //         let convertedAppointment = {};
              //         appointment.data();
              //         convertedAppointment.start = appointment.get("start").toDate();
              //         convertedAppointment.end = appointment.get("end").toDate();
              //         // convertedAppointment.description = appointment.get("description");
              //         // convertedAppointment.subject = appointment.get("subject");
              //         console.log("convertedAppointment")
              //         console.log(convertedAppointment)
              //         console.log(appointment.data())
              //         return convertedAppointment;
              //     }
              // )));
          })
          }, [])

    function handleLogout()
    {
        logout();
        history.push("/login");
        
    }

    return(
        <div style={{paddingTop: "100px"}}>
            <ProfNav isDepartmentHead={departmentHead}/>
            <h3>My Schedule</h3>
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
            />
        </div>

        )
}

export default ProfessorHomePage;