import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route,HashRouter } from "react-router-dom";
import AdminApp from "./AdminApp"
import UserApp from "./UserApp"
import "./App.css";
import AdminLogin from "./pages/AdminLogin";
import {UserLogin} from "./pages"
const App = () => {
  
  return (
    <div >
      <BrowserRouter basename='/PhotuValaFrontend'>
        <Routes>

          {/* Home */}
          <Route path="/" element={<AdminLogin />} />


          {/* Logins */}
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/userlogin" element={<UserLogin />} />

          {/* Admin  */}
          <Route path="/AdminApp/*" element={<AdminApp />} />

          {/* User  */}
          <Route path="/UserApp/*" element={<UserApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
