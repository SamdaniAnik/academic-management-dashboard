import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js'; // Import Sequelize instance

const Student = sequelize.define('Student', {
    id_students: {
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
    year: {
        type: DataTypes.INTEGER,
        allowNull: true
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
    tableName: 'students', // Explicitly set table name
    timestamps: true, // Enables `createdAt` and `updatedAt` fields
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Student;
