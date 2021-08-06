import ProfNav from '../ProfessorNavbar/ProfNav'
import { useEffect,useState, useRef } from "react";
import { firestore }  from "../../../firebase";
import firebase from "../../../firebase";
import JqxScheduler, {  jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxscheduler';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
      navBar:{
          background : '#D92A1D',
          minHeight: '84px',
          paddingTop: '10px',
          zIndex: theme.zIndex.drawer + 1,
      },
      
      updateBtn:{
          background : '#fff',
          '&:hover':{
              background: '#D92A1D',
              color: '#fff', 
          },
          color: '#000',
          marginLeft: '20px',
      },
      drawer: {
          width: drawerWidth,
          flexShrink: 0,
        },
        drawerPaper: {
          width: drawerWidth,
        },
        drawerContainer: {
          overflow: 'auto',
        },
  
        gridContainer: {
            paddingTop:'0px',
            paddingLeft:'250px',
            height: '100vh',
        },
  
        profDetails: {
            background:'#E3DFFF',
        },
  
        profUpdateInfo:{
            background: '#e3e3e3',
            padding:'20px',
        },
  
        infoItem:{
            padding: '10px 0 10px 0',
            margin: '25px 0 5px 0',
        },

        erroMsg:{
            width:'100%',
            marginTop:'20px',
            textAlign:'center',
            color:'#D92A1D',
            fontWeight:'bold',
            letterSpacing:'1px',
            wordSpacing:'5px',
        }
}));

function ProfessorHomePage()
{
    
    const classes = useStyles();

    //retrieve professor id
    const user = (firebase.auth().currentUser).uid;
    const uid = user;
    const profUser = firebase.firestore().collection("professors").doc(uid);
    const profAppointments = firebase.firestore().collection("professors").doc(uid).collection("availabilities");
    console.log(profUser)
    console.log(profAppointments)
    let [departmentHead,setDepartmentHead] = useState(false);
    console.log((firebase.auth().currentUser).uid)

    let  myScheduler = useRef();
    const [appointmentData, setAppointments] = useState([]);
    
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

    //authenticate usert to view submit availability in the navbar
    useEffect(() => {
        console.log("in use effect");
        firestore.collection("professors").doc((firebase.auth().currentUser).uid).get().then((val)=>{
            setDepartmentHead(val.data().isDepartmentHead);
        })
    }, [])

    //retrieve appointments from the firestore db
    useEffect(() => {

        profUser.collection("availabilities").get().then((querySnapshot) => {
            let tempArray = [];

            if(querySnapshot){
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    console.log(typeof doc.data());

                    tempArray.push(doc.data());
                });
                setAppointments(tempArray.map((item) => {
                    console.log(item);
                    let tempObj = {}
                    tempObj.start =  item.start.toDate()
                    tempObj.end =  item.end.toDate()
                    console.log("tempObj")
                    console.log(tempObj)
                    return tempObj;
                }));
            } else {
                console.log("Doesn't exist");
            }
        });

        //old code
        // profUser.get().then((appointmentsData) => {
        //     if(appointmentsData.exists){
        //     console.log("Document data:", appointmentsData.data());
            
        //         if(appointmentsData.data().availability){
        //             setAppointments(appointmentsData.data().availability.map((appointment => 
        //                 {
        //                 console.log(appointment.start.toDate())
        //                     let convertedAppointment = {};
        //                     // appointment.data();
        //                     convertedAppointment.start = appointment.start.toDate();
        //                     convertedAppointment.end = appointment.end.toDate();
        //                     // convertedAppointment.description = appointment.get("description");
        //                     // convertedAppointment.subject = appointment.get("subject");
        //                     console.log("convertedAppointment")
        //                     console.log(convertedAppointment)
        //                     // console.log(appointment.data())
        //                     return convertedAppointment;
        //                 }
        //             )));
        //         }
        //     } else {
        //     console.log("No availability");
        //     }
        // })
    }, [])
    
    return(

        <div style={{paddingTop: "100px"}}>
            <ProfNav isDepartmentHead={departmentHead}/>

            <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}>
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    <ListItem button component={Link} to="/professor">
                    <ListItemText primary="Home" style={{paddingTop: "20px"}}/>
                    </ListItem>
                </List>
                <Divider />
                <List>
                {['Details', 'Course List', 'Advisors'].map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
            </div>
            </Drawer>

            <div container className={classes.gridContainer}>
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
        </div>
        )
}

export default ProfessorHomePage;