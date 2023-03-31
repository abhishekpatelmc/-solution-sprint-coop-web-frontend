import React, { useEffect, useState } from "react";
import Image from "next/image";
import Moment from "react-moment";
import { SlLike, SlDislike } from "react-icons/sl";
import { ImLocation } from "react-icons/im";
import { BiWorld } from "react-icons/bi";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import Navbar from "../components/Navbar";
import type { Company, Critique, Interview, Job } from "../../types";
import Link from "next/link";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../../authConfig";
import { toast } from "react-toastify";
import { signInClickHandler } from "../api/auth/auth";
import { useMsal } from "@azure/msal-react";
import { useRouter } from "next/router";
import PaginationButtons from "../components/PaginationButtons";

const Index = () => {
  /* Main API data states*/
  const [company, setCompany] = useState<Company | undefined>();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [topJobs, setTopJobs] = useState<Job[]>([]);
  const [critiques, setCritiques] = useState<Critique[]>([]);

  /* Load Check Complete States*/
  const [isLoadingCompany, setLoadingCompany] = useState<boolean>(true);
  const [isLoadingInterview, setLoadingInterview] = useState<boolean>(true);
  const [isLoadingCritique, setLoadingCritique] = useState<boolean>(true);
  const [isLoadingJob, setLoadingJob] = useState<boolean>(true);

  /* Searching and Filtering States*/
  const [interviewClicked, setInterviewClicked] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [jobFieldFilter, setJobFieldFilter] = useState<string>("");

  /* Router parameters*/
  const router = useRouter();
  const query = router.query;
  const companyId = query.company_id as string;

  /* Authentication */
  const msalInstance = new PublicClientApplication(msalConfig);
  const accounts = msalInstance.getAllAccounts();
  const { instance } = useMsal();
  
  /* Pagination */
  const [itemInterviewOffset, setInterviewItemOffset] = useState<number>(0);
  const [itemCritiqueOffset, setCritiqueItemOffset] = useState<number>(0);

  const itemsPerPage = 5;

  const handleInterviewPageClick = (event: { selected: number; }): number => {
    const newOffset = (event.selected * itemsPerPage) % interviews.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setInterviewItemOffset(newOffset);
    return 1;
  };

  const handleCritiquePageClick = (event: { selected: number; }): number => {
    const newOffset = (event.selected * itemsPerPage) % critiques.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setCritiqueItemOffset(newOffset);
    return 1;
  };

  const pageInterviewCount = Math.ceil(interviews.length / itemsPerPage);
  const pageCritiqueCount = Math.ceil(critiques.length / itemsPerPage);

  useEffect(() => {
    async function fetchData() {
      console.log("Acc Node ::", accounts, accounts.length);
      if (!accounts || accounts.length === 0) {
        toast("Please Sign In First", {
          hideProgressBar: true,
          autoClose: 4000,
          type: "success",
        });
        try {
          signInClickHandler(instance);
          await router.replace("/");
        } catch (error) {
          console.log(error);
        }
      }
      if (!companyId) {
        return;
      }

      if (process.env.NEXT_PUBLIC_BACKEND_URL !== undefined) {
        try {
          const companyRes = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/company/${companyId}`
          );
          const companyData = (await companyRes.json()) as Company;
          setCompany(companyData);
          setLoadingCompany(false);
        } catch (err) {
          console.log(err);
        }

        try {
          const interviewsRes = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/interviews/${companyId}`
          );
          const interviewsData = (await interviewsRes.json()) as Interview[];
          setInterviews(interviewsData);
          setLoadingInterview(false);
        } catch (err) {
          console.log(err);
        }

        try {
          const topJobsRes = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/top/${companyId}`
          );
          const topJobsData = (await topJobsRes.json()) as Job[];
          setTopJobs(topJobsData);
          setLoadingJob(false);
        } catch (err) {
          console.log(err);
        }

        try {
          const critiqueRes = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/critiques/${companyId}`
          );
          const critiqueData = (await critiqueRes.json()) as Critique[];
          setCritiques(critiqueData);
          setLoadingCritique(false);
        } catch(err) {
          console.log(err);
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
  }, [companyId, instance, router, accounts]);

  if (isLoadingCompany || isLoadingInterview || isLoadingJob || isLoadingCritique) {
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
                <div className="flex items-center space-x-2 rounded-xl border-2 p-2">
                  <ImLocation size={28} className="hover:fill-green-500" />
                  <p className="font-semibold">{company?.location}</p>
                </div>
                <div className="flex items-center space-x-2 rounded-xl border-2 p-2">
                  <BiWorld size={28} className="hover:fill-green-500" />
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
                <span>{company?.company_size} Employees</span>
              </div>
              <div className="flex space-x-2 rounded-xl border-2 p-2">
                <span className="font-semibold">Industry:</span>
                <span>{company?.industry}</span>
              </div>
              <div className="flex space-x-2 rounded-xl border-2 p-2">
                <span className="font-semibold">Type:</span>
                <span>{company?.company_type}</span>
              </div>
              <div className="flex space-x-2 rounded-xl border-2 p-2">
                <span className="font-semibold">Founded:</span>
                <span>{company?.company_founded}</span>
              </div>
            </div>

            <div className="align-center mt-5 flex-col justify-center space-y-4 rounded-xl border-2 p-4">
              <div className="text-primary mt-0 mb-1 text-center text-2xl font-semibold leading-tight">
                Current Openings
              </div>
              {topJobs.map((job) => {
                return (
                  <Link
                    key={job._id}
                    href={job?.job_link || ""}
                    className="flex justify-between rounded-xl border-2 p-2"
                  >
                    <span className="font-semibold text-violet-800 underline">
                      {job.job_title}
                    </span>
                    <span>{job.term}</span>
                  </Link>
                );
              })}
              <div>
                <Link
                  href={""}
                  className="flex justify-center rounded-xl p-2 font-semibold text-violet-800 underline"
                >
                  <span>View more jobs...</span>
                </Link>
              </div>
            </div>
          </div>
          {/* Middle div */}
          <div className="basis-3/4 space-y-5 p-5">
            <div className="inline-flex">
              <button onClick={()=> {setInterviewClicked(true)}} className="bg-gray-300 hover:bg-gray-200 text-gray-800 font-bold py-2 px-5 rounded-l focus:bg-gray-400">
                Interviews
              </button>
              <button onClick={() => {setInterviewClicked(false)}}  className="bg-gray-300 hover:bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-r focus:bg-gray-400">
                Reviews
              </button>
              <input
                className="h-10 w-96 border border-gray-700 rounded-lg mx-10 px-2 py-1 text-center text-base"
                placeholder="Search Job Titles"
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
              />
              <select onChange={(e) => setJobFieldFilter(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-100 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected value="">All Fields</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Finance">Finance</option>
                <option value="Accounting">Accounting</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
                <option value="Education">Education</option>
                <option value="Biology">Biology</option>
                <option value="Electronics">Electronics</option>
                <option value="Psycology">Psycology</option>
              </select>
            </div>
            {/* Inner div with options */}
            {/* Conditional render */}
      
            { interviewClicked ? 
            interviews
            .filter((filtered) => {
              return jobFieldFilter ? filtered.job_field === jobFieldFilter: filtered && filtered.job_title.toLowerCase().includes(searchQuery) 
            })
            .slice(itemInterviewOffset, itemInterviewOffset + itemsPerPage)
            .map((interview) => (
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
                        <span className="flex gap-1">
                          <AiFillCheckCircle
                            className="fill-green-500"
                            size={24}
                          />
                          <span className="font-normal text-gray-500 ">
                            {" "}
                            Received Offer
                          </span>
                        </span>
                      ) : (
                        <span className="flex gap-1">
                          <AiFillCloseCircle
                            size={22}
                            className="fill-red-500"
                          />
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
                        <span className="flex gap-1">
                          <BsCircleFill className="fill-green-500" size={20} />
                          <span className="font-normal text-gray-500 ">
                            Positive Experience
                          </span>
                        </span>
                      ) : (
                        <span className="flex gap-1">
                          <BsCircleFill size={20} className="fill-red-500" />
                          <span className="font-normal text-gray-500 ">
                            Negative Experience
                          </span>
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-500"
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
            )) 
            : 
            //Second condition to render critiques
            critiques
            .filter((filtered) =>
                filtered.job_title.toLowerCase().includes(searchQuery))
            .slice(itemCritiqueOffset, itemCritiqueOffset + itemsPerPage)
            .map((critique) => (
              <div
                key={critique._id}
                className="flex flex-col rounded-xl bg-white bg-gradient-to-t p-3 text-base text-gray-600 shadow-xl transition duration-300 ease-in-out hover:opacity-90"
              >
                <p>
                  <Moment
                    format="D MMMM YYYY"
                    withTitle
                    date={critique.created_date}
                  />
                </p>
                <h1 className="text-2xl font-bold tracking-wide">
                  {critique.job_title}
                  <span> Review</span>
                </h1>
                <div className="flex space-x-5">
                  <div className="flex items-center">
                    <p className="ml-1 font-bold text-gray-600">
                      {critique.months_length} months long
                    </p>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <p className="ml-1 font-bold text-gray-600">
                      {critique?.rating}
                      <span className="font-normal text-gray-500">
                        /10 rating
                      </span>
                    </p>
                  </div>
                </div>
                <p className="mt-2 mb-1 text-lg font-semibold">Job Experience</p>
                <p className="text-md">{critique.review.desc}</p>
                <div>
                  <p className="mt-2 mb-1 text-lg font-semibold">
                    Pros
                  </p>
                  <ol>
                    {critique.review.pros.map((pro, index) => (
                      <li key={index}>
                        <p className="text-md">{pro}</p>
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <p className="mt-2 mb-1 text-lg font-semibold">
                    Cons
                  </p>
                  <ol>
                    {critique.review.cons.map((con, index) => (
                      <li key={index}>
                        <p className="text-md">{con}</p>
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
            { interviewClicked ? 
              <PaginationButtons handlePageClick={handleInterviewPageClick} pageCount={pageInterviewCount} /> 
              :
              <PaginationButtons handlePageClick={handleCritiquePageClick} pageCount={pageCritiqueCount} /> }
          </div>
          {/* Right div */}
        </div>
      </div>
    );
  }
};

export default Index;
