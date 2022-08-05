const {Model , DataTypes} = require('sequelize')
const useBcrypt = require('sequelize-bcrypt');
const sequelize = require('../database')
const Type = require('./type')

class User extends Model{
    static associate(models){
        User.hasMany(models.Type)
    }
}

User.init({
    userId:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName:'user',
}
)
useBcrypt(User, {
    field: 'password', // secret field to hash, default: 'password'
    rounds: 12, // used to generate bcrypt salt, default: 12
    compare: 'authenticate', // method used to compare secrets, default: 'authenticate'
  });

  User.hasMany(Type,{as:'type',foreignKey:'userId'})

module.exports = User