import express from "express";

import Item from "../models/itemModel.js";

import * as ItemDAO from "../dao/ItemDAO.js"
export const getItemFromBackend=async(req,res)=>{
    try{
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