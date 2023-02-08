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

import { Navbar, Footer, Sidebar, ThemeSettings,  } from "./components";
import {
  Ecommerce,
  Orders,
  Employees,
  Customers,
  AdminImageSection,
  Upload,
  UserRegister,
  ChangePassword,
  UploadEdited
 
} from "./pages";
import axios from "axios";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    users,
    setUsers,
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
  React.useEffect(() => {
    const token = localStorage.getItem("adminToken");
    axios
      .get("https://photuvalatestingserver.onrender.com/admin/admindashboard", {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res);
        setMode(res.data.success);
        function compare(a, b) {
          if (a.lastLogin < b.lastLogin) {
            return -1;
          }
          if (a.lastLogin > b.lastLogin) {
            return 1;
          }
          return 0;
        }

        res.data.users.sort(compare);
        setUsers(res.data.users);
        console.log("dataa", res.data);
      })
      .catch((err) => {
        navigate("/adminlogin");
      });
  }, [toggle]);
  if (mode && mode == true)
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
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && <ThemeSettings />}

              <Routes>
                {/* dashboard  */}
                <Route path="/Home" element={<Ecommerce />} />
                <Route path="/" element={<Navigate to="/AdminApp/Home" replace />} />

                {/* pages  */}
                <Route path="/Users" element={<Orders />} />
                <Route path="/Control Panel" element={<Employees />} />
                <Route path="/Admin" element={<Customers />} />
                <Route path="/AdminImageSection" element={<AdminImageSection />} />
                <Route path="/Upload" element={<Upload />} />
                <Route path="/UserRegister" element={<UserRegister />} />
                <Route path="/ChangePassword" element={<ChangePassword />} />
                <Route path="/UploadEdited" element={<UploadEdited />} />



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
