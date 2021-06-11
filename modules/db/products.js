 export default (sequelize, DataTypes)=>{
  const Product = sequelize.define('product',{
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    category: {type: DataTypes.STRING, allowNull: false},
    brand: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    imageUrl: {type: DataTypes.STRING, allowNull: true, defaultValue: ""}
  })
  return Product
}