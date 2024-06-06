import connecttodb from "@/app/database";
import Notes from "@/app/models/notes";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connecttodb();
        const extractAllBlogsFromDatabase = await Notes.find({});
        if (extractAllBlogsFromDatabase) {
            return NextResponse.json({
                success: true,
                data: extractAllBlogsFromDatabase,
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong! Please try again later",
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again later",
        });
    }
}