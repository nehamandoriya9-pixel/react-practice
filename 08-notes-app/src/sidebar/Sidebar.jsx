import React from "react";
import { LuNotebookText } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import { TbPinnedFilled } from "react-icons/tb";

export default function Sidebar({setActiveTab, activeTab}) {
  return (
    <div className="bg-gray-200 w-50 h-auto justify-center">
      <div className="flex  gap-1 justify-center">
        <LuNotebookText className="text-xl mt-10 font-bold text-center" />
        <h2 className="mt-9 font-bold text-xl text-center">Notes App</h2>
      </div>
      <div className="flex justify-center">
        <div className="border-b mt-10 w-40 border-gray-300"></div>
      </div>
      <div>
        <div className="flex justify-center">
          <div className="mt-10 justify-center items-center flex gap-3 bg-gray-300 rounded-md shadow-md w-40 p-2 hover:bg-gray-400">
            <MdOutlineDashboard className="text-xl font-bold" />
            <button className="font-bold"
            onClick={() => setActiveTab("all")}>All Notes</button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="mt-4 justify-center items-center flex gap-3 bg-gray-300 rounded-md shadow-md w-40 p-2 hover:bg-gray-400">
            <TbPinnedFilled className="text-xl font-bold" />
            <button className="font-bold"
            onClick={() => setActiveTab("pinned")}>Pinned Notes</button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="border-b mt-10 w-40 border-gray-300"></div>
      </div>
      <div className="mt-10 justify-center items-center flex">
        <LuNotebookPen className="text-7xl text-gray-500 -rotate-12"/>
      </div>
      <div className="justify-center flex text-center mt-5">
       <span className="text-gray-500 text-sm">keep your ideas<br/>organized</span>
       </div>
    </div>
  );
}
