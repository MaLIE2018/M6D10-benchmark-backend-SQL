import express from 'express';
import cors from 'cors';
import reviewsRouter from './routes/reviews/reviews.js';
import {badRequest, notFound, forbidden,catchAll } from "./modules/errorHandler.js"
import filesRouter from './modules/files/fileHandler.js';
import productsRouter from './routes/products/products.js';
import listEndpoints from "express-list-endpoints"
import createError from 'http-errors';
const app = express();
const port = process.env.PORT || 3001;
import db from "./modules/db/index.js"
const whiteList = [process.env.WT_DEV_FE, process.env.WT_PROD_FE]


const corsOptions = {
  origin: function(origin, next){
    if (whiteList.indexOf(origin)===-1) {
        next(createError(403,{message:"Origin not allowed"}))
    }else{
        next(null, true)
    }
  }
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/products", filesRouter, productsRouter);
app.use("/reviews", reviewsRouter);

app.use(badRequest, notFound, forbidden,catchAll);

app.use((req,res,next)=>{
  if(!req.route && !req.headersSent){
    res.send(createError(404,{message:"The route is not implemented"}))
  }
})
console.table(listEndpoints(app))


db.sequelize.sync({alter:true}).then(()=> app.listen(port, ()=> {console.log("Listening on port" + port)}))