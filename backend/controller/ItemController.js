import express from "express";

import Item from "../models/itemModel.js";

// import the visit Data Access Object in order to make data calls to the user DB
import VisitDAO from "../dao/visitDAO.js";

import * as ItemDAO from "../dao/ItemDAO.js"

export const getItemFromBackend=async(req,res)=>{
    try{
        // This will increment the visit for this user based on ipaddress by 1 if they have not done this yet
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        const visit = await VisitDAO.getVisit(today, req.ip, "Item View")
        if (visit.length === 0) {
            const newVisitInfo = {
                date: today,
                ipAddress: req.ip,
                visitType: "Item View"
            };
            await VisitDAO.createVisit(newVisitInfo)
        }
        const response= await ItemDAO.getItem(req,res)
        res.json(response)
    }catch(err){
        //Not found
        res.status(404)
        res.json({
            message:err.message,
            stack: process.env.NODE_ENV==='production'? null: err.stack,
        })
        }
}

export const getBestSellersFromBackend= async(req,res)=>{
    try{
        const response= await ItemDAO.getBestSellers()

        res.json(response)
    }catch(err){
        res.status(404)
        res.json({
            message:err.message,
            stack: process.env.NODE_ENV==='production'? null: err.stack,
        })
    }
}

export const createItem= async(req,res)=>{
    try{
        const response= await ItemDAO.createItem(req,res)
        res.json(response)
    }catch(err){
        console.log(err)
        res.status(404)
        res.json({
            message:err.message,
            stack: process.env.NODE_ENV==='production'? null: err.stack,
        })

    }
}

export const deleteItem= async(req,res)=>{
    try{
        const response= await ItemDAO.deleteItem(req,res)
        res.json(response)
    }catch(err){
        console.log(err)
        res.status(404)
        res.json({
            message:err.message,
            stack: process.env.NODE_ENV==='production'? null: err.stack,
        })

    }
}

export const updateItem= async(req,res)=>{
    try{
        const response= await ItemDAO.updateItem(req,res)
        res.json(response)
    }catch(err){
        console.log(err)
        res.status(404)
        res.json({
            message:err.message,
            stack: process.env.NODE_ENV==='production'? null: err.stack,
        })
    }
}

export const addReview= async(req,res)=>{
    try{
        const response= await ItemDAO.addReview(req,res)
        res.json(response)
    }catch(err){
        console.log(err)
        res.status(404)
        res.json({
            message:err.message,
            stack: process.env.NODE_ENV==='production'? null: err.stack,
        })
    }
}

export const removeReview= async(req,res)=>{
    try{
        const response= await ItemDAO.removeReview(req,res)
        res.json(response)
    }catch(err){
        console.log(err)
        res.status(404)
        res.json({
            message:err.message,
            stack: process.env.NODE_ENV==='production'? null: err.stack,
        })
    }
}

export const averageRatings= async(req,res)=>{
    try{
        console.log(req.body)
        const response= await ItemDAO.averageRatings(req,res)
        res.json(response)
    }catch(err){
        console.log(err)
        res.status(404)
        res.json({
            message:err.message,
            stack: process.env.NODE_ENV==='production'? null: err.stack,
        })
    }
}

export const getNumReviews = async(req,res)=>{
    try{
        const response= await ItemDAO.getNumReviews(req,res)
        res.json(response)
    }catch(err){
        console.log(err)
        res.status(404)
        res.json({
            message:err.message,
            stack: process.env.NODE_ENV==='production'? null: err.stack,
        })
    }
    
}
export const filter= async(req,res)=>{
    try{
        const response= await ItemDAO.filter(req,res)
        res.json(response)
    }catch(err){
        console.log(err)
        res.status(404)
        res.json({
            message:err.message,
            stack: process.env.NODE_ENV==='production'? null: err.stack,
        })
    }
}