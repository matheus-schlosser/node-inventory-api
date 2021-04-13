import {DataTypes, Model} from "sequelize"
import {connection} from "../database/connection"

export default class Clients extends Model {

  public cl_id!: number 
  public cl_name!: string
  public cl_responsible?: string
  public cl_phone!: string
  public cl_active!: boolean
  
  // timestamps!
  public readonly cl_created_at!: Date
  public readonly cl_updated_at!: Date
  public readonly cl_deleted_at ?: Date

}

Clients.init({
  cl_id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    comment: 'Client ID'
  },
  cl_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
    comment: 'Client Name'
  },
  cl_responsible: {
    type: DataTypes.STRING(150),
    allowNull: false,
    comment: 'Client Responsible Name'
  },
  cl_phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
    comment: 'Client Phone'
  },
  cl_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: 'Indicates if the client is active or not'
  },
  cl_created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cl_updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cl_deleted_at: DataTypes.DATE,
}, {
  sequelize: connection,
  tableName: "clients",
  paranoid: true,
  timestamps: true,
  createdAt: "cl_created_at",
  updatedAt: "cl_updated_at",
  deletedAt: "cl_deleted_at",
})
