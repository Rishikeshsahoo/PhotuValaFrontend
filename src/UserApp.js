import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { UserNavbar,UserSidebar,Footer } from "./components";
import {
 
  UserHome,
  Shortlisted,
  ShortlistNew
 
} from "./pages";
import axios from "axios";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";
import Edited from "./pages/Edited";

const App = () => {
  const [loggedin, setLoggedIn] = React.useState(0);

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    userActiveMenu,
    currentColor,
    setThemeSettings,
    currentUser,
    setCurrentUser,
    toggle
  } = useStateContext();

  const navigate = useNavigate();
  const [mode, setMode] = React.useState(undefined);
  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)
    axios
      .get("https://photuvalatestingserver.onrender.com/users/getprotectedimages", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setCurrentUser(res.data)
        setLoggedIn(1);
      })
      .catch((err) => {
        console.log(err.message)
        navigate("/userlogin");
      });
  }, [toggle]);
  if (loggedin === 1)
    return (
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {userActiveMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <UserSidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <UserSidebar />
            </div>
          )}
          <div
            className={
              userActiveMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <UserNavbar  />
            </div>
            <div>

              <Routes>
                    {/* dashboard  */}
                <Route path="/Home" element={<UserHome />} />
                <Route path="/" element={<Navigate to="/UserApp/Home" replace />} />

                {/* pages  */}
                <Route path="/Shortlisted Images" element={<Shortlisted />} />
                <Route path="/Shortlist New Images" element={<ShortlistNew />} />
                <Route path="/Edited" element={<Edited/>} />


                
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  return <div></div>;
};

export default App;
