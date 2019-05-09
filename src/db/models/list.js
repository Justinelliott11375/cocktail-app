'use strict';
module.exports = (sequelize, DataTypes) => {
  var List = sequelize.define('List', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  List.associate = function(models) {
    // associations can be defined here

    List.hasMany(models.Collaborator, {
      foreignKey: "listId",
      as: "collaborators"
    });
    List.hasMany(models.Card, {
      foreignKey: "listId",
      as: "cards"
    });
  };
  return List;
};