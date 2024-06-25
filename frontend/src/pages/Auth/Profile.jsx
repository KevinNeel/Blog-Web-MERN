import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

// import { getProfile } from '../../redux/Slices/AuthSlice';

const Profile = (props) => {

    //Used props for getting the user details
    let { name, email } = { ...props }

    //This part is commented because of bug

    // const dispatch = useDispatch();
    // const userState = useSelector((state) => state.user);

    // useEffect(() => {
    //     dispatch(getProfile());
    // }, [dispatch]);

    const logout = () => {
        localStorage.clear();
        window.location.href = '/login'
      }

    console.log(name, email);

    return (
        <section>
            <Box padding={'15px'} height={"100%"}>
                <Grid container spacing={2} bgcolor={'white'} padding={'25px'} height={"100%"}>
                    <Grid xs={12} className='profile-div'>
                        <div className="profile-page">
                            <h1>User Profile</h1>
                            <h5>Name - {name}</h5>
                            <h5>Email - {email}</h5>
                            <Button variant="contained" type='submit' className='authBtn formBtn red-button' onClick={logout}>Logout</Button>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </section>
    );
};

export default Profile;
