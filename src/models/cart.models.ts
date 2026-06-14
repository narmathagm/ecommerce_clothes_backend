import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "./user.models";
import { CartItem } from "./cartItem.models";

@Table({
    tableName: "carts",
    timestamps: true,
    createdAt: "created",
    updatedAt: "modified",
})
export class Cart extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    user_id!: number;

    @BelongsTo(() => User)
    user!: User;

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
