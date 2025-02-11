import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

const FacultyCourse = sequelize.define("FacultyCourse", {
    id_faculty_courses: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_faculty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "faculty",
            key: "id_faculty",
        },
        onDelete: "CASCADE",
    },
    id_courses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "courses",
            key: "id_courses",
        },
        onDelete: "CASCADE",
    },
    total_enrollment: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "faculty_courses",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});

export default FacultyCourse;
