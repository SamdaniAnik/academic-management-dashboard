import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js'; // Import Sequelize instance

const Faculty = sequelize.define('Faculty', {
    id_faculty: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            isEmail: true
        }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'faculty', // Explicitly set table name
    timestamps: true, // Enables `createdAt` and `updatedAt` fields
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Faculty;
