import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Moment from "react-moment";

import { SlLike, SlDislike } from "react-icons/sl";
import { ImLocation, ImCross } from "react-icons/im";
import { GiSpiderWeb } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import { BsCircleFill } from "react-icons/bs";
import Navbar from "../components/Navbar";
import type { Company, Interview } from "../../types";
import Link from "next/link";

const Index = () => {
  const [company, setCompany] = useState<Company>();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoadingCompany, setLoadingCompany] = useState<boolean>(true);
  const [isLoadingInterview, setLoadingInterview] = useState<boolean>(true);

  const router = useRouter();
  const query = router.query;
  const companyId = query.company_id as string;

  useEffect(() => {
    /* Check if async query has arrived before calling APIs*/
    if (!companyId) {
      return;
    }

    if (process.env.NEXT_PUBLIC_BACKEND_URL !== undefined) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/company/${companyId}`)
        .then((res) => res.json())
        .then((data: Company) => {
          setCompany(data);
          setLoadingCompany(false);
        })
        .catch((err) => {
          console.log(err);
        });

      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/interviews/${companyId}`
      )
        .then((res) => res.json())
        .then((data: Interview[]) => {
          setInterviews(data);
          setLoadingInterview(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [companyId]);

  if (isLoadingCompany || isLoadingInterview) {
    return (
      <div
        className="text-secondary inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    );
  } else {
    return (
      <div className="h-screen bg-[url('../../public/images/back.svg')] bg-cover bg-center bg-no-repeat">
        <Navbar />
        {/* Main div */}
        <div className="m-5 flex flex-row">
          {/* Left div - also acts a menu */}
          <div className="basis-1/4">
            {/* Inner div with options */}
            <div className="align-center mt-5 flex-col justify-center space-y-4 rounded-xl border-2 p-4">
              <Image
                src={
                  company?.logo_image_url ||
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
                }
                width={200}
                height={200}
                alt={""}
                className="ml-auto mr-auto block rounded-xl"
              />
              <div className="text-primary mt-0 mb-1 text-center text-3xl font-semibold leading-tight text-violet-800">
                {company?.company_name}
              </div>
              <div className="flex space-x-5">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <p className="ml-1 text-sm font-bold text-gray-600">
                    {company?.acceptance_rate}
                    <span className="font-normal text-gray-500">
                      ({company?.review_count} reviews)
                    </span>
                  </p>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <p className="ml-1 text-sm font-bold text-gray-600">
                    {company?.acceptance_rate}
                    <span className="font-normal text-gray-500">
                      ({company?.interview_count} interviews)
                    </span>
                  </p>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <p className="ml-1 text-sm font-bold text-gray-600">
                    {company?.acceptance_rate}
                    <span className="font-normal text-gray-500">
                      ({company?.review_count} reviews)
                    </span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="align-center flex space-x-2 rounded-xl border-2 p-2">
                  <ImLocation className="hover:fill-green-500" />
                  <p className="font-semibold">{company?.location}</p>
                </div>
                <div className="flex space-x-2 rounded-xl border-2 p-2">
                  <GiSpiderWeb className="hover:fill-green-500" />
                  <Link
                    href={company?.website || ""}
                    className="font-semibold text-violet-800 underline"
                  >
                    Company Website
                  </Link>
                </div>
              </div>
              <div className="flex space-x-2 rounded-xl border-2 p-2">
                <span className="font-semibold">Size:</span>
                <span>10000+ Employees</span>
              </div>
              <div className="flex space-x-2 rounded-xl border-2 p-2">
                <span className="font-semibold">Industry:</span>
                <span>Mobile Technology</span>
              </div>
              <div className="flex space-x-2 rounded-xl border-2 p-2">
                <span className="font-semibold">Type:</span>
                <span>Company - Public (CM)</span>
              </div>
              <div className="flex space-x-2 rounded-xl border-2 p-2">
                <span className="font-semibold">Founded:</span>
                <span>1901</span>
              </div>
            </div>
          </div>
          {/* Middle div */}
          <div className="basis-3/4 space-y-5 p-5">
            {/* Inner div with options */}
            {interviews.map((interview) => (
              <div
                key={interview._id}
                className="flex flex-col rounded-xl bg-white bg-gradient-to-t p-3 text-base text-gray-600 shadow-xl transition duration-300 ease-in-out hover:opacity-90"
              >
                <p>
                  <Moment
                    format="D MMMM YYYY"
                    withTitle
                    date={interview.interview_date}
                  />
                </p>
                <h1 className="text-2xl font-bold tracking-wide">
                  {interview.job_title}
                  <span> Interview</span>
                </h1>
                <div className="flex space-x-5">
                  <div className="flex items-center">
                    <p className="ml-1 font-bold text-gray-600">
                      {interview?.job_offer_flag == true ? (
                        <span className="flex">
                          <TiTick className="fill-green-500" size={42} />
                          <span className="font-normal text-gray-500 ">
                            {" "}
                            Received Offer
                          </span>
                        </span>
                      ) : (
                        <span className="flex">
                          <ImCross className="fill-red-500" />
                          <span className="font-normal text-gray-500 ">
                            {" "}
                            No Offer
                          </span>
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="ml-1 font-bold text-gray-600">
                      {interview?.positive_flag == true ? (
                        <span className="flex">
                          <BsCircleFill className="fill-green-500" size={26} />
                          <span className="font-normal text-gray-500 ">
                            {" "}
                            Positive Experience
                          </span>
                        </span>
                      ) : (
                        <span className="flex">
                          <BsCircleFill className="fill-red-500" />
                          <span className="font-normal text-gray-500 ">
                            {" "}
                            Negative Experience
                          </span>
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <p className="ml-1 font-bold text-gray-600">
                      {interview?.difficulty_rating}
                      <span className="font-normal text-gray-500">
                        /10 difficulty rating
                      </span>
                    </p>
                  </div>
                </div>
                <p className="mt-2 mb-1 text-lg font-semibold">Interview</p>
                <p className="text-md">{interview.review.desc}</p>
                <div>
                  <p className="mt-2 mb-1 text-lg font-semibold">
                    Interview Questions
                  </p>
                  <ol>
                    {interview.review.questions.map((question, index) => (
                      <li key={index}>
                        <p className="text-md">{question}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* like and dislike button */}
                <div className="mt-4 flex items-end space-x-5 text-lg ">
                  {/* text-orange-400 bg-red-600 hover:text-orange-600 hover:bg-red-400 */}
                  <div className="flex space-x-2">
                    <SlLike className="hover:fill-green-500" />
                    {/* <p>{option.like}</p> */}
                  </div>
                  <div className="flex space-x-2">
                    <SlDislike className=" hover:fill-red-500" />{" "}
                    {/* <p>{option.dislike}</p> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Right div */}
        </div>
      </div>
    );
  }
};

export default Index;
