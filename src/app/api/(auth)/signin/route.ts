import connectDB from "@/db/connectDB";
import User from "@/db/models/users.models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    // setting token
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1D",
    });
    // Prepare user response (exclude password)
    
    const res = NextResponse.json(
      {
        message: "User signed in successfully",
      },
      {
        status: 200,
      }
    );
    res.cookies.set("userToken", token, {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch (error) {
    console.error("Error in signin:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
