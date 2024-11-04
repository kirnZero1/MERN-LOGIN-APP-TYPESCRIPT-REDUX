import express,{Request, Response} from 'express';
import mongoose from 'mongoose';
import { usersData } from '../model/userSchema';

export const getUsers = async (req: Request, res: Response) => {
        try{
            const users = await usersData.find({}).sort({createdAt: -1})
            return res.status(200).json(users)
        }catch{
            (error: any) => {
                return res.status(200).json({Error: error})
            }
        }
}

export const getUser = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({Error: 'No such UserId, Please input a valid userId.'})
        }
        const users = await usersData.findById({_id: id})
        return res.status(200).json(users)
    }catch{
        (error: any) => {
            return res.status(200).json({Error: error})
        }
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({Error: 'No such UserId, Please input a valid userId.'})
        }
        const users = await usersData.findByIdAndDelete({_id: id})
        return res.status(200).json(users)
    }catch{
        (error: any) => {
            return res.status(200).json({Error: error})
        }
    }
}

export const createUser = async (req: Request, res: Response) => {
    try{
        const {username, password, email, isAdmin} = req.body;

        const usernames = await usersData.findOne({username: username})
        if(usernames){
            return res.status(400).json({Error: 'Username already in use. Please check your username. thank you!'})
        }

        const emails = await usersData.findOne({email: email})
        if(emails){
            return res.status(400).json({Error: 'Email address already in use. Please check your Email address. thank you!'})
        }


        const users = await usersData.create({username: username, password: password, email: email, isAdmin: isAdmin})
        return res.status(200).json(users)
    }catch{
        (error: any) => {
            return res.status(200).json({Error: error})
        }
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const {username, password, email, isAdmin} = req.body;
        const users = await usersData.findByIdAndUpdate({_id: id},{username: username, password: password, email: email, isAdmin: isAdmin})
        return res.status(200).json(users)
    }catch{
        (error: any) => {
            return res.status(200).json({Error: error})
        }
    }
}

module.exports = {
    getUsers, getUser, deleteUser, createUser, updateUser
}