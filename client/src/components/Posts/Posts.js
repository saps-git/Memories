import React from 'react';
import Post from './Post/Post';
import useStyles from './styles';
import { Grid, CircularProgress } from '@material-ui/core';

import { useSelector } from 'react-redux'; //to fetch the data from global redux store

const Posts = () => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts);   //useSelector has access to the global state, which accesses the posts

    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6} md={6}>
                    <Post post={post} />
                </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts;
