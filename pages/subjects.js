import React, {useEffect, useState} from "react";
import AdminLayout from '../components/AdminLayout';
import StudentLayout from '../components/StudentLayout';
import {Grid, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import {redux} from "../helpers/redux";
import Box from "@mui/material/Box";

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const testData = [
    {
        id:"sub12334234348ddjwm2312",
        class: "cls84783dkem23u429",
        semester:"2022-1",
        name:"History",
        teacher:"tch19829319ws9q2i9e21",
        students:["stu34290349289dklscow93","stu81723jdd399920os"]
    },
    {
        id:"sub12334234342019032wm2312",
        class: "cls84783dkem23u429",
        semester:"2022-1",
        name:"English",
        teacher:"tch1982923201kddws9q2i9e21",
        students:["stu34290349289dklscow93","stu81723jdd399920os"]
    },
]

const Subject = redux(
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
                            <Typography style={{fontSize:21,color:nightMode?"#ffffff":"#676767"}}>My Subjects</Typography>
                        </Grid>
                        <Grid item  md={12} xs={12}>
                            <Paper style={PaperStyle}>
                                <Typography style={{color:nightMode?"#ffffff":"#676767"}}>Subjects</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </StudentLayout>
        )
    }else if(isTeacher){
        return(
            <AdminLayout isAdmin={false}>
            </AdminLayout>
        )
    }else if(isAdmin){
        return(
            <AdminLayout isAdmin={true}>
            </AdminLayout>
        )
    }

    return (
        <Box>
            <Typography>Login</Typography>
        </Box>
    )
})
export default Subject;
