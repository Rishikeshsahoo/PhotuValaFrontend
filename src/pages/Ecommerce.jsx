import React, { useEffect } from "react";
import { BsBoxSeam, BsCurrencyDollar,BsFillPersonCheckFill } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { Stacked, Button, LineChart, SparkLine } from "../components";

import { useStateContext } from "../contexts/ContextProvider";
import product9 from "../data/product9.jpg";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { FiBarChart } from "react-icons/fi";
import OwlCarousl from "../components/OwlCarousl";

const Ecommerce = () => {
  const { currentColor, users } = useStateContext();
  let totalImages = 0;
  let totalUsers = 0;
  let totalActive = 0;
  let shortlisted = 0;
  let SparklineAreaData=[]
  let recentActive=[];
  let stackedChartData = [
    [],
    []
  ];
  const lineChartData = [
    [],
  
    []
  ];
  users.forEach((item, idx) => {
    totalImages += item.files.length;
    totalUsers++;
    if (item.activeStatus) totalActive++;
    shortlisted += item.shortlisted.length;
    SparklineAreaData.push({name:item.username,x:idx+1,yval:item.shortlisted.length})
    if(idx<5)
    {
      recentActive.push({
      username: item.username,
      activeStatus: (item.activeStatus===1)?"Currently Active":"Deactivated",
      iconColor: (item.activeStatus===0)?"rgb(228, 106, 118)":"rgb(0, 194, 146)",
      iconBg: (item.activeStatus===0)?"rgb(255, 244, 229)":"rgb(235, 250, 242)",
      })
    }
    stackedChartData[0].push({x:item.username,y:item.files.length})
    lineChartData[0].push({x:item.username,y:item.files.length})

    stackedChartData[1].push({x:item.username,y:item.shortlisted.length})
    lineChartData[1].push({x:item.username,y:item.shortlisted.length})

  });



  let earningData = [
    {
      icon: <MdOutlineSupervisorAccount />,
      amount: shortlisted,
      title: "Shortlisted Images",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
      pcColor: "red-600",
    },
    {
      icon: <BsBoxSeam />,
      amount: totalUsers,
      percentage: "+23%",
      title: "Total Users",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "green-600",
    },
    {
      icon: <HiOutlineRefresh />,
      amount: totalActive,
      title: "Active Users",
      iconColor: "rgb(0, 194, 146)",
      iconBg: "rgb(235, 250, 242)",
      pcColor: "red-600",
    },
    {
      icon: <FiBarChart />,
      amount: "1",
      title: "Admin(s)",
      iconColor: "rgb(228, 106, 118)",
      iconBg: "rgb(255, 244, 229)",

      pcColor: "green-600",
    },
  ];
  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="shadow-md bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Total Images</p>
              <p className="text-2xl">{totalImages}</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <BsCurrencyDollar />
            </button>
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="Download"
              borderRadius="10px"
            />
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="shadow-md bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center">
        <div className="shadow-md bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Shortlisted Image Analysis</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Shortlisted</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Total</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className=" border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">{shortlisted}</span>
                 
                </p>
                <p className="text-gray-500 mt-1">Shortlisted Images</p>
              </div>
              <div className="mt-8">
                <p className="text-3xl font-semibold">{totalImages}</p>

                <p className="text-gray-500 mt-1">Total Images</p>
              </div>

              <div className="mt-5">
                <SparkLine
                  currentColor={currentColor}
                  id="line-sparkLine"
                  type="Line"
                  height="80px"
                  width="250px"
                  data={SparklineAreaData}
                  color={currentColor}
                />
              </div>
              <div className="mt-10">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Download Report"
                  borderRadius="10px"
                />
              </div>
            </div>
            <div>
              <Stacked stackedChartData={stackedChartData} width="320px" height="360px" />
            </div>
          </div>
        </div>
        <div>
          <div
            className="shadow-md  rounded-2xl md:w-400 p-4 m-3"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-white text-2xl">Earnings</p>

              <div>
                <p className="text-2xl text-white font-semibold mt-8">
                  Analysis
                </p>
                <p className="text-gray-200">of Shortlisted Images</p>
              </div>
            </div>

            <div className="mt-4">
              <SparkLine
                currentColor={currentColor}
                id="column-sparkLine"
                height="100px"
                type="Column"
                data={SparklineAreaData}
                width="320"
                color="rgb(242, 252, 253)"
              />
            </div>
          </div>

          <div className="shadow-md bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
          

            <div className="w-40">
             
            </div>
          </div>
        </div>
      </div>

      <div className="  flex gap-10 m-4 flex-wrap justify-center">
        <div className="shadow-md bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
          <div className="flex justify-between items-center gap-2">
            <p className="text-xl font-semibold">Recent Logins</p>
          </div>
          <div className=" mt-10 w-72 md:w-400">
            {recentActive.reverse().map((item) => (
              <div key={item.username} className="flex justify-between mt-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    style={{
                      color: item.iconColor,
                      backgroundColor: item.iconBg,
                    }}
                    className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                  >
                    <BsFillPersonCheckFill/>
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.username}</p>
                    <p className="text-sm text-gray-400">{item.activeStatus}</p>
                  </div>
                </div>
              </div>
            ))}


          </div>
          <div className="flex justify-between items-center mt-5 border-t-1 border-color">
            <p className="text-gray-400 text-sm">{recentActive.length} Recent Logins</p>
          </div>
        </div>
        <div className="shadow-md bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Sales Overview</p>
          </div>
          <div className="md:w-full overflow-auto">
            <LineChart lineChartData={lineChartData} />
          </div>
        </div>
      </div>

      <div className=" flex flex-wrap justify-center">
        <div className="w-96 md:w-760 shadow-md bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
        <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Our Users</p>
          </div>
          <OwlCarousl users={users}/>
        </div>

        <div className="w-400 shadow-md bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">About Us</p>
            <button
              type="button"
              className="text-xl font-semibold text-gray-500"
            >
              <IoIosMore />
            </button>
          </div>
          <div className="mt-10">
            <img className="md:w-96 h-50 " src={product9} alt="" />
            <div className="mt-8">
              <p className="font-semibold text-lg">About PhotuVala</p>
              <p className="mt-8 text-sm text-gray-400">
               Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur quos ut possimus nihil nulla expedita illum voluptates quas, est deleniti modi officiis?
              </p>
              <div className="mt-3">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Read More"
                  borderRadius="10px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
