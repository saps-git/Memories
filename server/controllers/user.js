import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/user.js';

const secret = 'GULAG';

export const signin = async(req, res) => {
    const { email, password } = req.body;

    try{
        oldUser = await User.findOne({ email });
        if(!oldUser){
            return res.status(404).json({ message: "User doesn't exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        if(!isPasswordCorrect){
            return res.status(404).json({ message: "Password is incorrect" });
        }

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id}, secret, { expiresIn: "1h" });
        res.status(200).json({ result: oldUser, token });
    } catch(err){
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const signup = async(req, res) => {
    const { email, password, confirmPassword,firstName, lastName } = req.body;

    try{
        oldUser = await User.findOne({ email });
        if(oldUser){
            return res.status(404).json({ message: "User with email already exists" });
        }

        if(password !== confirmPassword){
            return res.status(404).json({ message: "Password doesn't match" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);        
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        const token = jwt.sign({ email: result.email, id: result._id} , secret, { expiresIn: "1h" });

        res.status(200).json({ result: result, token });
    } catch(err){
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};