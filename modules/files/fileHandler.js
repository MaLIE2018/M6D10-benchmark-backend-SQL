import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import models from "../db/index.js"


const filesRouter = express.Router();
const ProductM = models.Product

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Products-Images",
  },
});

filesRouter.post("/:id/upload",
  multer({ storage: cloudinaryStorage }).single("image"),
  async (req, res, next) => {
    try {
        const product = await ProductM.update({imageUrl: req.file.path}, {where: {id: req.params.id}})
        res.send({id: product.id});
    } catch (error) {
      next(error);
    }
  }
);
export default filesRouter;
