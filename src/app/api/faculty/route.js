import { NextResponse } from "next/server";
import { Faculty } from "../../models/__associations";
import { Op } from "sequelize";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;
        const id_faculty = searchParams.get("id_faculty") || "";
        const name = searchParams.get("name") || "";
        const email = searchParams.get("email") || "";

        const offset = (page - 1) * limit;

        const whereCondition = {
            ...(id_faculty && { id_faculty: { [Op.eq]: id_faculty } }),
            ...(name && { name: { [Op.like]: `%${name}%` } }),
            ...(email && { email: { [Op.like]: `%${email}%` } }),
        };

        const { rows: faculty, count } = await Faculty.findAndCountAll({
            where: whereCondition,
            limit,
            offset,
            order: [["created_at", "DESC"]],
        });

        return NextResponse.json({
            faculty,
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
