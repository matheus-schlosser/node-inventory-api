import {DataTypes, Model} from "sequelize"
import {connection} from "../database/connection"
import Clients from "./Clients"
import Products from "./Products"

export default class Orders extends Model {

  public ord_id!: number
  public ord_cl_id!: number
  public ord_pdt_id!: number  
  public ord_quantity!: number
  public ord_description!: string
  public ord_status!: boolean
  
  // timestamps!
  public readonly ord_created_at!: Date
  public readonly ord_updated_at!: Date
  public readonly ord_deleted_at ?: Date

}

Orders.init({
  ord_id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    comment: 'Order ID'
  },
  ord_cl_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    comment: 'Foreign Key that indicates the client order'
  },
  ord_pdt_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    comment: 'Foreign Key that indicates the product'
  },
  ord_quantity: {
    type: DataTypes.STRING(6),
    allowNull: false,
    comment: 'Order Quantity'
  },
  ord_description: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Order Description'
  },
  ord_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: 'Order Status'
  },
  ord_created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ord_updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ord_deleted_at: DataTypes.DATE,
}, {
  sequelize: connection,
  tableName: "orders",
  paranoid: true,
  timestamps: true,
  createdAt: "ord_created_at",
  updatedAt: "ord_updated_at",
  deletedAt: "ord_deleted_at",
})

Orders.belongsTo(Clients, {
  as: 'client',
  foreignKey: 'ord_cl_id'
}),

Orders.belongsTo(Products, {
  as: 'product',
  foreignKey: 'ord_pdt_id'
})