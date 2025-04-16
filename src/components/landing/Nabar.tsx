import React from "react";

export default function Nabar() {
  return (
    <nav>
      <ul className=" bg-gray-800 text-white p-4">
        <div className="flex items-center justify-between space-x-4">
          <li className="text-2xl font-bold font-sans">News</li>
          <li className="font-Gidugu font-bold text-xl text-center bg-gray-50 text-gray-800 rounded-xl px-4 py-1 hover:bg-gray-800 hover:text-white transition duration-300 ease-in-out">
          లాగిన్
          </li>
        </div>
        <div className="flex items-center justify-between space-x-4 mt-4 mx-3 font-PottiSreeramulu font-bold">
          <li className="text-lg sm:text-xl">
            <a href="#home">హోమ్</a>
          </li>
          <li className="text-lg sm:text-xl">
            <a href="#about">About</a>
          </li>
          <li className="text-lg sm:text-xl">
            <a href="#services">Services</a>
          </li>
          <li className="text-lg sm:text-xl">
            <a href="#contact">Contact</a>
          </li>
        </div>
      </ul>
    </nav>
  );
}
