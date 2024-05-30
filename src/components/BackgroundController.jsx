import { Slider } from "./ui/slider";
import React, { useContext, useEffect, useState } from "react";
import ColorPickerController from "./ColorPickerController";
import { UpdateStorageContext } from "@/context/UpdateStorageContext";

function BackgroundController() {
  const storageValue = JSON.parse(localStorage.getItem("value"));

  const [rounded, setrounded] = useState(
    storageValue ? storageValue?.bgRounded : 0
  );
  const [paddings, setpadding] = useState(
    storageValue ? storageValue?.bgPadding : 0
  );
  const [color, setColor] = useState(
    storageValue ? storageValue?.bgColor : "#fff"
  );
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const updateValue = {
      ...storageValue,
      bgRounded: rounded,
      bgPadding: paddings,
      bgColor: color,
    };
    setUpdateStorage(updateValue);
    localStorage.setItem("value", JSON.stringify(updateValue));
  });

  return (
    <div className="">
      <div className=" py-2">
        <label className=" p-2 flex justify-between items-center">
          Rounded<span>{rounded} px</span>
        </label>
        <Slider
          className="cursor-pointer"
          defaultValue={[rounded]}
          max={360}
          step={1}
          onValueChange={(event) => setrounded(event[0])}
        />
      </div>

      <div className=" py-2">
        <label className=" p-2 flex justify-between items-center">
          Padding<span>{paddings} px</span>
        </label>
        <Slider
          className="cursor-pointer"
          defaultValue={[paddings]}
          max={100}
          step={1}
          onValueChange={(event) => setpadding(event[0])}
        />

        <div className=" py-2 mb-14">
          <label className=" p-2 flex justify-between items-center">
            Icon Color
          </label>
          <ColorPickerController
            hideController={false}
            selectedcolor={(color) => setColor(color)}
          />
        </div>
      </div>
    </div>
  );
}

export default BackgroundController;
