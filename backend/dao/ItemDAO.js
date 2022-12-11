import express from "express";

import Item from "../models/itemModel.js";

export const getBestSellers = async (req, res) => {
  try {
    const items = await Item.find({});

    return {
      stats: {
        length: 15,
      },
      data: items.slice(0, 15),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Couldnt fetch from database");
  }
};

export const getAllItems = async (req, res) => {
  try {
    const response = await Item.find({});
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const averageRatings = async (req, res) => {
  try {
    const itemId = req.body.itemId;
    const item = await Item.findById(itemId);
    const avg =
      item.reviews.reduce((partialSum, a) => partialSum + a.rating, 0) /
      item.reviews.length;
    return { average: avg, numRatings: item.reviews.length };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const removeReview = async (req, res) => {
  try {
    const userId = req.body.userId;
    const itemId = req.body.itemId;
    const item = await Item.findById(itemId);
    const review = item.reviews.find((rev) => rev.user == userId);
    if (!review) {
      throw new Error("This user never made a review on that item!");
    }
    item.reviews = item.reviews.filter((rev) => rev._id != review._id);
    const response = await item.save();
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const addReview = async (req, res) => {
  try {
    const review = req.body.review;
    const itemId = req.body.itemId;
    const userId = review.user;
    const item = await Item.findById(itemId);
    if(!item){
      throw new Error("item does not exist")
    }
    if (review.rating > 5 || review.rating < 0) {
      throw new Error("Can't add raing over 5 or less than 0");
    }
    console.log(item)
    const reviewExists = item.reviews.find(
      (oldReview) => userId == oldReview.user
    );
    if (reviewExists) {
      throw new Error("This user already has a review that exists");
    }
    item.reviews.push(review);
    await item.save();
    return item;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const getItem = async (req, res) => {
  const itemId = req.params.id;
  let itemFromDatabase;
  try {
    itemFromDatabase = await Item.findById(itemId);
  } catch (error) {
    console.log(error);
    throw new Error("Item ID Wrong Format");
  }
  if (itemFromDatabase == null) {
    throw new Error("Item Not Found!");
  }
  return itemFromDatabase;
};

export const updateItem = async (req, res) => {
  const itemId = req.body.itemId;
  const updatedBody = req.body.update;
  try {
    const response = await Item.findByIdAndUpdate(itemId, updatedBody);
    return response;
  } catch (error) {
    throw new Error("Error Updating Item");
  }
};

export const createItem = async (req, res) => {
  const newItem = req.body.item;

  try {
    const res = await Item.create(newItem);
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteItem = async (req, res) => {
  try {
    const itemId = req.body.itemId;
    const res = await Item.findByIdAndDelete(itemId);
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export const getNumReviews = async (req, res) => {
  try {
    const itemId = req.body.itemId;

    const res = await Item.findById(itemId);
    return { numReviews: res.reviews.length };
  } catch (error) {
    throw new Error(error);
  }
};

export const filter = async (req, res) => {
  try {
    const colname = req.body.colname;
    const searchString = req.body.searchString;
    if (!colname==null || !searchString) {
      return await getBestSellers(req, res);
    }

    const r =
      colname.toLowerCase() == "name"
        ? await Item.find({
            $or: [
              { [colname]: { $regex: searchString, $options: "i" } },

              { description: { $regex: searchString, $options: "i" } },
            ],
          })
        : await Item.find({
            $or: [{ [colname]: { $regex: searchString, $options: "i" } }],
          });
    const response = {
      stats: {
        length: r.length,
      },
      data: r,
    };
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
