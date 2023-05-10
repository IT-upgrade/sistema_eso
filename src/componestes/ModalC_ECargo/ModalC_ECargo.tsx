import { FormHandles } from "@unform/core";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import "./cargo.css";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { BriefcaseMetal, MapPinLine, UserPlus } from "@phosphor-icons/react";
import { Form } from "@unform/web";
import { Grid } from "@mui/material";
import InputString from "../inputs/InputString";
import InputDataTime from "../inputs/InputDataTime/InputDataTime";
import InputAutocomplete from "../inputs/InputAutocomplete";
import {
  optionsGeneri,
  optionsPerson,
  optionscolorCargo,
} from "../../utils/objsImputs";
import InputNumber from "../inputs/InputNumber";
import InputCep from "../inputs/InputCep";
import * as yup from "yup";
import useApi from "../../services/api";

import { schemaFormCreateCargo } from "../../utils/schemas";
import { empresas, pessoas, cargo } from "../../utils/types";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

interface ModalC_ECargoProp {
  open: boolean;
  setOpen: (type: boolean) => void;
  setLouder: (type: boolean) => void;
  DataFromApi?: any | null;
  openFromEdit?: boolean | null;
}

function ModalC_ECargo({
  openFromEdit,
  open,
  setOpen,
  setLouder,
  DataFromApi,
}: ModalC_ECargoProp) {
  const { id } = useParams();
  const { SetCargo } = useApi();
  const queryClient = useQueryClient();
  const formRef = useRef(null) as unknown as MutableRefObject<FormHandles>;

  const { mutate } = useMutation(SetCargo, {
    onSuccess: () => {
      queryClient.invalidateQueries("EmpresaById");
      // presentToast("Convite criado com sucesso!", "success");
      queryClient.resetQueries();
      setLouder(true);
      setOpen(false);
    },
    onError: () => {
      prompt("Não foi possivel criar seu convite, tente mais tarde.", "danger");
    },
  });

  const handleFormNormal = async (Data: any) => {
    try {
      formRef.current.setErrors({});

      // Validando Data, se invalida irá pro catch
      await schemaFormCreateCargo.validate(Data, {
        abortEarly: false,
      });

      const datacomId = { ...Data, empresaId: id };

      console.log(datacomId);
      mutate(datacomId);
    } catch (err) {
      let validationErrors: any = {};

      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          let path = error.path as string;
          validationErrors[path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  };

  const handleFormEdit = async (Data: pessoas) => {
    console.log("function to edit");

    // try {
    //   formRef.current.setErrors({});

    //   //Validando Data, se invalida irá pro catch
    //   await schemaFormCreateEmpresa.validate(Data, {
    //     abortEarly: false,
    //   });
    //   mutate(Data);
    // } catch (err) {
    //   console.log(err);
    //   let validationErrors: any = {};

    //   if (err instanceof yup.ValidationError) {
    //     err.inner.forEach((error) => {
    //       console.log(error);
    //       let path = error.path as string;
    //       validationErrors[path] = error.message;
    //     });

    //     formRef.current.setErrors(validationErrors);
    //   }
    // }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        console.log("clicado");
        DataFromApi = null;
        openFromEdit = null;
      }}
      classNames={{
        overlay: "customOverlay",
        modal: "customModal",
      }}
    >
      <div className="container">
        <div className="header_container_person">
          <BriefcaseMetal size={32} color="white" weight="fill" />
        </div>

        <div className=" w-full ">
          <Form
            ref={formRef}
            onSubmit={!openFromEdit ? handleFormNormal : handleFormEdit}
            autoComplete="off"
          >
            <Grid container padding={1} spacing={2}>
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={4}>
                  <InputString
                    name="nome"
                    tipo="Nome do Cargo "
                    datafromApi={DataFromApi?.nome}
                  ></InputString>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <InputAutocomplete
                    name={"cor"}
                    inputLabel={"Cor"}
                    options={optionscolorCargo}
                  ></InputAutocomplete>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <InputString
                    name="carga_horaria"
                    tipo="Carga Horaria "
                    datafromApi={DataFromApi?.carga_horaria}
                  ></InputString>
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputString
                    name="aptidao"
                    tipo="APTIDÕES EXTRAS: "
                    datafromApi={DataFromApi?.aptidao}
                  ></InputString>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputString
                    name="atividade"
                    tipo="ATIVIDADES DOS PROFISSIONAIS  "
                    datafromApi={DataFromApi?.atividade}
                  ></InputString>
                </Grid>
              </Grid>
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputString
                    name="cbo"
                    tipo="CBO "
                    datafromApi={DataFromApi?.cbo}
                  ></InputString>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputString
                    name="ambiente"
                    tipo="AMBIENTES DE TRANSIÇÃO"
                    datafromApi={DataFromApi?.ambiente}
                  ></InputString>
                </Grid>
              </Grid>
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12}>
                  <InputString
                    name="informacao"
                    tipo="Informações "
                    datafromApi={DataFromApi?.informacao}
                  ></InputString>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        </div>
        <div className="booton_container_person">
          <button
            onClick={() => {
              formRef.current?.submitForm();
              // setdatacEP(undefined);
            }}
          >
            {!openFromEdit ? "Enviar" : "Editar"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalC_ECargo;
function EditEmpresas(variables: void): Promise<unknown> {
  throw new Error("Function not implemented.");
}
