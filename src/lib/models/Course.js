import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js'; // Import Sequelize instance

const Course = sequelize.define('Course', {
    id_courses: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
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
    tableName: 'courses', // Explicitly set table name
    timestamps: true, // Enables `createdAt` and `updatedAt` fields
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Course;
