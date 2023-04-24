import Trend from "react-trend";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Person, Wallet } from "@phosphor-icons/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const YourComponent = () => (
  <Trend
    smooth
    autoDraw
    autoDrawDuration={1000}
    autoDrawEasing="ease-out"
    data={[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]}
    gradient={["white"]}
    radius={6.8}
    strokeWidth={10}
    strokeLinecap={"round"}
  />
);



function Home() {

  
  

  return (
    <div className=" w-full  min-h-full p-2 ">
      <div className=" w-full  flex flex-row items-center justify-center flex-wrap md:flex-nowrap md:justify-between ">
        <div className=" w-full md:max-w-[25%]  h-[150px] m-2 rounded-lg bg-[#D19FA0]  flex flex-col items-center justify-around">
          <div className="  flex justify-between items-center  w-full p-3  ">
            <h3 className=" pr-3 text-white">615 Empresas Ativas de (622)</h3>
            <span>
              <Wallet size={32} weight="bold" color="white" />
            </span>
          </div>

          <YourComponent></YourComponent>
        </div>
        <div className=" w-full md:max-w-[25%]  h-[150px] m-2 rounded-lg bg-[#897172]  flex flex-col items-center justify-around">
          <div className="  flex justify-between items-center  w-full p-3  ">
            <h3 className=" pr-3 text-white">
              10814 Vidas Ativas / 3 Excedentes
            </h3>
            <span>
              <Person size={32} color="white" />
            </span>
          </div>

          <YourComponent></YourComponent>
        </div>
        <div className=" w-full md:max-w-[25%]  h-[150px] m-2 rounded-lg bg-[#1F2100]  flex flex-col items-center justify-around">
          <div className="  flex justify-between items-center  w-full p-3  ">
            <h3 className=" pr-3 text-white">1727 Ambientes / 2775 Cargos</h3>
            <span>
              <Wallet size={32} weight="bold" color="white" />
            </span>
          </div>

          <YourComponent></YourComponent>
        </div>
        <div className=" w-full md:max-w-[25%]  h-[150px] m-2 rounded-lg bg-[#4A4D26]  flex flex-col items-center justify-around">
          <div className=" flex justify-between items-center  w-full p-3 ">
            <h3 className=" pr-3 text-white">452 ASOs Neste Mês</h3>
            <span>
              <Wallet size={32} weight="bold" color="white" />
            </span>
          </div>

          <YourComponent></YourComponent>
        </div>
      </div>
    </div>
  );
}

export default Home;
