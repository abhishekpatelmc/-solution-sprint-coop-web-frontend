import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Moment from 'react-moment';

import { SlLike, SlDislike } from "react-icons/sl";
import { ImLocation } from "react-icons/im"
import { GiSpiderWeb } from "react-icons/Gi"
import Navbar from "../components/Navbar";
import { Company, Interview } from "../../types";
import Link from "next/link";


const index = () => {

  const [company, setCompany] = useState<Company>();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoadingCompany, setLoadingCompany] = useState<Boolean>(true);
  const [isLoadingInterview, setLoadingInterview] = useState<Boolean>(true);

  const router = useRouter();
  const query = router.query;
  var companyId = query.company_id;

  useEffect(() => {
    /* Check if async query has arrived before calling APIs*/
    if(!companyId) {
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

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/interviews/${companyId}`)
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

  if(isLoadingCompany || isLoadingInterview) {
    return (
      <div
        className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-secondary opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]" 
        role="status">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
        </span>
      </div>
    )
  } else {
    return (
      <div className="bg-[url('../../public/images/back.svg')] bg-no-repeat bg-cover bg-center h-screen">
        <Navbar />
        {/* Main div */}
        <div className="m-5 flex flex-row">
          {/* Left div - also acts a menu */}
          <div className="basis-1/4">
            {/* Inner div with options */}
            <div className="mt-5 flex-col justify-center align-center space-y-4 rounded-xl border-2 p-4">
              <Image
                src={company?.logo_image_url || "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"}
                width={200}
                height={200}
                alt={""}
                className="block ml-auto mr-auto rounded-xl"
              />
              <div className="mt-0 mb-1 text-3xl font-semibold leading-tight text-primary text-center text-violet-800">{company?.company_name}</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex space-x-2 align-center rounded-xl border-2 p-2">
                  <ImLocation className="hover:fill-green-500" />
                  <p className="font-semibold"	>{company?.location}</p>
                </div>
                <div className="flex space-x-2 rounded-xl border-2 p-2">
                  <GiSpiderWeb className="hover:fill-green-500"/>
                  <Link href={company?.website || ""} className="text-violet-800 font-semibold underline">Company Website</Link>
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
                <span className="font-semibold" >Founded:</span> 
                <span>1901</span>
              </div>
            </div>
          </div>
          {/* Middle div */}
          <div className="basis-3/4 space-y-5 p-5">
            {/* Inner div with options */} 
            {interviews.map((interview) => (
              <div key={interview._id} className="flex flex-col rounded-xl bg-white bg-gradient-to-t p-3 text-base text-gray-600 shadow-xl transition duration-300 ease-in-out hover:opacity-90">
                <p><Moment format="D MMMM YYYY" withTitle date={interview.interview_date} /></p>
                <h1 className="text-2xl font-bold tracking-wide">
                  {interview.job_title}<span> Interview</span>
                </h1>
                <p className="text-lg font-semibold mt-2 mb-1">Interview</p>
                <p className="text-md">{interview.review.desc}</p>
                <div>
                  <p className="text-lg font-semibold mt-2 mb-1">Interview Questions</p>
                  <ol>
                    {interview.review.questions.map((question) => <li><p className="text-md">{question}</p></li>)}
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

export default index;
