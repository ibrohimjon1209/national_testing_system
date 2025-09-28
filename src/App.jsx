import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Subject_list from "./Pages/Subject_list";
import Create_test from "./Pages/Create_test";
import Send_test from "./Pages/Send_test";
import Navbar from "./Pages/Navbar";
import Single_subject from "./Pages/Single_subject";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";

const App = () => {
  const location = useLocation();
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isTelegramWebApp, setIsTelegramWebApp] = useState(false);

  useEffect(() => {
    const checkTelegramWebApp = () => {
      setIsTelegramWebApp(true)
      // if (window.Telegram && window.Telegram.WebApp) {
      //   setIsTelegramWebApp(true);
      //   window.Telegram.WebApp.ready();
      // } else {
      //   setTimeout(() => {
      //     window.location.href = "https://t.me/milliy_test_sertifikat_bot";
      //   }, 5000);
      // }
    };

    const checkUserProfile = () => {
      const profile = localStorage.getItem("userProfile");
      setIsFirstTime(!profile);
    };

    checkTelegramWebApp();
    checkUserProfile();
  }, []);

  useEffect(() => {
    if (isTelegramWebApp && isFirstTime && location.pathname === "/") {
      window.location.replace("/register");
    }
  }, [isFirstTime, location.pathname, isTelegramWebApp]);

  if (!isTelegramWebApp) {
    return (
      <div className="flex flex-col h-screen justify-center items-center bg-[#0f1419] text-white text-center p-10">
        <h1 className="text-2xl font-bold mb-4">
          Bu sayt faqat Telegram Web App uchun
        </h1>
        <p className="mb-6 text-xl">Yo'naltirilmoqda...</p>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a90e2]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-auto justify-between items-center overflow-hidden overflow-y-auto">
      <div className="w-full h-full pb-[130px] bg-[#0f1419] mx-auto flex flex-col items-center justify-between">
        <Routes>
          <Route path="/" element={<Subject_list />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/test/:id" element={<Single_subject />}></Route>
          <Route path="/create_test" element={<Create_test />}></Route>
          <Route path="/send_test" element={<Send_test />}></Route>
          <Route
            path="*"
            element={
              <div className="text-white text-center p-10">404 Not Found</div>
            }
          />
        </Routes>

        <div className=""></div>
      </div>
      <div className="fixed w-full mt-[90vh] ">
        {location.pathname !== "/sign_in" &&
          location.pathname !== "/404" &&
          location.pathname !== "/register" && <Navbar />}
      </div>
    </div>
  );
};

export default App;
