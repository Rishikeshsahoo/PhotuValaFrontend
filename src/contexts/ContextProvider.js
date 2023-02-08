import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [users,setUsers]=useState([])
  const [toggle,setToggle]=useState(1)
  const [userActiveMenu,setUserActiveMenu]=useState(true)
  const [currentUser,setCurrentUser]=useState(null)

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };
  const handleUserLogout=()=>{
    setCurrentUser(null)
    localStorage.removeItem("token")
    setToggle(prev=>(prev+1)%2)
  }
  const handleAdminLogout=()=>{
    // setCurrentUser(null)
    localStorage.removeItem("adminToken")
    setToggle(prev=>(prev+1)%2)

  }
  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{ currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings,users,setUsers,toggle,setToggle,userActiveMenu,setUserActiveMenu,currentUser,setCurrentUser, handleUserLogout,handleAdminLogout }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
