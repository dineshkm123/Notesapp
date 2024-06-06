import connecttodb from "@/app/database";
import Notes from "@/app/models/notes";
import { Search } from "lucide-react";
import { connect } from "mongoose";
import { NextResponse } from "next/server";




export async function DELETE(req) {
    try {

        await connecttodb();
        const { searchParams } = new URL(req.url)
        const getcurrentnotesid = searchParams.get('id');
        if (!getcurrentnotesid) {
            return NextResponse.json({
                success: false,
                msg: "notes id in required"
            })
        }
        const deletecurrentnotesbyid = await Notes.findByIdAndDelete(getcurrentnotesid)
        if (deletecurrentnotesbyid) {
            return NextResponse.json({
                success: "true",
                msg: "notes deleted successfully"
            })
        }
        return NextResponse.json({
            success: false,
            msg: 'something went wrng'
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            msg: 'something went wrng'
        })
    }
}