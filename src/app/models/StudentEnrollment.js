import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize"; // Your Sequelize instance

const StudentEnrollment = sequelize.define("StudentEnrollment", {
	id_students_enrollment: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	id_faculty_courses: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: "faculty_courses",
			key: "id_faculty_courses",
		},
		onDelete: "CASCADE",
	},
	id_students: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: "students",
			key: "id_students",
		},
		onDelete: "CASCADE",
	},
	gpa: {
		type: DataTypes.DECIMAL(3, 2),
		allowNull: true,
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
	tableName: "students_enrollment",
	timestamps: true,
	createdAt: "created_at",
	updatedAt: "updated_at",
});

export default StudentEnrollment;
