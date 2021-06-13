import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => {
    try{
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    }catch(err){
        res.status(404).json({ message: err.message });
    }
};

export const getPost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);


    try{
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    }catch(err){
        res.status(404).json({ message: err.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    
    try{
        await newPostMessage.save();
        res.status(200).json(newPostMessage);

    }catch(err){
        res.status(404).json({ message: err.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    await PostMessage.findByIdAndUpdate(id, updatedPost, {new: true});

    res.json(updatedPost);
};

export const deletePost = async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);
    res.json({ message: 'Post deleted successfully' });
};

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) //passsed from middleware 
        return res.json({ message: "Unauthenticated" });
    
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId)); // checking if current user has already liked the post, by comparing his id, with all the ids stored in the likes array

    if(index === -1){ //if he hasn't liked, (index will be -1)
        post.likes.push(req.userId); //then push his id in the likes array
    }else{ //if current logged in user has already liked,  
        post.likes = post.likes.filter((id) => id !== String(req.userId)); //then filter out his id from the likes array, i.e unlike
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost);
};

export default router;

