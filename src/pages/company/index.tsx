import React from "react";
import Navbar from "../components/Navbar";
import { SlLike, SlDislike } from "react-icons/sl";

const index = () => {
  const options = [
    {
      name: "RBC",
      Review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, dolorum, dolores hic, iure culpa obcaecati ad, quae, quidem, voluptatum quas voluptas quibusdam. Quisquam, quod. ",
      like: 0,
      dislike: 0,
    },
    {
      name: "TD",
      Review:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, dolorum, dolores hic, iure culpa obcaecati ad, quae, quidem, voluptatum quas voluptas quibusdam. Quisquam, quod. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa qui architecto soluta obcaecati nam unde facilis aperiam vel voluptates possimus autem ex eos, neque laboriosam consequuntur, at alias voluptatem ipsam.",
      like: 0,
      dislike: 0,
    },
    {
      name: "BMO",
      Review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, dolorum, dolores hic, iure culpa obcaecati ad, quae, quidem, voluptatum quas voluptas quibusdam. Quisquam, quod. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa qui architecto soluta obcaecati nam unde facilis aperiam vel voluptates possimus autem ex eos, neque laboriosam consequuntur, at alias voluptatem ipsam. ",
      like: 0,
      dislike: 0,
    },
  ];

  return (
    <div>
      <Navbar />
      {/* Main div */}
      <div className="m-5 flex flex-row">
        {/* Left div - also acts a menu */}
        <div className="basis-1/4">
          {/* Inner div with options */}
          <div className="mt-5 flex-col space-y-4 rounded-xl border-2 p-4">
            <div className="rounded-xl border-2 p-2">Logo</div>
            <div className="rounded-xl border-2 p-2">Overview</div>
            <div className="rounded-xl border-2 p-2">Reviews</div>
            <div className="rounded-xl border-2 p-2">Intervies</div>
          </div>
        </div>
        {/* Middle div */}
        <div className="basis-1/2 space-y-5 p-5">
          {/* Inner div with options */}
          {options.map((option) => (
            <div key={option.name} className="rounded-xl border-2 p-4">
              <h1 className="text-lg font-medium tracking-wide">
                {option.name}
              </h1>
              <p className="text-sm">{option.Review}</p>
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
        <div className="basis-1/4 "> </div>
      </div>
    </div>
  );
};

export default index;
