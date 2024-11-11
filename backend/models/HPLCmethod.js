"use strict";

module.exports = (sequelize, DataTypes) => {
  const HPLCMethod = sequelize.define(
    "HPLCMethod",
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      columntype: DataTypes.STRING,
      mobilephase: DataTypes.STRING,
      flowrate: DataTypes.STRING,
      elution: DataTypes.STRING,
      temperature: DataTypes.STRING,
      detector: DataTypes.STRING,

      createdAt: {
        type: DataTypes.DATE,
        field: "createdat",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updatedat",
      },
    },
    {
      timestamps: true,
      tableName: "hplcmethods",
    }
  );

  return HPLCMethod;
};
