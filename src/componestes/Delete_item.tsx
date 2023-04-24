import { UserMinus } from "@phosphor-icons/react";
import React from "react";
interface Delete_itemProp {
  ide: string;
  functionDelet: (id: string) => void;
}

function Delete_item({ functionDelet, ide }: Delete_itemProp) {
  return (
    <div
      onClick={() => functionDelet(ide)}
      className=" w-10 bg-[red] flex justify-center items-center rounded-md hover:cursor-pointer"
    >
      <UserMinus size={33} color="white" weight="fill" />
    </div>
  );
}

export default Delete_item;
