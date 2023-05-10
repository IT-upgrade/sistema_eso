import React, { useState } from "react";
import Modal from "react-responsive-modal";

import "./CardInfo.css";
import { UserPlus } from "@phosphor-icons/react";
import { Grid } from "@mui/material";

interface CardInfoProp {
  open: boolean;
  setOpen: (type: boolean) => void;
  infos?: any | null;
}

function CardInfo({ open, setOpen, infos }: CardInfoProp) {
  
  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);

          // DataFromApi = null;
        }}
        classNames={{
          overlay: "customOverlayCardInfo",
          modal: "customModalCardInfo",
        }}
      >
        <div>
          <div className="header_containerCardInfo">{infos.nome}</div>

          <div className="">
            <Grid container padding={1} spacing={2}>
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12}>
                  <div className=" itensContainerCardInfo">
                    <h4 className=" text_itensContainerCardInfo">Ambientes:</h4> {infos.ambiente}
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div className=" itensContainerCardInfo">
                    <h4 className=" text_itensContainerCardInfo">Aptidões:</h4> {infos.aptidao}
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div className=" itensContainerCardInfo">
                    <h4 className=" text_itensContainerCardInfo">Atividades:</h4> {infos.atividade}
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div className=" itensContainerCardInfo">
                    <h4 className=" text_itensContainerCardInfo">CBO:</h4> {infos.cbo}
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div className=" itensContainerCardInfo">
                    <h4 className=" text_itensContainerCardInfo"> Cor do Cargo:</h4> {infos.cor}
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div className=" itensContainerCardInfo">
                    <h4 className=" text_itensContainerCardInfo"> CARGA HORÁRIA:</h4> {infos.carga_horaria}
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div className=" itensContainerCardInfo">
                    <h4 className=" text_itensContainerCardInfo"> Informações:</h4> {infos.informacao}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CardInfo;
