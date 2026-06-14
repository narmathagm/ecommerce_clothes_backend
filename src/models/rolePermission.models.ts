import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { Role } from "./role.models";
import { Permission } from "./permission.models";

@Table({
    tableName: "role_permissions",
    timestamps: false,
})
export class RolePermission extends Model {
    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
    })
    role_id!: number;

    @ForeignKey(() => Permission)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
    })
    permission_id!: number;
}
