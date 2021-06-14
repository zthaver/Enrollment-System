import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import StudentNav from '../StudentNavbar/StudentNav'
import { useAuth }  from '../../Contexts/AuthContext';
import firebase from '../../firebase';
import { useHistory } from 'react-router';

// material ui
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Container, TextField } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

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
          paddingTop:'84px',
          paddingLeft:'250px',
          height: '100vh',
      },

      studentDetails: {
          background:'#E3DFFF',
      },

      studentUpdateInfo:{
          background: '#e3e3e3',
          padding:'20px',
      },

      infoItem:{
          padding: '10px 0 10px 0',
          margin: '5px 0 5px 0',
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


function ViewStudentInformation(){
    const classes = useStyles();

    //get current user UID
    const user = (firebase.auth().currentUser).uid;
    const uid = user;
    const studentUser = firebase.firestore().collection("student").doc(uid);

    //use states 
    //set
    const [userFname, setUserFname] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userLname, setUserLname] = useState();
    const [userPhone, setUserPhone] = useState();
    const [userAddress, setUserAddress] = useState();
    const [errorMsg, setErrorMsg] = useState();

    //update
    const [updatedFname, updateFname] = useState();
    const [updatedEmail, updateEmail] = useState();
    const [updatedLname, updateLname] = useState();
    const [updatedPhone, updatePhone] = useState();
    const [updatedAddress, updateAddress] = useState();



    // if user id exists
    if (user !== null) {

        studentUser.get().then((doc) => {
            if (doc.exists) {
                setUserFname(doc.data().firstname);
                setUserLname(doc.data().lastname);
                setUserEmail(doc.data().email);
                setUserPhone(doc.data().phone);
                setUserAddress(doc.data().address);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    }

    function handleUpdate(type, e){

        e.preventDefault();

        switch (type){
            case "firstname":
                if(!updatedFname){
                    setErrorMsg(`*** Please fill in ${type} field ***`);
                } else {
                    studentUser.update({
                        firstname: updatedFname,
                    })
                    .then(()=>{
                        console.log("Document has been updated ");
                        alert(`${type} has been updated to ${updatedFname}`);
                        window.location.reload(); 
                    })
                    .catch((err) => {
                        console.log("Handle Update Error: ", err);
                    })
                }    
            break;

            case 'lastname':
                if(!updatedLname){
                    setErrorMsg(`*** Please fill in ${type} field ***`);
                } else {
                    studentUser.update({
                        lastname: updatedLname,
                    })
                    .then(()=>{
                        console.log("Document has been updated ");
                        alert(`${type} has been updated`);
                        window.location.reload(); 
                    })
                    .catch((err) => {
                        console.log("Handle Update Error: ", err);
                    })
                }
            break;

            case 'email':
                if(!updatedEmail){
                    setErrorMsg(`*** Please fill in ${type} field ***`);
                } else {
                    studentUser.update({
                        email: updatedEmail,
                    })
                    .then(()=>{
                        console.log("Document has been updated ");
                        alert(`${type} has been updated`);
                        window.location.reload(); 
                    })
                    .catch((err) => {
                        console.log("Handle Update Error: ", err);
                    })
                }
            break;

            case 'phone':
                if(!updatedPhone){
                    setErrorMsg(`*** Please fill in ${type} field ***`);
                } else {
                    studentUser.update({
                        phone: updatedPhone,
                    })
                    .then(()=>{
                        console.log("Document has been updated ");
                        alert(`${type} has been updated to ${updatedPhone}`);
                        window.location.reload(); 
                    })
                    .catch((err) => {
                        console.log("Handle Update Error: ", err);
                    })
                }
                
            break;

            case 'address':
                if(!updatedAddress){
                    setErrorMsg(`*** Please fill in ${type} field ***`);
                } else {
                    studentUser.update({
                        address: updatedAddress,
                    })
                    .then(()=>{
                        console.log("Document has been updated ");
                        alert(`${type} has been updated to ${updatedAddress}`);
                        window.location.reload(); 
                    })
                    .catch((err) => {
                        console.log("Handle Update Error: ", err);
                    })
                } 
            break;
            default:
                console.log("ERROR");
        }
    }

    return(
    <section className={classes.root}>
        
        <StudentNav/>
          {/* SIDEBAR */}  
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
                <ListItem button component={Link} to="/student">
                  <ListItemText primary="Home" />
                </ListItem>
            </List>
            <Divider />
            <List>
              {['Details', 'Academic Records', 'Advisors'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        
        {/* UPDATE STUDENT INFO */}  
        <Grid container className={classes.gridContainer}>
          <Grid item md={8} className={classes.studentUpdateInfo}>
              <Box><strong><h1>Update your account Information</h1></strong></Box>

                  <Container maxwidth="sm">
                    <Grid container className={classes.infoItem}>                     
                          <Grid item md={2}>
                              <p>First Name: </p>
                          </Grid>

                          <Grid item md={10}>
                            <TextField  id="standard-basic" 
                                        placeholder={userFname}
                                        onChange={(e)=> updateFname(e.target.value)}
                                        >            
                            </TextField>
                            <Button     className={classes.updateBtn} 
                                        onClick={(e) => handleUpdate('firstname', e)} >
                                        Update
                            </Button>
                          </Grid>             
                    </Grid>

                    <Grid container className={classes.infoItem}>
                        <Grid item md={2}>
                            <p>Last Name: </p>
                        </Grid>

                        <Grid md={10}>
                            <TextField  id="standard-basic" 
                                        type="text" 
                                        placeholder={userLname} 
                                        onChange={(e)=> updateLname(e.target.value)}>
                            </TextField>
                            <Button className={classes.updateBtn} 
                                    onClick={(e) => handleUpdate('lastname', e)}>
                                    Update
                            </Button>
                        </Grid>
                    </Grid>
                      
                      <Grid container className={classes.infoItem}>
                          <Grid item md={2}>
                              <p>Email </p>
                          </Grid>
                          <Grid item md={10}>
                            <TextField  id="standard-basic"
                                        type="text" 
                                        placeholder={userEmail} 
                                        onChange={(e)=> updateEmail(e.target.value)}>
                            </TextField>
                            <Button     className={classes.updateBtn} 
                                        onClick={(e) => handleUpdate('email', e)}>
                                        Update
                            </Button>
                          </Grid>
                      </Grid>
  
                      <Grid container className={classes.infoItem}>
                          <Grid item md={2}>
                              <p>Phone </p>
                          </Grid>
                          <Grid item md={10}>
                            <TextField  id="standard-basic" 
                                        type="text" 
                                        placeholder={userPhone} 
                                        onChange={(e)=> updatePhone(e.target.value)}>
                            </TextField>
                            <Button     className={classes.updateBtn} 
                                        onClick={(e) => handleUpdate('phone', e)}>
                                        Update
                            </Button>
                          </Grid>
                      </Grid>
  
                      <Grid container className={classes.infoItem}>
                          <Grid item md={2}>
                              <p>Address </p>
                          </Grid>
                          <Grid item md={10}>
                            <TextField  id="standard-basic"
                                        type="text" 
                                        placeholder={userAddress} 
                                        onChange={(e)=> updateAddress(e.target.value)}
                                        required>
                            </TextField>
                            <Button   className={classes.updateBtn} 
                                        onClick={(e) => handleUpdate('address', e)}>
                                        Update
                            </Button>                        
                          </Grid>
                      </Grid>

                      <Box className={classes.erroMsg}>
                        <p>{errorMsg}</p>
                    </Box>

              </Container>
          </Grid>
  
          {/* DISPLAY STUDENT INFO */}  
          <Grid item md={4} className={classes.studentDetails}>
              <Box> <h2>{userFname}'s account information </h2></Box>
              <p>{userFname} {userLname}</p>
              <p>{userEmail}</p>
              <p>{userPhone}</p>
              <p>{userAddress}</p>
          </Grid>
          
        </Grid>
  
  
          
      </section>
    )
}

export default ViewStudentInformation;
