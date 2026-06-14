import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Product } from "./product.models";

@Table({
    tableName: "categories",
    timestamps: true,
    createdAt: "created",
    updatedAt: "modified",
})
export class Category extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        unique: true,
    })
    category_name!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description!: string;

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

    @HasMany(() => Product)
    products!: Product[];
}
