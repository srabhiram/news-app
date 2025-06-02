/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import User from "@/db/models/users.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
const SignupController = async (req: NextRequest) => {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    // validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // check if user already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User Already exists" },
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // sed user details if required
    // const userResponse = {
    //     _id: newUser._id,
    //     name: newUser.name,
    //     email: newUser.email,
    //     createdAt: newUser.createdAt,
    //     updatedAt: newUser.updatedAt,
    // }
    const res = NextResponse;
    return res.json(
      {
        message: "User created succefully",
      },
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
const SigninController = async (req: NextRequest) => {
  try {
    await connectDB();
    const { email, password } = await req.json();

    // validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "All feilds are required" },
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    // CHeck if user exist and password is valid

    const user = await User.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordValid) {
      return NextResponse.json(
        {
          error: "Invalid email or password",
        },
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // set token for user
    const tokenData = {
      id: user._id,
      email: user.email,
      name:user.name,
      password: user.password,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1D",
    });
    const res = NextResponse.json(
      {
        message: "User Signin is successful",
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
    res.cookies.set("userToken", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

const SignoutController = async (req: NextRequest) => {
 try {
    const cookieStore = await cookies();
    
    // Delete the userToken by setting it with an expired date
     cookieStore.set('userToken', '', {
      path: '/',
      expires: new Date(0), // expired date
    });

    return NextResponse.json({
      message: 'Signout success',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server Error' },
      {
        status: 500,
        headers: { 'content-Type': 'application/json' },
      }
    );
  }
};
export { SignupController, SigninController, SignoutController };
