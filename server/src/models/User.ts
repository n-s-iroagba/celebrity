```typescriptreact file="server/src/models/User.ts"
[v0-no-op-code-block-prefix]import { DataTypes, Model, type Optional, type NonAttribute, type ForeignKey } from "sequelize"
import sequelize from "../config/orm"
import { Role } from "../enums/Role"
import { Fan } from "./Fan"
import { Celebrity } from "./Celebrity"
import { Admin } from "./Admin"

export interface UserAttributes {
id: number
email: string
password?: string | null // Password can be optional for OAuth
role: Role
isEmailVerified: boolean // Changed from isVerified
emailVerificationCode: string | null // For 6-digit code
verificationToken: string | null // For link-based verification
passwordResetToken: string | null
whatsAppNumber: string // Assuming this is still relevant from your existing model
lastLogin?: Date | null

googleId?: string | null
facebookId?: string | null

fanId?: ForeignKey<Fan["id"]> | null
celebrityId?: ForeignKey<Celebrity["id"]> | null
adminId?: ForeignKey<Admin["id"]> | null

fan?: NonAttribute<Fan>
celebrity?: NonAttribute<Celebrity>
admin?: NonAttribute<Admin>
}

export type UserCreationAttributes = Optional<
UserAttributes,
| "id"
| "isEmailVerified"
| "emailVerificationCode"
| "verificationToken"
| "passwordResetToken"
| "lastLogin"
| "password" // Password can be optional for OAuth
| "googleId"
| "facebookId"
| "fanId"
| "celebrityId"
| "adminId"
>

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
public id!: number
public email!: string
public password!: string | null // Will be set by AuthService
public role!: Role
public isEmailVerified!: boolean
public emailVerificationCode!: string | null
public verificationToken!: string | null
public passwordResetToken!: string | null
public whatsAppNumber!: string
public lastLogin?: Date | null

public googleId?: string | null
public facebookId?: string | null

public fanId?: number | null
public celebrityId?: number | null
public adminId?: number | null

public readonly createdAt!: Date
public readonly updatedAt!: Date

public readonly fan?: Fan
public readonly celebrity?: Celebrity
public readonly admin?: Admin
}

User.init(
{
id: {
type: DataTypes.INTEGER,
autoIncrement: true,
primaryKey: true,
},
email: {
type: DataTypes.STRING,
allowNull: false,
unique: true,
validate: {
  isEmail: true,
},
},
password: {
type: DataTypes.STRING,
allowNull: true, // Allow null for OAuth users
},
role: {
type: DataTypes.ENUM(...Object.values(Role)),
allowNull: false,
defaultValue: Role.FAN,
},
isEmailVerified: {
type: DataTypes.BOOLEAN,
defaultValue: false,
},
emailVerificationCode: {
type: DataTypes.STRING,
allowNull: true,
},
verificationToken: {
type: DataTypes.STRING,
allowNull: true,
},
passwordResetToken: {
type: DataTypes.STRING,
allowNull: true,
},
whatsAppNumber: {
type: DataTypes.STRING,
allowNull: false, // Or true if optional during initial signup
},
lastLogin: {
type: DataTypes.DATE,
allowNull: true,
},
googleId: {
type: DataTypes.STRING,
unique: true,
allowNull: true,
},
facebookId: {
type: DataTypes.STRING,
unique: true,
allowNull: true,
},
fanId: {
type: DataTypes.INTEGER,
allowNull: true,
references: { model: "fans", key: "id" },
onDelete: "SET NULL",
onUpdate: "CASCADE",
},
celebrityId: {
type: DataTypes.INTEGER,
allowNull: true,
references: { model: "celebrities", key: "id" },
onDelete: "SET NULL",
onUpdate: "CASCADE",
},
adminId: {
type: DataTypes.INTEGER,
allowNull: true,
references: { model: "admins", key: "id" },
onDelete: "SET NULL",
onUpdate: "CASCADE",
},
},
{
sequelize,
tableName: "users",
defaultScope: {
attributes: {
  exclude: [
    "password",
    "emailVerificationCode",
    "verificationToken",
    "passwordResetToken",
    "googleId",
    "facebookId",
  ],
},
},
scopes: {
withPassword: {
  attributes: { include: ["password"] },
},
withVerification: {
  attributes: { include: ["emailVerificationCode", "verificationToken"] },
},
},
},
)

User.hasOne(Fan, { foreignKey: "userId", as: "fanProfile", onDelete: "CASCADE", onUpdate: "CASCADE" })
Fan.belongsTo(User, { foreignKey: "userId", as: "user" })

User.hasOne(Celebrity, { foreignKey: "userId", as: "celebrityProfile", onDelete: "CASCADE", onUpdate: "CASCADE" })
Celebrity.belongsTo(User, { foreignKey: "userId", as: "user" })

User.hasOne(Admin, { foreignKey: "userId", as: "adminProfile", onDelete: "CASCADE", onUpdate: "CASCADE" })
Admin.belongsTo(User, { foreignKey: "userId", as: "user" })
