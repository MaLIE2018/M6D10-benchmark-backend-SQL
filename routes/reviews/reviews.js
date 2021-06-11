import express from "express";
import createError from "http-errors";
import { renameSync } from "node:fs";
import models from "../../modules/db/index.js"


const ReviewM  = models.Review

const reviewsRouter = express.Router();

//---------------ROUTES----------- //

reviewsRouter.get("/:productId", async (req, res, next) => {
  try {
    const reviews = await ReviewM.findAll({where: {productId: req.params.productId}})
    res.status(200).send(reviews)
  } catch (error) {
    console.log(error);
    next(error);
  }
});
reviewsRouter.post("/:productId", async (req, res, next) => {
  try {
    const review = await ReviewM.create({...req.body, productId: req.params.productId})
    res.status(201).send()
  } catch (error) {
    console.log(error);
    next(error);
  }
});

reviewsRouter.put("/:id", async (req, res, next) => {
  try {
   await ReviewM.update(req.body, {where: {id: req.params.id}})
   res.status(200).send()
  } catch (error) {
    next(error);
  }
});

reviewsRouter.delete("/:id", async (req, res, next) => {
  try {
    await ReviewM.destroy({where: {id: req.params.id}})
    res.status(204).send()
  } catch (error) {
    next(error);
  }
});

export default reviewsRouter;
