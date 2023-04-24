import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Img from "../../assets/logo_ams_branca.png";
import {
  Buildings,
  FirstAid,
  HouseSimple,
  Kanban,
  List,
  Person,
  X,
} from "@phosphor-icons/react";
import "./TabMenu.css";
import { Outlet, Link } from "react-router-dom";
interface TabMenuProp {
  isActiveMenu: boolean;
  sizeScreen: boolean;
  SetisActiveMenu: (type: boolean) => any;
}

function TabMenu({ isActiveMenu, sizeScreen, SetisActiveMenu }: TabMenuProp) {
  const fakeArrayItens = [
    {
      item: "Inicio",
      rota: "/",
      icone: (props: any) => <HouseSimple {...props} />,
    },
    {
      item: "Agendamentos",
      rota: "/Agendamentos",
      icone: (props: any) => <Kanban {...props} />,
    },
    {
      item: "Atendimento",
      rota: "/Atendimentos",
      icone: (props: any) => <FirstAid {...props} />,
    },
    {
      item: "Pessoas",
      rota: "/Pessoas",
      icone: (props: any) => <Person {...props} />,
    },
    {
      item: "Empresas",
      rota: "/Empresas",
      icone: (props: any) => <Buildings {...props} />,
    },
  ];

  return (
    <div>
      <div
        className={`tabMenuOpen`}
        style={{
          animationName: `${isActiveMenu ? "slideEnter" : "slideDown"}`,
        }}
      ></div>

      <div
        className="backTabMenuOpen"
        style={{
          animationName: `${isActiveMenu ? "slideEnter" : "slideDown"}`,
        }}
      >
        <header>
          <div className=" w-full flex flex-row items-center justify-around">
            <div className=" w-[120px] h-[60px]  flex items-center justify-center">
              <img src={Img}></img>
            </div>

            {sizeScreen == false ? (
              <button onClick={() => SetisActiveMenu(false)}>
                <X size={32} weight="bold" color="white" />
              </button>
            ) : null}
          </div>
        </header>

        <div className=" w-full  flex-1 flex flex-col items-center">
          {fakeArrayItens.map((item, index) => (
            <Link
              to={item.rota}
              className=" w-full flex items-center justify-around mt-5 h-9 text-[#d3f5ef] hover:bg-[#7ab440] cursor-pointer rounded-sm"
              key={index}
            >
              <div className=" w-[50%] flex items-center justify-start  h-8 pl-3">
                <span>{<item.icone size={32} weight="thin" />}</span>
              </div>
              <div className=" w-[50%] flex items-center justify-start  h-8">
                {item.item}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TabMenu;
