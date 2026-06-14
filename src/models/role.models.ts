import { Table, Column, Model, DataType, HasMany, BelongsToMany } from "sequelize-typescript";
import { User } from "./user.models";
import { Permission } from "./permission.models";
import { RolePermission } from "./rolePermission.models";

@Table({
    tableName: "roles",
    timestamps: true,
    createdAt: "created",
    updatedAt: "modified",
})
export class Role extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true,
    })
    role_name!: string;

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

    @HasMany(() => User)
    users!: User[];

    @BelongsToMany(() => Permission, () => RolePermission)
    permissions!: Permission[];
}
