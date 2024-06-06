import connecttodb from "@/app/database";
import { func } from "joi";
import { NextResponse } from "next/server";
import Joi from "joi";
import notes from "@/app/models/notes";

const addnewnotes = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()

})



export async function POST(req) {
    console.log(req);
    try {
        await connecttodb();
        const extractnotesdata = await req.json();
        const newlycreatednotes = await notes.create(extractnotesdata);
        const { title, description } = extractnotesdata;
        const { error } = addnewnotes.validate({ title, description })
        if (error) {
            return NextResponse.json({
                success: false,
                msg: error.details[0].message
            })
        }

        if (newlycreatednotes) {
            console.log("first")
            return NextResponse.json({
                success: true,
                msg: "blog added successsfully"
            })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            msg: "something went wrong mmmmmm"
        })

    }
}