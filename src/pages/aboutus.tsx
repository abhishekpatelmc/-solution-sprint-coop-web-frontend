import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const aboutus = () => {
  return (
    <div className="h-screen scrollbar-hide">
      <Navbar />
      <div>
        <h1 className="mt-8 text-center text-4xl font-bold tracking-wide text-gray-700 antialiased ">
          About Us
        </h1>
        <div className="flex justify-center">
          <div className="mt-10 mb-10 w-1/2 text-justify">
            <p>
              Lancer&apos;s View is a review website created by and for the
              students and alumni of the University of Windsor. Our goal is to
              provide a platform where current and former students can share
              their experiences and perspectives about companies and job
              interview insights.
            </p>
            <br />
            <p>
              We understand that finding a job or internship can be a daunting
              task, especially if you are a student or recent graduate. That is
              why we created Lancer's View, to provide a space where you can
              learn from the experiences of others, gain insight into the
              companies and industries you are interested in, and ultimately
              make better-informed decisions about your career path.
            </p>
            <br />
            <p>
              Our platform allows students and alumni to rate and review
              companies based on factors such as work culture, job
              responsibilities, compensation and benefits, and overall
              experience. Users can also share tips and advice on the job
              application process, interview preparation, and how to succeed in
              the workplace.
            </p>
            <br />
            <p>
              At Lancer's View, we believe in the power of community and the
              value of sharing knowledge. By joining our platform, you become
              part of a supportive and collaborative network of students and
              alumni who are committed to helping each other succeed.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default aboutus;
