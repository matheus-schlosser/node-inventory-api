import {DataTypes, Model} from "sequelize"
import {connection} from "../database/connection"
import Categories from "./Categories"

export default class Products extends Model {

  public pdt_id!: number
  public pdt_cat_id!: number 
  public pdt_name!: string
  public pdt_image!: string
  
  // timestamps!
  public readonly pdt_created_at!: Date
  public readonly pdt_updated_at!: Date
  public readonly pdt_deleted_at ?: Date

}

Products.init({
  pdt_id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    comment: 'Product ID'
  },
  pdt_cat_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pdt_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Product Name'
  },
  pdt_image: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Product Image Link'
  },
  pdt_price: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pdt_created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  pdt_updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  pdt_deleted_at: DataTypes.DATE,
}, {
  sequelize: connection,
  tableName: "products",
  paranoid: true,
  timestamps: true,
  createdAt: "pdt_created_at",
  updatedAt: "pdt_updated_at",
  deletedAt: "pdt_deleted_at",
})

Products.belongsTo(Categories, {
  as: 'product',
  foreignKey: 'pdt_cat_id'
})