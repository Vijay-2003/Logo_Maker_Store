import React from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

function Header({DownloadIcon}) {
  return (
    <div className=" p-4 shadow-sm border flex justify-between items-center">
      <img src="./vite.svg" />
      <Button
        className=" text-white font-bold flex gap-2 items-center"
        onClick={() => DownloadIcon(Date.now())}
      >
        <Download
          className=" h-6 w-5"
          onClick={() => DownloadIcon(Date.now())}
        />
        Download
      </Button>
    </div>
  );
}

export default Header;
