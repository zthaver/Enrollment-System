import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth }  from '../../../Contexts/AuthContext';
import firebase from '../../../firebase';
import { useHistory } from 'react-router';
import ProfNav from '../ProfessorNavbar/ProfNav'

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
  
        profDetails: {
            background:'#E3DFFF',
        },
  
        profUpdateInfo:{
            background: '#e9ecef',
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

function ProfessorAccount(){
    const classes = useStyles();

    //get current user UID
    const user = (firebase.auth().currentUser).uid;
    const uid = user;
    const profUser = firebase.firestore().collection("professors").doc(uid);

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
    const [updatedLname, updateLname] = useState();
    const [updatedPhone, updatePhone] = useState();
    const [isDepartmentHead, setDepartmentHead] = useState();
    const [updatedAddress, updateAddress] = useState();

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


    //handle update for the selected field 
    function handleUpdate(type, e){
        e.preventDefault();

        switch (type){
            case "firstname":
                if(!updatedFname){
                    setErrorMsg(`*** Please fill in ${type} field ***`);
                } else {
                    profUser.update({
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
                    profUser.update({
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

            case 'phone':
                if(!updatedPhone){
                    setErrorMsg(`*** Please fill in ${type} field ***`);
                } else {
                    profUser.update({
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
                    profUser.update({
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
        <ProfNav isDepartmentHead={isDepartmentHead}/>

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
        
        <Grid container className={classes.gridContainer}>
            <Grid item md={12} className={classes.profUpdateInfo}>
                <Box>
                    <strong><h1>Update professor account Information</h1></strong>
                    <h4>Please enter information to update to individually update your account information</h4>
                </Box>
                <br/>
                <br/>

                <Container maxwidth="sm">
                    <Grid container className={classes.infoItem}>

                        <Grid md={6}>
                            <TextField  id="outlined-basic" 
                                        placeholder={userFname}
                                        label="First Name"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                          }}
                                        onChange={(e)=> updateFname(e.target.value)} type="text" />
                            <Button className={classes.updateBtn} onClick={(e) => handleUpdate('firstname', e)}>update</Button>
                        </Grid>

                        <Grid md={6}>
                            <TextField  id="outlined-basic" 
                                        placeholder={userLname}
                                        label="Last Name"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                          }}
                                        onChange={(e)=> updateLname(e.target.value)} type="text" />
                            <Button className={classes.updateBtn} onClick={(e) => handleUpdate('lastname', e)}>update</Button>
                        </Grid>
                    </Grid>

                    <Grid container className={classes.infoItem}>
                        <Grid md={6}>
                            <TextField  id="outlined-basic" 
                                        placeholder={userPhone}
                                        label="Phone"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                          }}
                                        onChange={(e)=> updatePhone(e.target.value)} type="text" />
                            <Button className={classes.updateBtn} onClick={(e) => handleUpdate('phone', e)}>update</Button>
                        </Grid>

                        <Grid md={6}>
                            <TextField  id="outlined-basic" 
                                        placeholder={userAddress}
                                        label="Address "
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                          }}
                                        onChange={(e)=> updateAddress(e.target.value)} type="text" />
                            <Button className={classes.updateBtn} onClick={(e) => handleUpdate('address', e)}>update</Button>                    
                        </Grid>

                    </Grid>

                    <Box className={classes.erroMsg}>
                        <p>{errorMsg}</p>
                    </Box>
                    
                </Container>
            </Grid>
        </Grid>
      </section>

    )
}

export default ProfessorAccount;