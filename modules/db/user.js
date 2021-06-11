export default (sequelize, DataTypes)=>{
  const User = sequelize.define('user',{
      id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey:true},
      name: {type: DataTypes.STRING, allowNull: false}
  })
  return User
}