import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Category } from "./category.models";
import { CartItem } from "./cartItem.models";

@Table({
    tableName: "products",
    timestamps: true,
    createdAt: "created",
    updatedAt: "modified",
})
export class Product extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    title!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description!: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    rate!: number;

    @Column({
        type: DataType.DECIMAL(5, 2),
        allowNull: true,
        defaultValue: 0.00,
    })
    discount!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: 0,
    })
    stock_quantity!: number;

    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    category_id!: number;

    @BelongsTo(() => Category)
    category!: Category;

    @Column({
        type: DataType.STRING(100),
        allowNull: true,
    })
    cloth_type!: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: true,
    })
    image_url!: string;

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

    @HasMany(() => CartItem)
    cartItems!: CartItem[];
}
