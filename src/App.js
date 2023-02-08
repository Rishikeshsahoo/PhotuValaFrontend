import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminApp from "./AdminApp"
import UserApp from "./UserApp"
import "./App.css";
import AdminLogin from "./pages/AdminLogin";
import {UserLogin} from "./pages"
const App = () => {
  
  return (
    <div >
      <BrowserRouter>
        <Routes>

          {/* Home */}
          <Route path="/PhotuValaFrontend" element={<AdminLogin />} />


          {/* Logins */}
          <Route path="/PhotuValaFrontend/adminlogin" element={<AdminLogin />} />
          <Route path="PhotuValaFrontend/userlogin" element={<UserLogin />} />

          {/* Admin  */}
          <Route path="/PhotuValaFrontend/AdminApp/*" element={<AdminApp />} />

          {/* User  */}
          <Route path="/PhotuValaFrontend/UserApp/*" element={<UserApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
