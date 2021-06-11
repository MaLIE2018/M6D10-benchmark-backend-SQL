export default (sequelize, DataTypes)=>{
  const Review = sequelize.define('review',{
      id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey:true},
      comment: {type: DataTypes.STRING, allowNull: false},
      rate: {type: DataTypes.INTEGER, allowNull: true, defaultValue:1},
  })
  return Review
}