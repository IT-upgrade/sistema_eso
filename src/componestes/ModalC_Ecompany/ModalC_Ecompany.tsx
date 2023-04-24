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
  DataFromApi?: empresas | null;
  openFromEdit: boolean;
}

function ModalC_Ecompany({
  openFromEdit,
  open,
  setOpen,
  setLouder,
  DataFromApi,
}: ModalC_EcompanyProp) {
  const { SetPessoas, SetEmpresas } = useApi();
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

  console.log(DataFromApi);

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
  const [datacEP, setdatacEP] = useState<typeCepAPI>();

  const handleFormNormal = async (Data: empresas) => {
    console.log(Data);

    let {cargo} = Data

    cargo = []

    let texte = {...Data, cargo}

    console.log(texte)

    try {
      formRef.current.setErrors({});

      //Validando Data, se invalida irá pro catch
      await schemaFormCreateEmpresa.validate(texte, {
        abortEarly: false,
      });

      
      mutate(texte);
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

  const handleFormEdit = async (Data: pessoas) => {
    console.log(Data);
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
      }}
      classNames={{
        overlay: "customOverlay",
        modal: "customModal",
      }}
    >
      <div className="container">
        <div className="header_container">
          <UserPlus size={32} color="black" weight="fill" />
        </div>

        <div className=" w-full bg-black">
          <Form
            ref={formRef}
            onSubmit={!openFromEdit ? handleFormNormal : handleFormEdit}
            autoComplete="off"
          >
            <Grid container padding={1} spacing={2}>
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputString
                    name="NomeFantasia"
                    tipo="NOME"
                    datafromApi={DataFromApi?.NomeFantasia}
                  ></InputString>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputString
                    name="rasãoSocial"
                    tipo="Rasão Social "
                    datafromApi={DataFromApi?.rasãoSocial}
                  ></InputString>
                </Grid>
                {/* <Grid item xs={12} sm={3}>
                  <InputDataTime name="data"></InputDataTime>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputAutocomplete
                    name={"genero"}
                    inputLabel={" Sexo / Gênero"}
                    options={optionsGeneri}
                  ></InputAutocomplete>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputAutocomplete
                    name={"tipoDocumento"}
                    inputLabel={"Tipo do Documento"}
                    options={optionscompany}
                  ></InputAutocomplete>
                </Grid> */}
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={3}>
                  <InputAutocomplete
                    name={"tipoDocumento"}
                    inputLabel={"Tipo do Documento"}
                    options={optionscompany}
                  ></InputAutocomplete>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputNumber
                    name="CNPJ"
                    tipo="CNPJ"
                    datafromApi={DataFromApi?.CNPJ}
                  ></InputNumber>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <InputAutocomplete
                    name={"Estabelecimento"}
                    inputLabel={"Estabelecimento"}
                    options={optionsEstabelecimento}
                  ></InputAutocomplete>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputString
                    name="grauRisco"
                    tipo="Grau de Risco"
                    datafromApi={DataFromApi?.grauRisco}
                  ></InputString>
                </Grid>

                {/* <Grid item xs={12} sm={3}>
                  <InputNumber
                    name="documentoCpf"
                    tipo="CPF"
                    datafromApi={DataFromApi?.documentoCpf}
                  ></InputNumber>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputNumber
                    name="documentoRg"
                    tipo="RG"
                    datafromApi={DataFromApi?.documentoRg}
                  ></InputNumber>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputNumber
                    name="TEL_PRINCIPAL"
                    tipo="Telefone"
                    datafromApi={DataFromApi?.TEL_PRINCIPAL}
                  ></InputNumber>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputNumber
                    name="TEL_SECUNDARIO"
                    tipo="Telefone secundário"
                    datafromApi={DataFromApi?.TEL_SECUNDARIO}
                  ></InputNumber>
                </Grid> */}
              </Grid>
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={3}>
                  <InputString
                    name="EMAIL_PRINCIPAL"
                    tipo="E-mail"
                    datafromApi={DataFromApi?.EMAIL_PRINCIPAL}
                  ></InputString>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputString
                    name="EMAIL_SECUNDARIO"
                    tipo="E-mail secundario"
                    datafromApi={DataFromApi?.EMAIL_SECUNDARIO}
                  ></InputString>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <InputNumber
                    name="TEL_PRINCIPAL"
                    tipo="Telefone"
                    datafromApi={DataFromApi?.TEL_PRINCIPAL}
                  ></InputNumber>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputNumber
                    name="TEL_SECUNDARIO"
                    tipo="Telefone secundário"
                    datafromApi={DataFromApi?.TEL_SECUNDARIO}
                  ></InputNumber>
                </Grid>
              </Grid>
            </Grid>

            <div className="titeAddress">
              <MapPinLine size={32} color="black" weight="fill" />
            </div>

            <Grid container padding={1} spacing={2}>
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={3}>
                  <InputCep
                    name="CEP"
                    tipo="Cep"
                    setStateCep={setdatacEP}
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
                    name="RUA"
                    tipo="Rua"
                    dataCep={datacEP?.logradouro as string}
                    datafromApi={DataFromApi?.RUA}
                  ></InputString>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputString
                    name="NUMERO"
                    tipo="Numero"
                    datafromApi={DataFromApi?.NUMERO}
                  ></InputString>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputString
                    name="COMPLEMENTO"
                    tipo="Complemento"
                    datafromApi={DataFromApi?.COMPLEMENTO}
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
            {!openFromEdit ? "Enviar" : "Editar"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalC_Ecompany;
