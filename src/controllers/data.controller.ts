/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/db/connectDB";
import News from "@/db/models/news.models";
import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

const AddNews = async (req:NextRequest)=>{
    try {
        await connectDB();
        const body = await req.formData();
        const newsTitle = body.get("newsTitle");
        const content = body.get("content");
        const file = body.get("image") as File;
        const district = body.get("district");
        const author = body.get("author");

        // validate the input data
        if(!newsTitle || !content || !author || !file || !district){
            return NextResponse.json({
                error: "All fields are required"
            },{
                status:400
            })
        }

        // convert the image into buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // upload the bufffer stream to cloudinary
        const uploadResult = await new Promise((resolve, reject)=>{
            cloudinary.uploader.upload_stream({
                folder: "news-images",
                transformation:[
                    {
                        width:800,
                        height: 600,
                        crop:"limit",
                        quality:"auto",
                        fetch_format:"auto"
                    }
                ]
            },(err:any, result:any)=>{
                if(err || !result) return reject(err);
                resolve(result);
            }).end(buffer)
        })

        const {secure_url} = uploadResult as {secure_url:string};

        // create a news item
        const addNews = await News.create({
            newsTitle,
            content,
            image: secure_url,
            district,
            author
        });
        return NextResponse.json({
            addNews
        },{
            status:201
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : "An unknown error occurred"
        },{
            status:500
        });
    }
}

export {AddNews}