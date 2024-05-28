import {useEffect, useState} from 'react'
import {Link, Route, Routes} from "react-router-dom";

import Profits from "./components/Profits";
import Expense from "./components/Expense";
import Income from "./components/Income";
import {
    Alert, AlertTitle, AppBar, Box, Button, IconButton, Paper, Stack, Toolbar, Typography
} from "@mui/material";
import theme from "./theme";
import Cake from "./components/Cake";
import Profiles from "./services/Profiles";
import {useDropdown} from "./hooks";

const About = () => (<Paper style={{padding: 16}}>
    <Typography variant="h4" gutterBottom>
        Get to Know Us
    </Typography>
    <Typography variant="body1" gutterBottom>
        Did you know that the ancient Egyptians were some of the earliest bakers? They even had professional bakers
        who were paid in bread and beer! We like to think that not much has changed since then - except maybe the
        addition of chocolate chips and rainbow sprinkles
    </Typography>
    <Typography variant="body1" paragraph>
        Are you tired of losing track of your baking expenses? Look no further! Our website offers a simple and easy
        way to track your expenses and keep your baking budget under control.
    </Typography>
    <Typography variant="body1" paragraph>
        Here at our home baking expense tracking website, we're all about helping you keep track of your baking
        expenses and ensuring that your passion for baking doesn't break the bank. Because let's face it, there's no
        such thing as too much butter or sugar, but there is such a thing as a budget. </Typography>
    <Typography variant="body1" paragraph>
        So go ahead, whip up a batch of your favorite cookies and let us take care of the number crunching. After
        all, baking is all about having fun and indulging in the sweeter things in life. And if anyone tells you
        otherwise, just offer them a freshly baked cookie and watch as their frown turns upside down!"
    </Typography>
</Paper>)

const Footer = () => (<div>
    <hr/>
    Bake Track app for Home Bakers
</div>)


const App = () => {

    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const [profiles, setProfiles] = useState([])
    const [currentProfile, setCurrentProfile] = useState(null)
    const [profits, setProfits] = useState([])
    const [cakes, setCakes] = useState([])
    const {
        selectedValue: selectedProfile, Dropdown: ProfileDropdown
    } = useDropdown(profiles.map(profile => profile.name));

    useEffect(() => {
        document.title = "Bake Track";
    })
    const fetchData = async () => {
        await Profiles.getAll().then((res) => {
            setProfiles(res)
        })
    }

    useEffect(() => {

        fetchData()
    }, [])

    useEffect(() => {
        const newCurrentProfile = profiles.find(profile => profile.name === selectedProfile)
        if (newCurrentProfile !== currentProfile) {
            setCurrentProfile(newCurrentProfile)


        }
    }, [selectedProfile])
    useEffect(() => {
        if (currentProfile) {
            setProfits(currentProfile.profits)
            setCakes(currentProfile.cakes)
        }

    }, [currentProfile])

    useEffect(() => {
        // fetchProfile()
        if (message !== null) setTimeout(() => setMessage(null), 6000)
    }, [message])
    useEffect(() => {
        if (error !== null) setTimeout(() => setError(null), 6000)
    }, [error])

    return (

        <div style={{
            fontFamily: theme.typography.fontFamily
        }}>
            <Stack spacing={2} sx={{width: '100%'}}>

                {message && (<Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {message}
                </Alert>)}
                {error && (<Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>)}
            </Stack>
            <Box align='right'> Baker Profile: <ProfileDropdown/></Box>
            {/*<Notification message={message}/>*/}
            <AppBar position="static" color="primaryLight">
                <Toolbar>
                    <Typography variant='h5' align='left'>The Baking Hub</Typography>
                    <IconButton edge="start" color="secondary" aria-label="menu">
                    </IconButton>
                    <Box style={{justifyContent: 'flex-end'}} sx={{flexGrow: 1, display: {xs: 'flex', md: 'flex'}}}>
                        <Button color="inherit" component={Link} to="/profits">
                            Profits </Button>
                        <Button color="inherit" component={Link} to="/expense">
                            Expense </Button>
                        <Button color="inherit" component={Link} to="/income">
                            Income</Button>
                        <Button color="inherit" component={Link} to="/cake">
                            Cake</Button>
                        <Button color="inherit" component={Link} to="/">About</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            {currentProfile ? <Routes key={currentProfile.name}>
                <Route path="/profits" element={<Profits key={currentProfile.id}
                                                         profits={profits} setProfits={setProfits}/>}/>
                <Route path="/expense" element={<Expense setMessage={setMessage} setError={setError}
                                                         profits={profits}   setProfits={setProfits} profileId={currentProfile.id}
                                                         expenseData={currentProfile.expenses} cakes={cakes}/>}/>
                <Route path="/income"
                       element={<Income setMessage={setMessage} setError={setError} profileId={currentProfile.id}
                                        profits={profits} setProfits={setProfits} incomes={currentProfile.incomes} cakes={cakes}/>}/>
                <Route path="/cake" element={<Cake setMessage={setMessage} setError={setError}
                                                   profileId={currentProfile.id} cakes={cakes} setCakes={setCakes}/>}/>

                <Route path="/" element={<About/>}/>
            </Routes> : null}
            <Footer/>
        </div>)
}

export default App
