import React from "react";
import { Link, Navigate } from "react-router-dom";

interface BotaoInfo_Gerenciarprops {
  name: string;
  path: string;
}

function BotaoInfo_Gerenciar({ name, path }: BotaoInfo_Gerenciarprops) {
  return (
    <div className=" w-full  mb-2  flex justify-center items-center">
      <Link
        to={`${path}`}
        className=" w-[130px] p-1 rounded-sm flex justify-center items-center h-full bg-[#7ab440] hover:cursor-pointer hover:bg-[#7ab44093]"
      >
        {name}
      </Link>
    </div>
  );
}

export default BotaoInfo_Gerenciar;
