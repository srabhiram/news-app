import mongoose, { Schema, Document } from "mongoose";
// Define the News interface
export interface NewsModel extends Document {
  newsTitle: string;
  content: string;
  image: string;
  district: string;
  author: string;
  comments: string[];
  likes: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const newsSchema: Schema = new Schema(
  {
    newsTitle: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    district: { type: String, required: true },
    author: { type: String, required: true },
    comments: { type: [String], default: [] },
    likes: { type: Number, default: 0 }, // Updated from String[] to Number
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);


// Create the News model
const News =
  mongoose.models.News || mongoose.model<NewsModel>("News", newsSchema);
// Export the News model
export default News;
