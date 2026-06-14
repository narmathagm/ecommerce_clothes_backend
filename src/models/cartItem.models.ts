import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Cart } from "./cart.models";
import { Product } from "./product.models";

@Table({
    tableName: "cart_items",
    timestamps: true,
    createdAt: "created",
    updatedAt: "modified",
})
export class CartItem extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @ForeignKey(() => Cart)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    cart_id!: number;

    @BelongsTo(() => Cart)
    cart!: Cart;

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    product_id!: number;

    @BelongsTo(() => Product)
    product!: Product;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 1,
    })
    quantity!: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    unit_price!: number;

    @Column({
        type: DataType.TINYINT,
        allowNull: false,
        defaultValue: 1,
    })
    active!: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    created_by!: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    modified_by!: string;
}
