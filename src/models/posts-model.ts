import { sequelize } from "../sequelize.config";
import { DataTypes } from "sequelize";
import { User } from "./user-model";

export const Post = sequelize.define('post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    note: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    }
}, { paranoid: true })

User.hasMany(Post, {
    as: 'UserPosts',
})

Post.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
})
// 
