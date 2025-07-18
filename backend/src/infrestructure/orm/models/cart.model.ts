import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../config/connection';
export class Cotizacion extends Model {}

Cotizacion.init({
  cotizacion_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alto: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ancho: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descuento: {
    type: DataTypes.FLOAT,
    defaultValue: 0,  // % de descuento, ej: 10 = 10%
  },
  precio_total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'cotizacion',
  tableName: 'cotizaciones',
  timestamps: false,
});
