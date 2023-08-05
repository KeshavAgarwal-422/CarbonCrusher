import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Introduction from "./pages/Introduction";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Redemption from "./pages/Redemption";
import { IoHome, IoNotificationsSharp, IoPersonSharp, IoPricetagsSharp, IoWalletSharp } from "react-icons/io5"
import Notifications from "./pages/Notifications";
import Wallet from "./pages/Wallet";
import SensorComponent from "./Components/SensorComponent";
import BasicDetails from "./pages/BasicDetails";


function App() {
  const action = useNavigationType();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { name: 'home', icon: <IoHome></IoHome> },
    { name: 'Redeem', icon: <IoPricetagsSharp></IoPricetagsSharp> },
    { name: 'notifications', icon: <IoNotificationsSharp></IoNotificationsSharp> },
    { name: 'profile', icon: <IoPersonSharp></IoPersonSharp> },
    { name: 'wallet', icon: <IoWalletSharp></IoWalletSharp> },

  ];

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <div className="h-screen w-screen bg-[#141414] text-[#E0FF63] font-outfit relative overflow-y-auto">

      <Routes>

        <Route path="/" element={<Introduction />} />
        <Route path="/login" element={<Login />} />
        <Route path="/basic-details" element={<BasicDetails />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/redeem" element={<Redemption />} />
        <Route path="/wallet" element={<Wallet />} />

      </Routes>

      {isLoggedIn ? (<> <div className="fixed bottom-0 left-0 w-full h-[8vh] bg-[#141414] flex justify-around items-center rounded-s-xl">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`text-[3vh] ${activeTab === tab.name ? 'text-[#E0FF63]' : 'text-white'} bg-transparent`}
            onClick={() => {
              setActiveTab(tab.name);
              navigate(`/${tab.name}`)
            }}
          >
            {tab.icon}
          </div>
        ))}
      </div></>) : (<></>)}
    </div>
  );
}
export default App;
