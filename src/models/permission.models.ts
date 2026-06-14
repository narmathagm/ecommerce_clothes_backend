import { Table, Column, Model, DataType, BelongsToMany } from "sequelize-typescript";
import { Role } from "./role.models";
import { RolePermission } from "./rolePermission.models";

@Table({
    tableName: "permissions",
    timestamps: true,
    createdAt: "created",
    updatedAt: "modified",
})
export class Permission extends Model {
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
    permission_name!: string;

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

    @BelongsToMany(() => Role, () => RolePermission)
    roles!: Role[];
}
