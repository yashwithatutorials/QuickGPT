// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { dummyChats, dummyUserData } from "../assets/assets";
// import axios from 'axios';
// import toast from "react-hot-toast";
// axios.defaults.baseURL=import.meta.env.VITE_SERVER_URL;
// console.log(import.meta.env.VITE_SERVER_URL)

// const AppContext=createContext()
// export const AppContextProvider=({children})=>{
//     const navigate=useNavigate()
//     const [user,setUser]=useState(null);
//     const [chats,setChats]=useState([]);
//     const [selectedchat,setSelectedChat]=useState(null);
//     const [theme,setTheme]=useState(localStorage.getItem('theme')|| 'light');
//     const [token,setToken]=useState(localStorage.getItem('token')||null);
//     const [loadingUser,setLoadingUser]=useState(true);
//     const fetchUser=async ()=>{
//         try{
//         //  const {data} =   await axios.get('/api/user/data',{headers:{Authorization:token}})
//         const { data } = await axios.get('/api/user/data', {
//   headers: { Authorization: `Bearer ${token}` }
// })

//          if(data.success){
//             setUser(data.user)
//          }
//          else{
//             toast.error(data.message)
//          }
//         }
//         catch (error){
//             toast.error(error.message)
//         } finally{
//             setLoadingUser(false)
//         }
//     }
//     const createNewChat=async ()=>{
//         try{
//             if(!user) return toast('Login to create a new chat')
//                 navigate('/')
//             await axios.get('/api/chat/create',{headers:{Authorization:token}})
//             await fetchUsersChat()
//         } catch(error){
//             toast.error(error.message)
//         }
//     }
//     const fetchUsersChat=async ()=>{
//        try{
//         const {data} =await axios.get('/api/chat/get',{headers:{Authorization:token}})
//         if(data.success){
//             setChats(data.chats)
//             if(data.chats.length===0){
//                 await createNewChat()
//                 return fetchUsersChat()
//             } else{
//                 setSelectedChat(data.chats[0])
//             }
//         }
//         else{
//             toast.error(data.message)
//         }
//        } catch(error){
//         toast.error(error.message)
//        }
//     }
//     useEffect(()=>{
//         if(theme=='dark'){
//             document.documentElement.classList.add('dark');
//         }
//         else{
//             document.documentElement.classList.remove('dark');
//         }
//         localStorage.setItem('theme',theme)
//     },[theme])
//     useEffect(()=>{
//         if(user){
//             fetchUsersChat()
//         }
//         else{
//             setChats([])
//             setSelectedChat(null)
//         }
//     },[user])
// // useEffect(()=>{
// //     if(token){
// //         fetchUser();
// //     }
// //     else{
// //         setUser(null)
// //         setLoadingUser(false)
// //     }
    
// // },[token])
// useEffect(() => {
//     const init = async () => {
//         if (token) {
//             setLoadingUser(true);
//             await fetchUser();
//         } else {
//             setUser(null);
//             setLoadingUser(false);
//         }
//     }
//     init();
// }, [token]);

//     const value={
//         navigate,user,setUser,fetchUser,chats,setChats,selectedchat,setSelectedChat,theme,setTheme,createNewChat,loadingUser,fetchUsersChat,token,setToken,axios
//     }
//     return (
//         <AppContext.Provider value={value}>
//             {children}
//         </AppContext.Provider>
//     )
    
// }
// export const useAppContext=()=>useContext(AppContext)
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from "../assets/assets";
import axiosLib from 'axios';
import toast from "react-hot-toast";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loadingUser, setLoadingUser] = useState(true);

  // ✅ Create axios instance with base URL
  const axios = axiosLib.create({
    baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:3000",
  });

  // ✅ Automatically attach token to all requests
  axios.interceptors.request.use((config) => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      config.headers.Authorization = `Bearer ${storedToken}`;
    }
    return config;
  });

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data");
      if (data.success) {
        setUser(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoadingUser(false);
    }
  };

  const createNewChat = async () => {
    try {
      if (!user) return toast("Login to create a new chat");
      navigate("/");
      await axios.get("/api/chat/create");
      await fetchUsersChats();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const fetchUsersChats = async () => {
    try {
      const { data } = await axios.get("/api/chat/get");
      if (data.success) {
        setChats(data.chats);

        // If user has no chats, create one
        if (data.chats.length === 0) {
          await createNewChat();
          return fetchUsersChats();
        } else {
          setSelectedChat(data.chats[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ Theme handler
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ✅ When user changes
  useEffect(() => {
    if (user) {
      fetchUsersChats();
    } else {
      setChats([]);
      setSelectedChat(null);
    }
  }, [user]);

  // ✅ When token changes
  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser(null);
      setLoadingUser(false);
    }
  }, [token]);

  const value = {
    navigate,
    user,
    setUser,
    fetchUser,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    theme,
    setTheme,
    createNewChat,
    loadingUser,
    fetchUsersChats,
    token,
    setToken,
    axios,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
