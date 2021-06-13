import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import StudentNav from '../StudentNavbar/StudentNav'

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
import FormControl from '@material-ui/core/FormControl';

import { useAuth }  from '../../Contexts/AuthContext';

import firebase from '../../firebase';

import { useHistory } from 'react-router';

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
      }
  }));


function ViewStudentInformation(){
    const classes = useStyles();

    //get current user UID
    const user = (firebase.auth().currentUser).uid;
    const uid = user;
        
    //manually have to input the uid because they don't match
    const studentUser = firebase.firestore().collection("student").doc(uid);

    // console.log(user);
    const { logout } = useAuth();
    const history = useHistory();
    const [userData, setData] = useState();

    const [userFname, setUserFname] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userLname, setUserLname] = useState();
    const [userPhone, setUserPhone] = useState();
    const [userAddress, setUserAddress] = useState();

    const [updatedFname, updateFname] = useState();
    const [updatedEmail, updateEmail] = useState();
    const [updatedLname, updateLname] = useState();
    const [updatedPhone, updatePhone] = useState();
    const [updatedAddress, updateAddress] = useState();



    // if user id exists
    if (user !== null) {

        // console.log(email);
        // console.log(uid);

        studentUser.get().then((doc) => {
            if (doc.exists) {
                // console.log("Document data:", doc.data());
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


    function handleLogout()
    {
        logout();
        history.push("/login");
    }

    function handleUpdate(type, e){

        e.preventDefault();
        console.log(studentUser);
        alert(type);

        switch (type){
            case "firstname":
                if(!updatedFname){
                    alert("Please fill in field");
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
                    alert("Please fill in field");
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
                    alert("Please fill in field");
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
                    alert("Please fill in field");
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
                    alert("Please fill in field");
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
    <div className={classes.root}>
        
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
              <Box><strong>Update Account Information</strong></Box>
                  <Container maxwidth="sm">
  
                    <Grid container className={classes.infoItem}>                     
                          <Grid item md={2}>
                              <label>First Name: </label>
                          </Grid>
                          <Grid item md={10}>
                              {/* <input type="text" onChange={(e)=> setUserFname(e.target.value)}/> */}
                              <TextField  id="standard-basic" 
                                          label={updatedFname}
                                          placeholder={userFname}
                                          onChange={(e)=> updateFname(e.target.value)}
                                          >            
                              </TextField>
                              <Button className={classes.updateBtn} onClick={(e) => handleUpdate('firstname', e)} >Update</Button>
                              {/* <button className={classes.updateBtn} onClick={handleUpdate('firstname')} >Update</button> */}
                          </Grid>             
                    </Grid>

                    <Grid container className={classes.infoItem}>
                        <Grid item md={2}>
                        {/* <span> Lastname: {userLname} </span>  */}
                            <label>Last Name: </label>
                        </Grid>
                        <Grid md={10}>
                            <TextField  id="standard-basic" 
                                        type="text" 
                                        placeholder={userLname}  
                                        onChange={(e)=> updateLname(e.target.value)}>
                            </TextField>
                            <Button className={classes.updateBtn} onClick={(e) => handleUpdate('lastname', e)}>Update</Button>
                        </Grid>
                    </Grid>
                      
                      <Grid container className={classes.infoItem}>
                          <Grid item md={2}>
                              {/* <span> Email {userEmail} </span>  */}
                              <label>Email </label>
                          </Grid>
                          <Grid item md={10}>
                            <TextField  id="standard-basic"
                                        type="text" 
                                        placeholder={userEmail} 
                                        onChange={(e)=> updateEmail(e.target.value)}>
                            </TextField>
                            <Button className={classes.updateBtn} onClick={(e) => handleUpdate('email', e)}>Update</Button>
                          </Grid>
                      </Grid>
  
                      <Grid container className={classes.infoItem}>
                          <Grid item md={2}>
                              {/* <span> Phone {userPhone} </span>  */}
                              <label>Phone </label>
                          </Grid>
                          <Grid item md={10}>
                            <TextField  id="standard-basic" 
                                        type="text" 
                                        placeholder={userPhone} 
                                        onChange={(e)=> updatePhone(e.target.value)}>
                              </TextField>
                              <Button className={classes.updateBtn} onClick={(e) => handleUpdate('phone', e)}>Update</Button>
                          </Grid>
                      </Grid>
  
                      <Grid container className={classes.infoItem}>
                          <Grid item md={2}>
                              {/* <span> Phone {userPhone} </span>  */}
                              <label>Address </label>
                          </Grid>
                          <Grid item md={10}>
                              <TextField  id="standard-basic"
                                        type="text" 
                                        placeholder={userAddress} 
                                        onChange={(e)=> updateAddress(e.target.value)}
                                        required>
                              </TextField>
                              <Button className={classes.updateBtn} onClick={(e) => handleUpdate('address', e)}>Update</Button>                        
                          </Grid>
                      </Grid>
              </Container>
          </Grid>
  
          {/* DISPLAY STUDENT INFO */}  
          <Grid item md={4} className={classes.studentDetails}>
              <Box>Student Information</Box>
              <p>{userFname} {userLname}</p>
              <p>{userEmail}</p>
              <p>{userPhone}</p>
              <p>{userAddress}</p>
          </Grid>
        </Grid>
  
  
          
      </div>
    )
}

export default ViewStudentInformation;
