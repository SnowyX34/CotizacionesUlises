"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cotizacion = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../config/connection"));
class Cotizacion extends sequelize_1.Model {
}
exports.Cotizacion = Cotizacion;
Cotizacion.init({
    cotizacion_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    modelo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    alto: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    ancho: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    color: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    descuento: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0, // % de descuento, ej: 10 = 10%
    },
    precio_total: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    }
}, {
    sequelize: connection_1.default,
    modelName: 'cotizacion',
    tableName: 'cotizaciones',
    timestamps: false,
});
