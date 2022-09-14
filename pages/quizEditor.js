import React, {useEffect, useState} from "react";
import StudentLayout from '../components/StudentLayout';
import {Grid, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import {redux} from "../helpers/redux";
import Box from "@mui/material/Box";

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const QuizEditor = redux(
    ['nightMode'],
    ['setNightMode'],
)(props => {
    const {nightMode}=props;
    const [username,setUsername] = useState("Jolene");
    const [dateState, setDateState] = useState(new Date());
    const [isStudent,setIsStudent] = useState(true);
    const [isTeacher,setIsTeacher] = useState(false);
    const [isAdmin,setIsAdmin] = useState(false);
    const [initialized,setInitialized] = useState(false);

    useEffect(() => {
        setInitialized(true);
        setInterval(() => setDateState(new Date()), 30000);
    }, []);

    const PaperStyle = {
        backgroundColor:nightMode?"#32324e":"#ffffff",
        borderRadius:10,
        padding:20,
        height:"100%",
        minHeight:"70vh"
    }

    if(!initialized)
    {
        return(
            <Typography>Loading...</Typography>
        )
    }
    if(isStudent){
        return(
            <StudentLayout>
                <Grid container justifyContent={"space-around"}>
                    <Grid item container md={12} xs={12}>
                        <Grid item md={12} xs={12} style={{marginBottom:10}}>
                            <Typography style={{fontSize:"14px",color:"grey"}}>
                                {days[dateState.getDay()]}
                                {' '}
                                {dateState.toLocaleDateString('en-MY', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                                {' '}
                                {dateState.toLocaleString('en-MY', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                })}
                            </Typography>
                            <Typography style={{fontSize:21,color:nightMode?"#ffffff":"#676767"}}>My Grades</Typography>
                        </Grid>
                        <Grid item  md={12} xs={12}>
                            <Paper style={PaperStyle}>
                                <Typography style={{color:nightMode?"#ffffff":"#676767"}}>Grades</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </StudentLayout>
        )
    }

    return (
        <Box>
            <Typography>Login</Typography>
        </Box>
    )
})
export default QuizEditor;
