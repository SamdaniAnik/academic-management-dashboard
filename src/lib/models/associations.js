import Student from "./Student";
import Faculty from "./Faculty";
import Course from "./Course";
import FacultyCourse from "./FacultyCourse";
import StudentEnrollment from "./StudentEnrollment";


Faculty.hasMany(FacultyCourse, { foreignKey: "id_faculty", onDelete: "CASCADE" });
FacultyCourse.belongsTo(Faculty, { foreignKey: "id_faculty" });
FacultyCourse.belongsTo(Course, { foreignKey: "id_courses", as: "Course" });
StudentEnrollment.belongsTo(FacultyCourse, { foreignKey: "id_faculty_courses" });
StudentEnrollment.belongsTo(Student, { foreignKey: "id_students" });
Course.hasMany(FacultyCourse, { foreignKey: "id_courses", onDelete: "CASCADE" });
Student.hasMany(StudentEnrollment, { foreignKey: "id_students", onDelete: "CASCADE" });

export {
    Student,
    Faculty,
    Course,
    FacultyCourse,
    StudentEnrollment
}