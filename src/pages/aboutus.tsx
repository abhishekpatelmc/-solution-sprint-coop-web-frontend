import React from "react";
import Navbar from "./components/Navbar";

const aboutus = () => {
  return (
    <div>
      <Navbar />
      <div>
        <h1 className="mt-4 text-center text-4xl font-bold tracking-wide text-gray-700 antialiased ">
          About Us
        </h1>
        <div className="flex justify-center">
          <div className="mt-10 w-1/2">
            <p className="text-justify">
              Lancer&apos;s View is a review website for the University of
              Windsor students and alumni to share their experiences and
              perspectives about companies and interview insights. The website
              is designed to be a platform for students to share their
              experiences and perspectives about companies and interview
              insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default aboutus;
