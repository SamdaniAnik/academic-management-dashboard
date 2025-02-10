import { Student } from '../../models/__associations';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const students = await Student.findAll();
        return NextResponse.json(students, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
