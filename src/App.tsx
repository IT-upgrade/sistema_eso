import { useEffect, useState } from "react";

import "./index.css";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import useMediaQuery from "@mui/material/useMediaQuery";
import { List, X } from "@phosphor-icons/react";
import TabMenu from "./componestes/TabMenu/TabMenu";
import {
  Outlet,
  Link,
  useParams,
  useOutletContext,
  OutletProps,
} from "react-router-dom";
import Header from "./componestes/Header";
import { StyledEngineProvider } from "@mui/material";



function App() {
  const sizeScreen = useMediaQuery("(min-width:599px)");
  let params = useParams();

  const [isActiveMenu, SetisActiveMenu] = useState(false);
  const [TypeMsgHeader, setTypeMsgHeader] = useState("");

  //  use efect para logica de menu lateral responsivo
  useEffect(() => {
    if (sizeScreen) {
      SetisActiveMenu(true);
    }

    if (sizeScreen == false) {
      SetisActiveMenu(false);
    }
  }, [sizeScreen]);
  //  use efect para logica de menu lateral responsivo sair quando rota é mudada, e para identificar rota e colocar o nome da mesma no header do app
  useEffect(() => {
    if (sizeScreen == false) {
      SetisActiveMenu(false);
    }

    let url = window.location.href;
    let string = "";

    if (url.includes("Pessoas") == true) {
      string = "Pessoas";
      let indexinitial = url.indexOf(string);
      let indexinEnd = indexinitial + 7;
      const newWord = url.substring(indexinitial, indexinEnd);
      return setTypeMsgHeader(newWord);
    }
    if (url.includes("Agendamentos") == true) {
      let string = "Agendamentos";
      let indexinitial = url.indexOf(string);
      let indexinEnd = indexinitial + 12;
      const newWord = url.substring(indexinitial, indexinEnd);
      
      return setTypeMsgHeader(newWord);
    }
    if (url.includes("Atendimentos") == true) {
      let string = "Atendimentos";
      let indexinitial = url.indexOf(string);
      let indexinEnd = indexinitial + 12;
      const newWord = url.substring(indexinitial, indexinEnd);
      return setTypeMsgHeader(newWord);
    }
    if (url.includes("Empresas") == true) {
      let string = "Empresas";
      let indexinitial = url.indexOf(string);
      let indexinEnd = indexinitial + 8;
      const newWord = url.substring(indexinitial, indexinEnd);
      return setTypeMsgHeader(newWord);
    }
    if (url.includes("") == true) {
      return setTypeMsgHeader("");
    }
  }, [params]);

  return (
    <div className="w-[100%] flex flex-row relative h-[100vh] bg-slate-600">
      <TabMenu
        isActiveMenu={isActiveMenu}
        sizeScreen={sizeScreen}
        SetisActiveMenu={SetisActiveMenu}
      ></TabMenu>

      <div className="w-full bg-[#d3f5ef] flex flex-col ">
        <Header
          isActiveMenu={isActiveMenu}
          SetisActiveMenu={SetisActiveMenu}
          TypeMsgHeader={TypeMsgHeader}
        ></Header>

        <div className=" w-full    h-full m-0 box-border">
          <StyledEngineProvider injectFirst>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Outlet />
            </LocalizationProvider>
          </StyledEngineProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
