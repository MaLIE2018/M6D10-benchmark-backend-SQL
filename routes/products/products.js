import express from 'express';
import createError from 'http-errors';
import models from "../../modules/db/index.js"
import q2m from "query-to-mongo"
import o from "sequelize"
const productsRouter = express.Router();
const ProductM = models.Product
const op = o.Op
// get all products
productsRouter.get('/', async (req, res, next) => {
  // price, category, 
  try {
    const query = q2m(req.query)
    console.log('query:', query)
    const {brand, category} = query.criteria
    const products = await ProductM.findAll({offset: query.criteria.skip, limit: query.options.limit})
    const total = await ProductM.count()
    let brands = await ProductM.findAll({
      attributes: [[models.sequelize.fn('DISTINCT', models.sequelize.col('brand')), 'Brand']],
      group:['brand'],raw: true
    })
    brands = brands.reduce((acc, el) =>{
      acc.push(el.Brand)
      return acc
    },[] )
    let categories = await ProductM.findAll({
      attributes: [[models.sequelize.fn('DISTINCT', models.sequelize.col('category')), 'Category']],group:['category'],raw: true
    })
    categories = categories.reduce((acc, el) =>{
      acc.push(el.Category)
      return acc
    },[] )
    res.status(200).send({brands: brands,categories:categories,total: total, products: products})
  } catch (error) {
    console.log("getProductsError", error)
    res.send({ message: error.message });
  }
});

// get single product
productsRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await ProductM.findByPk(req.params.id)
    res.status(200).send(product)
  } catch (error) {
    console.log(error)
    next(error);
  }
});

productsRouter.post("/bulk", async (req, res, next) => {
  try {
    await ProductM.bulkCreate([
      {
        "name": "The Last Wish: Introducing the Witcher",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/51eHtkVLL5L.jpg",
        "price": 9.59,
        "category": "books",
        "brand": "Booker",
        "description": "Great Book"
      },
      {
        "name": "Sword of Destiny (The Witcher)",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/91uxJwnolDL.jpg",
        "price": 10.39,
        "category": "books",
        "brand": "Booker",
        "description": "Great Book"
      },
      {
        "name": "D&D MORDENKAINEN'S TOME OF FOES (Dungeons & Dragons)",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/8147MOLG%2BoL.jpg",
        "price": 27.94,
        "category": "books",
        "brand": "Booker",
        "description": "Great Book"
      },
      {
        "name": "Destiny Grimoire Anthology, Volume II: Fallen Kingdoms",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/91IHwcEy2DL.jpg",
        "price": 19.92,
        "category": "books",
        "brand": "Booker",
        "description": "Great Book"
      },
      {
        "name": "D&D Waterdeep Dragon Heist HC (Dungeons & Dragons)",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/81Sfnxpke4L.jpg",
        "price": 34.61,
        "category": "books",
        "brand": "Booker",
        "description": "Great Book"
      }
    ]
    )
    res.status(200).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// create/POST product
productsRouter.post("/", async (req, res, next) => {
  try {
    const product = await ProductM.create(req.body)
    res.status(200).send({ id: product.id });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// DELETE product
productsRouter.delete("/:id", async (req, res, next) => {
  try {
    await ProductM.destroy({where: { id: req.params.id}})
    res.status(204).send()
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// update/PUT product
productsRouter.put("/:id", async (req, res, next) => {
  try {
    const product = await ProductM.update(req.body,{where: {id: req.params.id}})
    res.status(200).send({ id: product.id });
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});



export default productsRouter;
