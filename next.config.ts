import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname: "res.cloudinary.com",

      },
      {
        protocol:"https",
        hostname: "qnewsimages.s3.ap-south-1.amazonaws.com"
      }
    ]
  }
};

export default nextConfig;
