import { NextResponse } from "next/server";

export async function GET() {
    // Mock design data
    const designs = [
        {
            id: "1",
            title: "Floral Design",
            description: "A beautiful floral cross-stitch pattern.",
            photoUrl: "https://via.placeholder.com/150"
        },
        {
            id: "2",
            title: "Abstract Art",
            description: "A modern abstract cross-stitch design.",
            photoUrl: "https://via.placeholder.com/150"
        }
    ];
    return NextResponse.json({ designs });
}

export async function POST() {
    return NextResponse.json({ message: "Database not configured" }, { status: 503 });
}