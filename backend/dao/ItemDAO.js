import express from "express";

import Item from "../models/itemModel.js";


export const getBestSellers= async(req,res)=>{

    try{
    const items = await Item.find({})
    return items.slice(0,15)
    }catch(error){
        console.log(error)
        throw new Error("Couldnt fetch from database")
    }


}

export const getItem =async(req,res)=>{
    const itemId= req.params.id;
    let itemFromDatabase;
    try{
        itemFromDatabase= await Item.findById(itemId)
 
    }catch(error){
        console.log(error)
        throw new Error("Item ID Wrong Format")
    }
    if(itemFromDatabase== null){
        throw new Error("Item Not Found!")
    }
    return itemFromDatabase


}

export const updateItem= async(req,res)=>{
    const itemId= req.body.itemId
    const updatedBody=req.body.update
    try{
        const response= await Item.findByIdAndUpdate(itemId,updatedBody)
        return response;
    }catch(error){
        throw new Error("Error Updating Item")
    }
}

export const createItem= async(req,res)=>{
    const newItem= req.body.item;


    try{
        const res=  await Item.create(newItem)
        return res;
    }catch(error){
        throw new Error(error)
    }
}

export const deleteItem= async(req,res)=>{
    const itemId= req.body.itemId;
    try{
        const res= await Item.findByIdAndDelete(itemId)
        return res;
    }catch(error){
        throw new Error(error)
    }
}