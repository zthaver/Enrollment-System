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
import { Grid } from '@material-ui/core';

const drawerWidth = 240;

//CSS styles
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

    //retrieve professor id from firebase
    const user = (firebase.auth().currentUser).uid;
    const uid = user;
    const profUser = firebase.firestore().collection("professors").doc(uid);

    //retrieve availabilities subCollection from the professor collection
    const profAppointments = firebase.firestore().collection("professors").doc(uid).collection("availabilities");
    console.log(profUser)
    console.log(profAppointments)

    let [departmentHead,setDepartmentHead] = useState(false);
    console.log((firebase.auth().currentUser).uid)
    let  myScheduler = useRef();

    //variables for the appointment data retrieved from the DB    
    const [appointmentData, setAppointments] = useState([]);
    const appointments = new Array();

        //set
        const [userFname, setUserFname] = useState();
        const [userEmail, setUserEmail] = useState();
        const [userLname, setUserLname] = useState();
        const [userPhone, setUserPhone] = useState();
        const [userAddress, setUserAddress] = useState();
        const [errorMsg, setErrorMsg] = useState();

    appointmentData.forEach((appointment)=>{
        appointments.push(appointment);  
    })

    //retrieve professor information
        // if user id exists , get data from firestore
        if (user !== null) {
            console.log(uid);
    
            profUser.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    setUserFname(doc.data().firstname);
                    setUserLname(doc.data().lastname);
                    setUserEmail(doc.data().email);
                    setUserPhone(doc.data().phone);
                    setUserAddress(doc.data().address);
                    setDepartmentHead(doc.data().isDepartmentHead)
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
    
        }

    // setting up JQX Scheduler 
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

    //retrieve availabilities from the firestore db
    useEffect(() => {

        profUser.collection("availabilities").get().then((querySnapshot) => {
            let tempArray = [];

            //Check if the data exists
            //If it does push each doc into the temporary array
            //Convert firestore timestamp to javascript dates
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
                    <ListItem button component={Link} to="/viewProf">
                    <ListItemText primary="Details" style={{paddingTop: "20px"}}/>
                    </ListItem>
                </List>
            </div>
            </Drawer>

            <div  className={classes.gridContainer}>

                {/* DISPLAY PROF INFO */}  
                <h2>{userFname}'s account information</h2>
                <Grid container md={8} className={classes.profDetails}>
                    
                    <Grid item md={6}>
                        <p><strong>Professor:</strong> {userFname} {userLname}</p>
                    </Grid>

                    <Grid item md={4}>
                        <p><strong>Contact:</strong> {userEmail}</p>
                    </Grid>

                    <Grid item md={6}>
                    <p><strong>Phone: </strong>{userPhone}</p>
                    </Grid>

                    <Grid item md={4}>
                    <p><strong>Address: </strong>{userAddress}</p>
                    </Grid>
                </Grid>
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