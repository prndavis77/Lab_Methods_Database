"use strict";

module.exports = (sequelize, DataTypes) => {
  const GCMethod = sequelize.define(
    "GCMethod",
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      columntype: DataTypes.STRING,
      sampletype: DataTypes.STRING,
      carriergas: DataTypes.STRING,
      injectiontemperature: DataTypes.STRING,
      flowrate: DataTypes.STRING,
      temperatureprogram: DataTypes.STRING,
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
      tableName: "gcmethods",
    }
  );

  return GCMethod;
};
