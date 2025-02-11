import { NextResponse } from "next/server";
import { Course } from "../../models/__associations";
import { Op } from "sequelize";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;
        const id_courses = searchParams.get("id_courses") || "";
        const name = searchParams.get("name") || "";

        const offset = (page - 1) * limit;

        // Build dynamic where condition
        const whereCondition = {
            ...(id_courses && { id_courses: { [Op.eq]: id_courses } }),
            ...(name && { name: { [Op.like]: `%${name}%` } }),
        };

        const { rows: courses, count } = await Course.findAndCountAll({
            where: whereCondition,
            limit,
            offset,
            order: [["created_at", "DESC"]],
        });

        return NextResponse.json({
            courses,
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
