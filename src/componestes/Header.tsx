import { List, X } from "@phosphor-icons/react";

interface HeaderProp {
  isActiveMenu: boolean;
  TypeMsgHeader: string;
  SetisActiveMenu: (type: boolean) => void;
}

function Header({ isActiveMenu, SetisActiveMenu, TypeMsgHeader }: HeaderProp) {
  return (
    <div className="w-full text-[30px] md:text-[45px] border-b-[5px] border-[#7ab440] shadow-sm  shadow-[#00000044] flex items-center justify-start p-2  bg-[#201e1e]">
      {isActiveMenu ? (
        <span className=" mr-11">
          <List size={32} weight="bold" color="#0000" />
        </span>
      ) : (
        <span className=" mr-11" onClick={() => SetisActiveMenu(true)}>
          <List size={32} weight="bold" color="white" />
        </span>
      )}

      {TypeMsgHeader && TypeMsgHeader! !== "Inicio" ?null:<h1 className=" text-[#d3f5ef]"> Sistema Eso AMS</h1>}
      {TypeMsgHeader && TypeMsgHeader! !== "Inicio" ? (
        <h1 className=" text-[white]">{TypeMsgHeader}</h1>
      ) : null}
    </div>
  );
}

export default Header;
