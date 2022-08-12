import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NightlightIcon from '@mui/icons-material/Nightlight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import TaskIcon from '@mui/icons-material/Task';
import {AccountCircle, DarkMode} from "@mui/icons-material";
import {Switch} from "@mui/material";
import {redux} from "../helpers/redux";
import { useRouter } from 'next/router';
import {useEffect} from "react";
import _ from 'lodash';

let drawerWidth = 240;

const openedMixin = (theme,nightMode) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor:nightMode?"#10111a":"#ffffff",
});

const closedMixin = (theme,nightMode) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: drawerWidth>240?"0px":`calc(${theme.spacing(7)} + 1px)`,
    backgroundColor:nightMode?"#10111a":"#ffffff",
    [theme.breakpoints.up('sm')]: {
        width: drawerWidth>240?"0px":`calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open ,nightMode}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor:nightMode?"#10111a":"#ffffff",
    color:nightMode?"#eaf4fb":"#252525",
    ...(open && {
        marginLeft: drawerWidth>300?0:drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open, nightMode }) => ({
        width: 500,
        flexShrink: 1,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme,nightMode),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme,nightMode),
        }),
    }),
);

const StudentLayout = redux(
    ['nightMode'],
    ['setNightMode'],
)(props => {
    const {children,setNightMode,nightMode} = props;
    const router = useRouter();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [mobile, setMobile] = React.useState(false);
    const [screenSize, getDimension] = React.useState({
        dynamicWidth: window.innerWidth,
        dynamicHeight: window.innerHeight
    });
    const pages = [
        {
            name:"Dashboard",
            icon: <DashboardIcon />,
            path:"/"
        },
        {
            name:"Subjects",
            icon: <LibraryBooksIcon />,
            path:"/subjects"
        },
        {
            name:"Grades",
            icon: <TaskIcon />,
            path:"/grades"
        }
    ]

    const setDimension = () => {
        if(window.innerWidth>600){
            drawerWidth = 240;
            setMobile(false);
        }else{
            drawerWidth = window.innerWidth;
            setMobile(true);
        }
    }

    useEffect(() => {
        if(typeof window === "undefined") return;
        window.addEventListener('resize', setDimension);

        return(() => {
            window.removeEventListener('resize', setDimension);
        })
    }, [screenSize])

    useEffect(()=>{
        setDimension();
        let nm = localStorage.getItem('nightMode');
        if(nm ==="true"){
            setNightMode(true);
        }
    },[])


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} nightMode={nightMode}>
                <Toolbar>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                                color:"#f89723"
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        {!mobile&&<Typography variant="h6" noWrap component="div">
                            Student
                            - {router.asPath.replace("/", "") === "" ? "Dashboard" : _.upperFirst(router.asPath.replace("/", ""))}
                        </Typography>}
                    </Box>
                    <Box sx={{ flexGrow: 0,paddingRight:2 }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                            style={{padding:0}}
                            onClick={()=>{
                                localStorage.setItem('nightMode',_.toString(!nightMode));
                                setNightMode(!nightMode);
                            }}
                        >
                            <DarkMode />
                        </IconButton>
                        <Switch checked={nightMode} color="warning" onChange={(e)=>{
                            localStorage.setItem('nightMode',_.toString(e.target.checked));
                            setNightMode(e.target.checked);
                        }} />
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>

            </AppBar>
            <Drawer variant="permanent" open={open} nightMode={nightMode}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose} style={{color:nightMode?"#eaf4fb":"#404040"}}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List sx={{
                    '& .MuiListItemButton-root:hover': {
                        '&, & .MuiListItemIcon-root': {
                            color: '#f89723',
                        },
                    },
                }}>
                    {pages.map((value, index) => (
                        <ListItem key={value.name} disablePadding sx={{ display: 'block',  color:(nightMode||router.asPath === value.path)?"#eaf4fb":"#404040" }}
                                  onClick={()=>{router.push(value.path)}}
                        >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    backgroundColor:router.asPath === value.path?"#f89723":"rgba(255,255,255,0)",
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color:(nightMode||router.asPath === value.path)?"#eaf4fb":"#404040",
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        padding:1
                                    }}
                                >
                                    {value.icon}
                                </ListItemIcon>
                                <ListItemText primary={value.name} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1 }} style={{backgroundColor:nightMode?"#232234":"#f3f3f3",minHeight:"100vh",padding:20}}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
})

export default StudentLayout;
