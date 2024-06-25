import React, { useEffect, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

//This library is used to format the date
import dayjs from 'dayjs'

import { getBlog } from '../../redux/Slices/BlogSlice';

const ViewBlog = () => {

    const dispatch = useDispatch();
    let { id } = useParams();

    const blogState = useSelector(state => state.blog);

    useEffect(() => {
        dispatch(getBlog(id))
    }, [])


    return (
        <section>
            <Box padding={'15px'}>
                <Grid container spacing={2} bgcolor={'white'} padding={'25px'}>
                    <Grid xs={12} className='all-center'>
                        {blogState.loading === true ? <h1>Loading...</h1> :
                            <>
                                <div className="contentDiv">
                                    <div className="content-heading">
                                        <h1 className='content-heading-text'>{blogState.blog.title}</h1>
                                        <div className='span-content'>
                                            <span>
                                                {blogState.blog.userName}
                                            </span>
                                            <span>
                                                {dayjs(blogState.blog.created_at).format('MMM D, YYYY')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="content-body">
                                        <p className='content-test'>{blogState.blog.description}</p>
                                    </div>
                                </div>
                            </>}
                    </Grid>
                </Grid>
            </Box>
        </section>
    )

}

export default ViewBlog