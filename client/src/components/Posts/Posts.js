import React from 'react';
import Post from './Post/Post';
import useStyles from './styles';

import { useSelector } from 'react-redux'; //to fetch the data from global redux store

const Posts = () => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts);   //useSelector has access to the global state, which accesses the posts
    
    console.log(posts);
    return (
        <>
            <h1>POSTS</h1>
            <Post />
            <Post />
        </>
    )
}

export default Posts;
