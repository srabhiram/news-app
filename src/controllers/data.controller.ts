/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/db/connectDB";
import News from "@/db/models/news.models";
import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import webPush from 'web-push';
import {PushSubscription} from "@/db/models/pushnotification.models"; // Adjust path to your PushSubscription model

// Configure web-push with VAPID keys
webPush.setVapidDetails(
  process.env.VAPID_SUBJECT!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export const AddNews = async (req: NextRequest) => {
  try {
    await connectDB();
    const body = await req.formData();
    const newsTitle = body.get('newsTitle') as string;
    const content = body.get('content') as string;
    const file = body.get('image') as File;
    const district = body.get('district') as string;
    const author = body.get('author') as string;
    const category = body.get('category') as string;

    // Validate input data
    if (!newsTitle || !content || !author || !file) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Convert image to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'news-images',
            transformation: [
              {
                width: 800,
                height: 600,
                crop: 'limit',
                quality: 'auto',
                fetch_format: 'auto',
              },
              {
                overlay: 'logo_oecpww',
                gravity: 'south_east',
                width: 200,
                opacity: 50,
              },
            ],
          },
          (err: any, result: any) => {
            if (err || !result) return reject(err);
            resolve(result);
          }
        )
        .end(buffer);
    });

    const { secure_url } = uploadResult as { secure_url: string };

    // Create news item
    const addNews = await News.create({
      newsTitle,
      content,
      image: secure_url,
      district,
      category,
      author,
    });

    // Send push notifications to all subscribers
    const subscriptions = await PushSubscription.find(); // Retrieve all subscriptions
    const payload = JSON.stringify({
      title: `${newsTitle}`,
      body: `Click here to read..`,
      icon: secure_url // Use news image or fallback
      url: `/news/${addNews._id}`, // Adjust URL to match your news page route
    });

    await Promise.all(
      subscriptions.map(async (sub) => {
        try {
          await webPush.sendNotification(sub, payload);
        } catch (error:any) {
          console.error(`Failed to send notification to ${sub._id}:`, error);
          // Optionally remove invalid subscriptions
          if (error.statusCode === 410) {
            await PushSubscription.deleteOne({ _id: sub._id });
          }
        }
      })
    );

    return NextResponse.json(
      { addNews },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 }
    );
  }
};

export const EditNews = async (req: NextRequest, newsID: string) => {
  try {
    await connectDB();
    const body = await req.formData();
    const newsTitle = body.get("newsTitle");
    const content = body.get("content");
    const file = body.get("image") as File;
    const district = body.get("district");
    const author = body.get("author");
    const category = body.get("category");

    // delete the existing image from cloudinary
    const article = await News.findById(newsID);
    if (!article) {
      return NextResponse.json(
        {
          message: "News article not found",
        },
        { status: 404 }
      );
    }

    // extract public_id or image url from db
    const imageUrl = article.image;
    const publicIdMatch = imageUrl.match(/\/v\d+\/(.+)\.\w+$/);
    const publicId = publicIdMatch ? publicIdMatch[1] : null;

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    // validate the input data
    if (!newsTitle || !content || !file || !author) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        { status: 404 }
      );
    }
    // convert the image file into bufffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "news-images",
            transformation: [
              {
                width: 800,
                height: 600,
                crop: "limit", // maintain aspect ratio
                quality: "auto", // good quality at lower size
                fetch_format: "auto", // convert to WebP/AVIF for browsers that support it
              },
              {
                overlay: "logo_oecpww", // Replace with your logo's public ID (e.g., watermarks/logo)
                gravity: "south_east", // Position the logo in the bottom-right corner
                width: 200, // Adjust the logo width
                opacity: 50, // Adjust the logo opacity (0-100)
              },
            ],
          },
          (err: any, result: any) => {
            if (err || !result) {
              return reject(err);
            }
            resolve(result);
          }
        )
        .end(buffer);
    });
    const { secure_url } = uploadResult as { secure_url: string };
    const dbResponse = await News.findByIdAndUpdate(
      newsID,
      {
        newsTitle,
        content,
        image: secure_url,
        district,
        category,
        author,
      },
      { new: true }
    );

    if (!dbResponse) {
      return NextResponse.json(
        { message: "News article not found" },
        { status: 404 }
      );
    }
    if (dbResponse) {
      console.log("newsarticle updated");
    }
    return NextResponse.json(
      {
        dbResponse,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occured",
      },
      { status: 500 }
    );
  }
};

export const DeleteNews = async (req: NextRequest, newsId: string) => {
  const res = NextResponse;
  try {
    await connectDB();
    // Find the article to get the image URL
    const article = await News.findById(newsId);
    if (!article) {
      return new Response("News article not found", { status: 404 });
    }

    // Extract public_id from the image URL
    const imageUrl = article.image;
    const publicIdMatch = imageUrl.match(/\/v\d+\/(.+)\.\w+$/);
    const publicId = publicIdMatch ? publicIdMatch[1] : null;

    // Delete article from DB
    await News.findByIdAndDelete(newsId);

    // Delete image from Cloudinary
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    return res.json(
      {
        message: "Article succesfully deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    return res.json(
      {
        error:
          error instanceof Error ? error.message : "AN unkown arror occured",
      },
      { status: 500 }
    );
  }
};

export const GetNews = async () => {
  try {
    await connectDB();

    const news = await News.find({}).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        newsArticles: news,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      error:
        error instanceof Error ? error.message : "An unknown error occured",
    });
  }
};
