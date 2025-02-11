import { NextResponse } from "next/server";
import { Student } from "../../models/__associations";
import { Op } from "sequelize";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;
        const id_students = searchParams.get("id_students") || "";
        const name = searchParams.get("name") || "";
        const email = searchParams.get("email") || "";
        const year = searchParams.get("year") || "";

        const offset = (page - 1) * limit;

        const whereCondition = {
            ...(id_students && { id_students: { [Op.eq]: id_students } }),
            ...(name && { name: { [Op.like]: `%${name}%` } }),
            ...(email && { email: { [Op.like]: `%${email}%` } }),
            ...(year && { year: { [Op.eq]: year } }),
        };

        const { rows: students, count } = await Student.findAndCountAll({
            where: whereCondition,
            limit,
            offset,
            order: [["created_at", "DESC"]],
        });

        return NextResponse.json({
            students,
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
