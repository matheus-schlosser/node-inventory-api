import {DataTypes, Model} from "sequelize"
import {connection} from "../database/connection"

export default class Categories extends Model {

  public cat_id!: number 
  public cat_name!: string
  public cat_image!: string
  
  // timestamps!
  public readonly cat_created_at!: Date
  public readonly cat_updated_at!: Date
  public readonly cat_deleted_at ?: Date

}

Categories.init({
  cat_id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    comment: 'Category ID'
  },
  cat_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Category Name'
  },
  cat_image: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Category Image Link'
  },
  cat_created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cat_updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cat_deleted_at: DataTypes.DATE,
}, {
  sequelize: connection,
  tableName: "categories",
  paranoid: true,
  timestamps: true,
  createdAt: "cat_created_at",
  updatedAt: "cat_updated_at",
  deletedAt: "cat_deleted_at",
})
