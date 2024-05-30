import { UpdateStorageContext } from "@/context/UpdateStorageContext";
import html2canvas from "html2canvas";
import { icons } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";


const BASE_URL = "https://logoexpress.tubeguruji.com";

function LogoPreviw({ downloadIcon }) {
  const [storageValue, setstorageValue] = useState();
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("value"));
    console.log(storageData);
    setstorageValue(storageData);
  }, [updateStorage]);

  useEffect(() => {
    if (downloadIcon) {
      // console.log('BTN Clicked');
      downloadPngLogo();
    }
  }, [downloadIcon]);

  // download icon in png format
  const downloadPngLogo = () => {
    const downloadLogoDiv = document.getElementById("downloadLogoDiv");
    html2canvas(downloadLogoDiv, {
      backgroundColor: null,
    }).then((canvas) => {
      const pngImage = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngImage;
      downloadLink.download = "Icon_Store(Logo).png";
      downloadLink.click();
    });
  };

  const Icon = ({ name, color, size, rotate }) => {
    const LucidIcon = icons[name];
    if (!LucidIcon) {
      return;
    }
    return (
      <LucidIcon
        color={color}
        size={size}
        style={{
          transform: `rotate(${rotate}deg)`,
        }}
      />
    );
  };

  return (
    <div className=" flex items-center justify-center h-screen">
      <div
        className=" h-[500px] w-[500px] bg-gray-200 outline-dotted outline-gray-300"
        style={{ padding: storageValue?.bgPadding }}
      >
        <div
          id="downloadLogoDiv"
          className=" h-full w-full flex items-center justify-center"
          style={{
            borderRadius: storageValue?.bgRounded,
            background: storageValue?.bgColor,
            // padding: storageValue?.bgPadding,
            // transform: storageValue?.iconRotate,
          }}
        >
          {storageValue?.icon?.includes(".png") ? (
            //FOR color Icons
            <img
              src={"/png/" + storageValue?.icon}
              style={{
                height: storageValue?.iconSize,
                width: storageValue?.iconSize,
                // rotate: storageValue?.iconRotate,
                // transform: `rotate(${storageValue?.iconRotate}deg)`,
              }}
            />
          ) : (
            //Icons
            <Icon
              name={storageValue?.icon}
              color={storageValue?.iconColor}
              size={storageValue?.iconSize}
              // style={{
              //   height: storageValue?.iconSize,
              //   width: storageValue?.iconSize,
              // }}
              rotate={storageValue?.iconRotate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LogoPreviw;
