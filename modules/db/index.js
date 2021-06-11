import s from "sequelize"

const Sequelize = s.Sequelize
const DataTypes = s.DataTypes
import ProductModel from "./products.js"
import ReviewModel from "./reviews.js"
import UserModel from "./user.js"
const {PGUSER, PGHOST, PGDATABASE, PGPASSWORD} = process.env

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: "postgres"
})


const test = async()=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


 const models = {
   Product: ProductModel(sequelize, DataTypes),
   Review: ReviewModel(sequelize, DataTypes),
   User: UserModel(sequelize, DataTypes),
   sequelize: sequelize
 }
 //One Product has many Reviews 
 models.Product.hasMany(models.Review)
 models.Review.belongsTo(models.Product)
 models.User.belongsToMany(models.Product, {through: "Cart", unique:false})


test()


export default models