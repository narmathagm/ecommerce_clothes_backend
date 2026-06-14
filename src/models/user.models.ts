import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasOne } from "sequelize-typescript";
import { Role } from "./role.models";
import { Cart } from "./cart.models";

@Table({
    tableName: "users",
    timestamps: true,
    createdAt: "created",
    updatedAt: "modified",
})
export class User extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        field: 'full_name',
        type: DataType.STRING(100),
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        unique: true,
    })
    email!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    phone!: string;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    role_id!: number;

    @BelongsTo(() => Role)
    role!: Role;

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

    @HasOne(() => Cart)
    cart!: Cart;
}
