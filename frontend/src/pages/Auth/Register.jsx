import React, { useEffect, useState, } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

/* ---- Password Input ---- */
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { register } from '../../redux/Slices/AuthSlice';

import Swal from 'sweetalert2';

const Register = () => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }


    async function handleSubmit(e) {
        e.preventDefault();

        if (formData.password != formData.confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `Password does not match`,
            });

            return
        }

        let response = await dispatch(register(formData));

        if (response.error) {
            Swal.fire({
                icon: "error",
                title: "Register Failed",
                text: `${response.payload.message}`,
            });
        } else {
            Swal.fire({
                title: "Registration Successful!",
                text: "Welcome to blg.com",
                icon: "success"
            }).then(() => {
                window.location.href = '/blog';

            });
        }
    }


    return (
        <section>
            <Box height={"100%"} >
                <Grid container spacing={2} height={"100%"}>
                    <Grid item xs={12} className='all-center'>
                        <div className="innerContent">
                            <div className="form-heading">
                                <h1 className='form-heading-text'>Sign Up</h1>
                                <p className='form-heading-label'>Join us in creating the Blogs!</p>
                            </div>

                            <form action="" onSubmit={handleSubmit}>

                                <div className="form-input">
                                    <label className='formLabel'>Name</label>
                                    <TextField required onChange={handleChange} sx={{
                                        '& .MuiInputBase-root': {
                                            borderRadius: '22px',
                                        },
                                        marginTop: '15px'

                                    }} className='formInput' name='userName' fullWidth label="Name" id="fullWidth" variant="outlined" />
                                </div>

                                <div className="form-input">
                                    <label className='formLabel'>Email</label>
                                    <TextField required onChange={handleChange} sx={{
                                        '& .MuiInputBase-root': {
                                            borderRadius: '22px',
                                        },
                                        marginTop: '15px'

                                    }} className='formInput' name='email' fullWidth label="Email" id="fullWidth" variant="outlined" />
                                </div>

                                <div className="form-input">
                                    <label className='formLabel'>Password</label>
                                    <FormControl required variant="outlined" fullWidth className='formInput' onChange={handleChange} sx={{
                                        '& .MuiInputBase-root': {
                                            borderRadius: '22px',
                                        },
                                        marginTop: '15px'
                                    }}
                                    >
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            name='password'
                                            label="Password"
                                        />
                                    </FormControl>
                                </div>

                                <div className="form-input">
                                    <label className='formLabel'>Confirm Password</label>
                                    <FormControl required variant="outlined" fullWidth className='formInput' onChange={handleChange} sx={{
                                        '& .MuiInputBase-root': {
                                            borderRadius: '22px',
                                        },
                                        marginTop: '15px'
                                    }}
                                    >
                                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            name='confirmPassword'
                                            label="Confirm Password"
                                        />
                                    </FormControl>
                                </div>

                                <div className="form-btn-div">
                                    <Button variant="contained" type='submit' className='authBtn formBtn blue-button'>Register</Button>
                                </div>
                                <div className="form-footer">
                                    <label htmlFor="">Don't have an account</label>
                                    <Link to="/Login" >Sign Up</Link>
                                </div>
                            </form>
                        </div>

                    </Grid>
                </Grid>

            </Box>

        </section>
    )
}

export default Register