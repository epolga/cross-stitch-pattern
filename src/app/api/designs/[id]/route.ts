import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    // Mock design data
    const design = {
        id: params.id,
        title: `Design ${params.id}`,
        description: `Description for design ${params.id}.`,
        photoUrl: "/images/placeholder-design.jpg"
    };
    return NextResponse.json({ design });
}

export async function PUT() {
    return NextResponse.json({ message: "Database not configured" }, { status: 503 });
}

export async function DELETE() {
    return NextResponse.json({ message: "Database not configured" }, { status: 503 });
}