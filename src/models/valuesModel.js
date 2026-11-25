const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Leitura = sequelize.define('Leituras', {
    temperatura: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    umidade: {
        type: DataTypes.FLOAT,
        allowNull: false
    },   
}, {
    tableName: "Leituras",
    timestamps: true
});

Leitura.sync();

module.exports = Leitura;