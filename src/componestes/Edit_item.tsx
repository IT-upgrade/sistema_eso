import { UserGear } from "@phosphor-icons/react";
import React from "react";

interface Edit_itemProp {
  data?: any;
  color?: String;
  functionActivateModal: (props: any) => void;
  texto?: string;
}

function Edit_item({
  color,
  data,
  functionActivateModal,
  texto,
}: Edit_itemProp) {
  
  return (
    <div
      onClick={() => functionActivateModal(data)}
      className=" min-w-10 p-1 bg-[#7ab440] flex justify-center items-center rounded-md mr-10 hover:cursor-pointer"
      style={{ backgroundColor: `${color}` }}
    >
      {texto?`${texto} `:null}
      <UserGear size={33} color="white" weight="fill" />
    </div>
  );
}

export default Edit_item;
