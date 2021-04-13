import {DataTypes, Model} from "sequelize"
import {connection} from "../database/connection"

export default class Users extends Model {

  public usr_id!: number
  public usr_name?: string
  public usr_email!: string
  public usr_password!: string
  
  // timestamps!
  public readonly usr_created_at!: Date
  public readonly usr_updated_at!: Date
  public readonly usr_deleted_at ?: Date

}

Users.init({
    usr_id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    comment: 'User ID'
  },
  usr_name: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'User Name'
  },
  usr_email: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'User E-mail'
  },
  usr_password: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'User Password'
  },
  usr_created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  usr_updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  usr_deleted_at: DataTypes.DATE,
}, {
  sequelize: connection,
  tableName: "users",
  paranoid: true,
  timestamps: true,
  createdAt: "usr_created_at",
  updatedAt: "usr_updated_at",
  deletedAt: "usr_deleted_at",
})
