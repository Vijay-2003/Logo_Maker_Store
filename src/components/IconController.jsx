import { Smile } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import ColorPickerController from "./ColorPickerController";
import { UpdateStorageContext } from "@/context/UpdateStorageContext";
import IconList from "./IconList";

function IconController() {
  const storageValue = JSON.parse(localStorage.getItem("value"));

  const [size, setsize] = useState(
    storageValue ? storageValue?.iconSize : 280
  );
  const [rotate, setrotate] = useState(
    storageValue ? storageValue?.iconRotate : 0
  );
  const [color, setcolor] = useState(
    storageValue ? storageValue?.iconColor : '#fff'
  );
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  const [icon, setIcon] = useState(
    storageValue ? storageValue?.icon : "Smile"
  );
  useEffect(() => {
    const updatedValue = {
      ...storageValue,
      iconSize: size,
      iconRotate: rotate,
      iconColor: color,
      icon: icon,
    };
    setUpdateStorage(updatedValue);
    localStorage.setItem("value", JSON.stringify(updatedValue));
  }, [size, rotate, color, icon]);

  return (
    <div className="">
      <div>
        <IconList selectedIcon={(icon) => setIcon(icon)} />
        <div className=" py-2">
          <label className=" p-2 flex justify-between items-center">
            Size<span>{size} px</span>
          </label>
          <Slider
            className="cursor-pointer"
            defaultValue={[size]}
            max={512}
            step={1}
            onValueChange={(event) => setsize(event[0])}
          />
        </div>

        <div className=" py-2">
          <label className=" p-2 flex justify-between items-center">
            Rotate<span>{rotate} °</span>
          </label>
          <Slider
            className="cursor-pointer"
            defaultValue={[rotate]}
            max={360}
            step={1}
            onValueChange={(event) => setrotate(event[0])}
          />
        </div>

        <div className=" py-2 mb-14">
          <label className=" p-2 flex justify-between items-center">
            Icon Color
          </label>
          <ColorPickerController
            hideController={true}
            selectedcolor={(color) => setcolor(color)}
          />
        </div>
      </div>
    </div>
  );
}

export default IconController;
