const {Model,DataTypes} = require('sequelize')
const sequelize = require('../database')
const Type = require('./type')

class Objet extends Model{

    static associate(models){
        Objet.belongsTo(models.Type)
        models.Type.hasMany(Objet)
    }
}



Objet.init({
    objectId:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    objetName:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    etat:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    number:{
        type:DataTypes.INTEGER,
        allowNull: false,
    }

}, {
    sequelize,
    modelName:'objet'
})



module.exports = Objet