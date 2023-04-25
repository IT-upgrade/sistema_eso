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

import { schemaFormCreateConvite } from "../../utils/schemas";
import { empresas, pessoas, cargo } from "../../utils/types";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

interface ModalC_ECargoProp {
  open: boolean;
  setOpen: (type: boolean) => void;
  setLouder: (type: boolean) => void;
  DataFromApi?: pessoas | null;
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
  const { EditEmpresas } = useApi();
  const queryClient = useQueryClient();
  const formRef = useRef(null) as unknown as MutableRefObject<FormHandles>;

  

  interface typeCepAPI {
    bairro: String;
    cep: String;
    complemento: String;
    ddd: String;
    gia: String;
    ibge: String;
    localidade: String;
    logradouro: String;
    siafi: String;
    uf: String;
  }

 

  const { mutate } = useMutation(EditEmpresas, {
    onSuccess: () => {
      queryClient.invalidateQueries("pessoas");
      // presentToast("Convite criado com sucesso!", "success");
      queryClient.resetQueries();
      setLouder(true);
      setOpen(false);
    },
    onError: () => {
      prompt("Não foi possivel criar seu convite, tente mais tarde.", "danger");
    },
  });
  const [datacEP, setdatacEP] = useState<typeCepAPI>();

  const handleFormNormal = async (Data: any) => {
    

    try {
      formRef.current.setErrors({});

      //Validando Data, se invalida irá pro catch
      //   await schemaFormCreateConvite.validate(Data, {
      //     abortEarly: false,
      //   });
      mutate(Data);
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
                    name="nomecargo"
                    tipo="Nome do Cargo "
                    datafromApi={DataFromApi?.Nome}
                  ></InputString>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <InputAutocomplete
                    name={"corCargo"}
                    inputLabel={"Cor"}
                    options={optionscolorCargo}
                  ></InputAutocomplete>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <InputString
                    name="gargahoraria"
                    tipo="Carga Horaria "
                    datafromApi={DataFromApi?.Nome}
                  ></InputString>
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputString
                    name="APTIDÕES"
                    tipo="APTIDÕES EXTRAS: "
                    datafromApi={DataFromApi?.EMAIL_PRINCIPAL}
                  ></InputString>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputString
                    name="ATIVIDADES"
                    tipo="ATIVIDADES DOS PROFISSIONAIS  "
                    datafromApi={DataFromApi?.EMAIL_PRINCIPAL}
                  ></InputString>
                </Grid>
              </Grid>
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputString
                    name="cbo"
                    tipo="CBO "
                    datafromApi={DataFromApi?.EMAIL_PRINCIPAL}
                  ></InputString>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputString
                    name="AMBIENTES"
                    tipo="AMBIENTES DE TRANSIÇÃO"
                    datafromApi={DataFromApi?.EMAIL_PRINCIPAL}
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
              setdatacEP(undefined);
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
