import { Optional, Model, DataTypes } from 'sequelize';
import sequelize from '../../../config/connection'; // Asegúrate de que apunta correctamente

export interface IUser {
  user_id: number;
  user_name: string;
  user_secondName: string;
  email: string;
  password: string;
  phone_number: string;
  role:string,
  avatarUrl: string
}

export type UserCreationAttributes = Optional<IUser, 'user_id'>;

export class UserInstance extends Model<IUser, UserCreationAttributes> implements IUser {
  user_id!: number;
  user_name!: string;
  user_secondName!: string;
  email!: string;
  password!: string;
  phone_number!: string;
  role!: string;
  avatarUrl!: string;
}

const User = sequelize.define<UserInstance>('users', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_secondName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING, // admin, usuario, etc.
    defaultValue: 'usuario',
    allowNull: false
  },
  avatarUrl: {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: '/uploads/default-user.png',
},

}, {
  tableName: 'Users',
  timestamps: false
});

export default User;
