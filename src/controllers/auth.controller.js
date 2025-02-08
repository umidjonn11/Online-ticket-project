import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {validationResult} from 'express-validator';

export const register = async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {username, email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({errors: [{message: 'User already exists'}]});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user =new User({username, email, password:hashedPassword});
        await user.save();
        res.status(200).json({message: 'User register successfully'});
    } catch (error){
        res.status(500).json({message: "Server Error"});
    }
};

export const login = async (req, res) =>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h',});

        res.json({token, user: {_id: user._id, username: user.username, email: user.email}});
    } catch (error){
        res.status(500).json({message: "Server Error"});
    }
};