import React from "react";
import { Button } from "./ui/button";
import {  Clock1 } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-5">
      <div className="flex items-center gap-2">
        <Clock1 className="text-xl"/>
      <h1>Time Logger</h1>
      </div>
      <Button >Logout</Button>
    </div>
  );
};

export default Navbar;
