import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Smile, icons } from "lucide-react";
import { iconList } from "@/constants/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";

//color icons
const BASE_URL = "https://logoexpress.tubeguruji.com";

function IconList({ selectedIcon }) {
  const [dialogc, setdialogc] = useState(false);
  const storageValue = JSON.parse(localStorage.getItem("value"));
  const [icon, setIcon] = useState(storageValue ? storageValue?.icon : "Smile");

  // color icons
  const [pngIconList, setPngIconList] = useState([]);

  const Icon = ({ name, color, size }) => {
    const LucidIcon = icons[name];
    if (!LucidIcon) {
      return;
    }
    return <LucidIcon color={color} size={size} />;
  };

  useEffect(() => {
    getPngIcons();
  });

  //for color icons
  const getPngIcons = () => {
    axios.get(BASE_URL + "/getIcons.php").then((resp) => {
      console.log(resp.data);
      setPngIconList(resp.data);
    });
  };

  return (
    <div>
      <div>
        <label>Icon</label>
        <div
          onClick={() => setdialogc(true)}
          className=" p-3 cursor-pointer
             bg-gray-200 rounded-md w-[50px]
             h-[50px] my-2 flex items-center justify-center"
        >
          {icon?.includes(".png") ? (
            <img src={BASE_URL+'/png/'+icon} />
          ) : (
            <Icon name={icon} color={"#000"} size={20} />
          )}
          {/* <Icon name={icon} color={"#000"} size={20} /> */}
        </div>
      </div>
      <Dialog open={dialogc} onOpenChange={setdialogc}>
        <DialogContent className=" bg-transparent backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="my-5 mt-0">
              Pic Your Favourite Icon
            </DialogTitle>
            <DialogDescription>
              <Tabs defaultValue="icon" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="icon">Icons</TabsTrigger>
                  <TabsTrigger value="color-icon">Color Icons</TabsTrigger>
                </TabsList>
                <TabsContent value="icon">
                  <div
                    className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5
              gap-4 overflow-auto h-[400px] p-6 "
                  >
                    {iconList.map((icon, index) => (
                      <div
                        className=" border p-3 flex rounded-sm items-center justify-center cursor-pointer "
                        onClick={() => {
                          selectedIcon(icon);
                          setdialogc(false);
                          setIcon(icon);
                        }}
                      >
                        <Icon name={icon} color={"#fff"} size={20} />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="color-icon">
                  <div
                    className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5
              gap-4 overflow-auto h-[400px] p-6 "
                  >
                    {pngIconList.map((icon, index) => (
                      <div
                        className=" border p-3 flex rounded-sm items-center justify-center cursor-pointer "
                        onClick={() => {
                          selectedIcon(icon);
                          setdialogc(false);
                          setIcon(icon);
                        }}
                      >
                        <img src={BASE_URL + "/png/" + icon} />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default IconList;
