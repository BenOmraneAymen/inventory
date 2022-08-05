const {Model ,DataTypes} = require('sequelize')
const sequelize = require('../database')
const Objet = require('./objet')

class Type extends Model{
    static associate(models){
        Type.belongsTo(models.User)
        Type.hasMany(models.Objet)
    }
}

Type.init({
    typeId:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
        
    },
    typeName:{
        type:DataTypes.STRING,
    }
}, {
    sequelize,
    modelName:'type'
})

Type.hasMany(Objet,{as:'type',foreignKey:'typeId'})

module.exports = Type