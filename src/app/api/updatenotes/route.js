import connecttodb from "@/app/database";
import Notes from "@/app/models/notes";
import Joi from "joi";
import { NextResponse } from "next/server";
const Editnotes = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()

})

export async function PUT(req) {
    try {
        await connecttodb();
        const { searchParams } = new URL(req.url);
        const getcurrentnotesid = searchParams.get("id");
        const { title, description } = await req.json()
        const { error } = Editnotes.validate({ title, description })
        if (error) {
            return NextResponse.json({
                success: false,
                msg: error.details[0].message
            })
        }

        if (!getcurrentnotesid) {
            return NextResponse.json({
                success: false,
                msg: error.details[0].message,
            })

        }
        const updatenotesbyid = await Notes.findOneAndUpdate({
            _id: getcurrentnotesid
        }, { title, description }, { new: true })
        if (updatenotesbyid) {
            return NextResponse.json({
                success: true,
                msg: 'notes is updated successfully'
            })
        }
        else {
            return NextResponse.json({
                success: false,
                msg: 'something went wrng'
            })
        }


    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            msg: 'something went wrng'
        })
    }
}