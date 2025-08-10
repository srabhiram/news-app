import React from "react";

export const Heading = ({ text }: { text: String }) => {
  return (
    <h1 className="text-2xl sm:text-3xl font-telugu font-bold mt-6 ml-2 mb-4">
      <span className="bg-blue-500  p-0.5 mr-1"></span> {text}
    </h1>
  );
};
