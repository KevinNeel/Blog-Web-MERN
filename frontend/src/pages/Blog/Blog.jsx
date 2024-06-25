import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

/* Select Picker */
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel';

import { createBlog, deleteBlog, getAllBlog } from '../../redux/Slices/BlogSlice';
import Swal from 'sweetalert2';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Blog = (props) => {

    let { id, name } = props

    const blogState = useSelector(state => state.blog);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [blog, setBlogState] = useState([])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getAllData()
    }, [])

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: ""
    });

    async function getAllData() {
        let data = await dispatch(getAllBlog());
        setBlogState(data?.payload)
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

    };

    //Create function for blog
    async function handleSubmit(e) {
        e.preventDefault();

        let response = await dispatch(createBlog(formData))
        handleClose()

        if (response.error) {
            if (typeof response.payload.message == 'string') {
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `${response.payload.message}`,
                    })
                }
                return
            }
        } else {
            {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfull',
                    text: `${response.payload.message}`,
                }).then(function () {
                    getAllData()
                })
            }
        }

    }

    //Delete function for blog
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {

            let response = await dispatch(deleteBlog(id))

            if (response.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `${response.payload.message}`,
                })
            } else {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                }).then(() => {
                    getAllData()
                });
            }

        });
    }

    //Search the title of the blog
    function searchItem(e) {
        console.log(e.target.value);
        const searchValue = e.target.value.toLowerCase();
        if (e.target.value == '') {
            setBlogState(blogState.blog)
        } else {
            console.log(blogState);
            let serchedBlog = blogState?.blog.filter(item => item.title.toLowerCase().includes(searchValue));
            setBlogState(serchedBlog)
        }
    }

    //Characters greaten than max length will be converted
    function textSlice(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    }

    return (
        <>

            <section>
                <Box padding={'15px'}>
                    <Grid container spacing={2} bgcolor={'white'} padding={'25px'}>
                        <Grid xs={12}>
                            <h1>Blog.com</h1>
                        </Grid>

                        {/* Implemented modal for creating the blog */}

                        <Grid xs={6}>
                            <Button onClick={handleOpen}>Create Blog</Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                width={70}
                            >
                                <Box sx={style}>
                                    <Grid container spacing={2} height={"100%"}>
                                        <Grid item xs={12} className='all-center'>
                                            <div className="innerContent">
                                                <div className="form-heading">
                                                    <h1 className='form-heading-text'>Create Blog</h1>
                                                </div>
                                                <form action="" onSubmit={handleSubmit}>
                                                    <div className="form-input">
                                                        <label className='formLabel'>Title</label>
                                                        <TextField required onChange={handleChange} sx={{
                                                            marginTop: '15px'

                                                        }} sx={{
                                                            '& .MuiInputBase-root': {
                                                                borderRadius: '22px',
                                                            },
                                                            marginTop: '15px'
                                                        }} className='formInput' name='title' fullWidth label="Title" id="fullWidth" variant="outlined" />
                                                    </div>
                                                    <div className="form-input">
                                                        <label className='formLabel'>Description</label>
                                                        <TextField required onChange={handleChange} sx={{
                                                            marginTop: '15px'
                                                        }} sx={{
                                                            '& .MuiInputBase-root': {
                                                                borderRadius: '22px',
                                                            },
                                                            marginTop: '15px'
                                                        }} className='formInput' name='description' fullWidth label="Description" id="fullWidth" variant="outlined" />
                                                    </div>

                                                    <div className="form-input">
                                                        <label className='formLabel'>Category <span className='startColor'>*</span></label>
                                                        <FormControl fullWidth className='formInput' sx={{ marginTop: '15px' }}>

                                                            <InputLabel id="demo-simple-select-label" >Select Category</InputLabel>
                                                            <Select
                                                                sx={{ borderRadius: '22px' }}
                                                                className='select-box'
                                                                value={formData.category}
                                                                label="Select Caregory" labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                name='category'
                                                                onChange={handleChange}
                                                            >
                                                                <MenuItem value={'Education'}>Education</MenuItem>
                                                                <MenuItem value={'Travel'}>Travel</MenuItem>
                                                                <MenuItem value={'Business'}>Business</MenuItem>
                                                            </Select>

                                                        </FormControl>
                                                    </div>

                                                    <div className="form-btn-div">
                                                        <Button variant="contained" type='submit' className='authBtn formBtn blue-button'>Add</Button>
                                                        <Button variant="contained" onClick={handleClose} className='authBtn formBtn grey-button'>Cancel</Button>
                                                    </div>
                                                </form>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Modal>

                        </Grid>

                        <Grid xs={6} className="search-inp">
                            <TextField id="outlined-basic" onChange={searchItem} label="Search" variant="outlined" />
                            <Link className='profile-link' to={`/myProfile`}>
                                <AccountCircleIcon />
                            </Link>
                        </Grid>

                        {blogState.loading === true ? <h1>Loading...</h1> :
                            blog?.map((item) => (
                                <Grid xs={4} margin={1}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item.title}
                                            </Typography>
                                            <Typography variant="h6" color="text.secondary">
                                                {item.category}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {textSlice(item.description, 100)}
                                            </Typography>
                                        </CardContent>
                                        {id == item.userId ?
                                            <CardActions>
                                                <Link to={`/editBlog/${item._id}`}>
                                                    <Button color='secondary' size="small">Edit</Button>
                                                </Link>
                                                <Button onClick={(e) => { handleDelete(item._id) }} color='error' size="small">Delete</Button>
                                                <Link to={`/viewBlog/${item._id}`}>
                                                    <Button color='secondary' size="small">Read More</Button>
                                                </Link>
                                            </CardActions>
                                            :
                                            <CardActions>
                                                <Link to={`/viewBlog/${item._id}`}>
                                                    <Button color='secondary' size="small">Read More</Button>
                                                </Link>
                                            </CardActions>
                                        }
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            </section>
        </>
    )

}

export default Blog