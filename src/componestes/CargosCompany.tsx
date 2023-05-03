import img from "../assets/techny-dashboard-with-user-interface-elements.png";
import { green } from "@mui/material/colors";
import { SxProps } from "@mui/system";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { useState } from "react";
import { pessoas } from "../utils/types";
import ModalC_ECargo from "./ModalC_ECargo/ModalC_ECargo";
import { useQuery } from "react-query";
import useApi from "../../src/services/api";
import Edit_item from "./Edit_item";
import Delete_item from "./Delete_item";
import { useParams } from "react-router-dom";
import CardInfo from "./CardInfo/CardInfo";

const fabStyle = {
  position: "absolute",
  top: 56,
  right: 16,
};

const fabGreenStyle = {
  color: "common.green",
  bgcolor: green[500],
  "&:hover": {
    bgcolor: green[600],
  },
};

function CargosCompany() {
  const { id } = useParams();
  const { GetPessoas, GetEmpresas, GetEmpresaById } = useApi();

  //   const [pessoas, setPessoas] = useState<any[]>();

  const { data, isLoading, refetch } = useQuery(
    "EmpresaById",
    () => GetEmpresaById(id),
    {
      staleTime: 1000 * 60 * 60,
      onSuccess: (data) => {},
    }
  );

  const [open, setOpen] = useState(false);
  const [loader, setloader] = useState<boolean>(false);
  const [openInfo, setopenInfo] = useState<boolean>(false);
  const [openFromEdit, setopenFromEdit] = useState(false);
  const [infofromcargo, setinfofromcargo] = useState("");
  const [openToEdit, setopenToEdit] = useState<pessoas>();
  // const fabs = [
  //   {
  //     color: "inherit" as "inherit",
  //     sx: { ...fabStyle, ...fabGreenStyle } as SxProps,
  //     icon: <AddIcon />,
  //     label: "Add",
  //   },
  // ];

  return (
    <div className=" w-full  min-h-[450px]   p-2 mt-16 rounded-[17px]  ">
      {/* modal para adicionar CARGOS */}
      <ModalC_ECargo
        open={open}
        setOpen={setOpen}
        setLouder={setloader}
        DataFromApi={openToEdit}
        openFromEdit={openFromEdit}
      ></ModalC_ECargo>
      {/* modal para INFORMAÇÕES DO CARGO */}
      <CardInfo
        open={openInfo}
        setOpen={setopenInfo}
        infos={infofromcargo}
      ></CardInfo>

      {data?.data?.cargo == undefined ? (
        <div className=" w-full flex flex-col items-center justify-center  h-[300px]   rounded-sm ">
          <span>
            <img src={img} alt="" className=" min-h-full" />
          </span>
          <span className=" md:text-[20px] text-[10px] mt-5  text-[#42493A]">
            Adicione cargos a empresa para conseguir velos!
          </span>
        </div>
      ) : (
        data?.data?.cargo.map((item: any, index: any) => (
          <div
            className=" w-full p-2 hover:bg-[#b0d38dd7] rounded-[10px] flex-row md:flex  bg-[#b0d38d]  border-[2px] shadow-md  border-[white] mb-2"
            key={index}
          >
            <span className=" flex-1 flex items-center pl-2 pb-2 text-lg justify-center md:justify-start  text-[#201e1e]  ">
              {item.nomecargo}
            </span>

            <div className="  flex justify-self-end ">
              <Edit_item
                texto="Mais Informações "
                color={"#9999CC"}
                functionActivateModal={function (props: any): void {
                  setopenInfo(true);
                  setinfofromcargo(item);
                }}
              ></Edit_item>
              <Delete_item ide={"jjnfejnrnjf"}></Delete_item>
            </div>
          </div>
        ))
      )}

      {!open ? (
        <Fab
          sx={{ ...fabStyle, ...fabGreenStyle } as SxProps}
          aria-label={"Add"}
          color={"inherit" as "inherit"}
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>
      ) : null}
    </div>
  );
}

export default CargosCompany;
