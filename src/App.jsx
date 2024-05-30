import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'
import { Button } from "./components/ui/button";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import IconController from "./components/IconController";
import BackgroundController from "./components/BackgroundController";
import LogoPreview from "./components/LogoPreview";
import { UpdateStorageContext } from "./context/UpdateStorageContext";

function App() {
  const [selectedindex, setselectedindex] = useState(0);
  const [updateStorage, setUpdateStorage] = useState({});
  const [downloadIcon, setdownloadicon] = useState();

  return (
    <UpdateStorageContext.Provider value={{ updateStorage, setUpdateStorage }}>
      <div>
        <Header DownloadIcon={setdownloadicon} />
        <div className="w-64 fixed">
          <SideNav selectedindex={(i) => setselectedindex(i)} />
        </div>
        <div className=" ml-64 grid grid-cols-1 md:grid-cols-6 fixed">
          <div className=" md:col-span-3 border h-screen shadow-sm p-5 overflow-auto">
            {selectedindex == 0 ? <IconController /> : <BackgroundController />}
          </div>
          <div className=" md:col-span-3 ">
            <LogoPreview downloadIcon={downloadIcon} />
          </div>
          {/* <div className=" md:col-span-1 bg-blue-100">Ads banner</div> */}
        </div>
      </div>
    </UpdateStorageContext.Provider>
  );
}

export default App;
