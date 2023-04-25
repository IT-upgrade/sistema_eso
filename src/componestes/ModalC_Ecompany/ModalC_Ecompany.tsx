import { FormHandles } from "@unform/core";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import "./Company.css";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { MapPinLine, UserPlus } from "@phosphor-icons/react";
import { Form } from "@unform/web";
import { Grid } from "@mui/material";
import InputString from "../inputs/InputString";
import InputDataTime from "../inputs/InputDataTime/InputDataTime";
import InputAutocomplete from "../inputs/InputAutocomplete";
import {
  optionsEstabelecimento,
  optionsGeneri,
  optionsPerson,
  optionscompany,
} from "../../utils/objsImputs";
import InputNumber from "../inputs/InputNumber";
import InputCep from "../inputs/InputCep";
import * as yup from "yup";
import useApi from "../../services/api";

import {
  schemaFormCreateConvite,
  schemaFormCreateEmpresa,
} from "../../utils/schemas";
import { cargo, empresas, pessoas } from "../../utils/types";
import { useMutation, useQueryClient } from "react-query";

interface ModalC_EcompanyProp {
  open: boolean;
  setOpen: (type: boolean) => void;
  setLouder: (type: boolean) => void;
  DataFromApi?: any | null;
  openFromEdit: boolean;
}

function ModalC_Ecompany({
  openFromEdit,
  open,
  setOpen,
  setLouder,
  DataFromApi,
}: ModalC_EcompanyProp) {
  const { EditEmpresas, SetEmpresas } = useApi();
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

  const { mutate } = useMutation(SetEmpresas, {
    onSuccess: () => {
      queryClient.invalidateQueries("Empresas");
      // presentToast("Convite criado com sucesso!", "success");
      queryClient.resetQueries();
      setLouder(true);
      setOpen(false);
    },
    onError: () => {
      prompt("Não foi possivel criar seu convite, tente mais tarde.", "danger");
    },
  });

  const mutateEdit = useMutation(
    (items) => EditEmpresas(items, DataFromApi.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("pessoas");
        // presentToast("Convite criado com sucesso!", "success");
        queryClient.resetQueries();
        setLouder(true);
        setOpen(false);
      },
      onError: () => {
        prompt(
          "Não foi possivel criar seu convite, tente mais tarde.",
          "danger"
        );
      },
    }
  );
  const [datacEP, setdatacEP] = useState<typeCepAPI>();

  const handleFormNormal = async (Data: any) => {
   

    // let {cargo} = Data

    // cargo = []

    // let texte = {...Data, cargo}

    // console.log(texte)

    try {
      formRef.current.setErrors({});

      //Validando Data, se invalida irá pro catch
      await schemaFormCreateEmpresa.validate(Data, {
        abortEarly: false,
      });

      mutate(Data);
    } catch (err) {
      console.log(err);
      let validationErrors: any = {};

      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          console.log(error);
          let path = error.path as string;
          validationErrors[path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  };

  const handleFormEdit = async (Data: any) => {
   

    try {
      formRef.current.setErrors({});

      //Validando Data, se invalida irá pro catch
      await schemaFormCreateEmpresa.validate(Data, {
        abortEarly: false,
      });
      mutateEdit.mutate(Data);
    } catch (err) {
      console.log(err);
      let validationErrors: any = {};

      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          console.log(error);
          let path = error.path as string;
          validationErrors[path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        
        DataFromApi = null;
      }}
      classNames={{
        overlay: "customOverlay",
        modal: "customModal",
      }}
    >
      <div className="container">
        <div className="header_container">
          Cadastro
          <UserPlus size={32} color="black" weight="fill" />
        </div>

        <div className=" w-full bg-black">
          <Form
            ref={formRef}
            onSubmit={DataFromApi ? handleFormEdit : handleFormNormal}
            autoComplete="off"
          >
            <Grid container padding={1} spacing={2}>
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputString
                    name="nome_fantasia"
                    tipo="Nome"
                    datafromApi={DataFromApi?.nome_fantasia}
                  ></InputString>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputString
                    name="rasao_social"
                    tipo="Rasão Social "
                    datafromApi={DataFromApi?.rasao_social}
                  ></InputString>
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={3}>
                  <InputAutocomplete
                    name={"tipo_doc"}
                    inputLabel={"Tipo do Documento"}
                    options={optionscompany}
                    datafromApi={DataFromApi?.tipo_doc}
                  ></InputAutocomplete>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputNumber
                    name="numero_doc"
                    tipo="CNPJ"
                    datafromApi={DataFromApi?.numero_doc}
                  ></InputNumber>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <InputAutocomplete
                    name={"estabelecimento"}
                    inputLabel={"Estabelecimento"}
                    options={optionsEstabelecimento}
                    datafromApi={DataFromApi?.estabelecimento}
                  ></InputAutocomplete>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputDataTime
                    name="data_registro"
                    datafromApi={DataFromApi?.data_registro}
                  ></InputDataTime>
                </Grid>
              </Grid>
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={3}>
                  <InputString
                    name="email"
                    tipo="E-mail"
                    datafromApi={DataFromApi?.email}
                  ></InputString>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputString
                    name="email_sec"
                    tipo="E-mail secundario"
                    datafromApi={DataFromApi?.email_sec}
                  ></InputString>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <InputNumber
                    name="tel"
                    tipo="Telefone"
                    datafromApi={DataFromApi?.tel}
                  ></InputNumber>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputNumber
                    name="tel_sec"
                    tipo="Telefone secundário"
                    datafromApi={DataFromApi?.tel_sec}
                  ></InputNumber>
                </Grid>
              </Grid>
            </Grid>

            <div className="titeAddress">
              Localização
              <MapPinLine size={32} color="black" weight="fill" />
            </div>

            <Grid container padding={1} spacing={2}>
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={3}>
                  <InputCep
                    name="cep"
                    tipo="Cep"
                    setStateCep={setdatacEP}
                    datafromApi={DataFromApi?.cep}
                  ></InputCep>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputString
                    name="cidade"
                    tipo="Cidade"
                    dataCep={datacEP?.localidade as string}
                    datafromApi={DataFromApi?.cidade}
                  ></InputString>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputString
                    name="bairro"
                    tipo="Bairro"
                    dataCep={datacEP?.bairro as string}
                    datafromApi={DataFromApi?.bairro}
                  ></InputString>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputString
                    name="estado"
                    tipo="Estado"
                    dataCep={datacEP?.uf as string}
                    datafromApi={DataFromApi?.estado}
                  ></InputString>
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={3}>
                  <InputString
                    name="rua"
                    tipo="Rua"
                    dataCep={datacEP?.logradouro as string}
                    datafromApi={DataFromApi?.rua}
                  ></InputString>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputString
                    name="numero"
                    tipo="Numero"
                    datafromApi={DataFromApi?.numero}
                  ></InputString>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputString
                    name="complemento"
                    tipo="Complemento"
                    datafromApi={DataFromApi?.complemento}
                  ></InputString>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        </div>
        <div className="booton_container">
          <button
            onClick={() => {
              formRef.current?.submitForm();
              setdatacEP(undefined);
            }}
          >
            {DataFromApi ? "Editar" : "Enviar"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalC_Ecompany;
