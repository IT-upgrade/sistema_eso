import { FormHandles } from "@unform/core";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import "./Eperson.css";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { MapPinLine, UserPlus } from "@phosphor-icons/react";
import { Form } from "@unform/web";
import { Grid } from "@mui/material";
import InputString from "../inputs/InputString";
import InputDataTime from "../inputs/InputDataTime/InputDataTime";
import InputAutocomplete from "../inputs/InputAutocomplete";
import { optionsGeneri, optionsPerson } from "../../utils/objsImputs";
import InputNumber from "../inputs/InputNumber";
import InputCep from "../inputs/InputCep";
import * as yup from "yup";
import useApi from "../../services/api";

import { schemaFormCreateConvite } from "../../utils/schemas";
import { pessoas } from "../../utils/types";
import { useMutation, useQueryClient } from "react-query";

interface ModalC_EpersonProp {
  open: boolean;
  setOpen: (type: boolean) => void;
  setLouder: (type: boolean) => void;
  DataFromApi?: any | null;
  openFromEdit?: boolean | null;
}

function ModalC_Eperson({
  openFromEdit,
  open,
  setOpen,
  setLouder,
  DataFromApi,
}: ModalC_EpersonProp) {
  const { SetPessoas, EditPessoas } = useApi();
  const queryClient = useQueryClient();
  const formRef = useRef(null) as unknown as MutableRefObject<FormHandles>;

  console.log(DataFromApi);

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

  const { mutate } = useMutation(SetPessoas, {
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
  const mutateEdit = useMutation(
    (items) => EditPessoas(items, DataFromApi.id),
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

  const handleFormNormal = async (Data: pessoas) => {
    console.log(Data);

    try {
      formRef.current.setErrors({});

      //Validando Data, se invalida irá pro catch
      await schemaFormCreateConvite.validate(Data, {
        abortEarly: false,
      });
      mutate(Data);
    } catch (err) {
      console.log(err);
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

  const handleFormEdit = async (Data: any) => {
    console.log(Data);
    console.log("function to edit");

    try {
      formRef.current.setErrors({});

      //Validando Data, se invalida irá pro catch
      await schemaFormCreateConvite.validate(Data, {
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
          Informações
          <UserPlus size={32} color="white" weight="fill" />
        </div>

        <div className=" w-full bg-black">
          <Form
            ref={formRef}
            // onSubmit={!openFromEdit ? handleFormNormal : handleFormEdit}
            onSubmit={DataFromApi ? handleFormEdit : handleFormNormal}
            autoComplete="off"
          >
            <Grid container padding={1} spacing={2}>
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={3}>
                  <InputString
                    name="nome"
                    tipo="Nome Completo"
                    datafromApi={DataFromApi?.nome}
                  ></InputString>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputDataTime
                    name="nascimento"
                    datafromApi={DataFromApi?.nascimento}
                  ></InputDataTime> 
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputAutocomplete
                    name={"genero"}
                    inputLabel={" Sexo / Gênero"}
                    options={optionsGeneri}
                    datafromApi={DataFromApi?.genero}
                  ></InputAutocomplete>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputAutocomplete
                    name={"tipo_doc"}
                    inputLabel={"Tipo do Documento"}
                    options={optionsPerson}
                  ></InputAutocomplete>
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={3}>
                  <InputNumber
                    name="numero_doc"
                    tipo="CPF"
                    datafromApi={DataFromApi?.numero_doc}
                  ></InputNumber>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputString
                    name="rg_emissor"
                    tipo="RG Emissor"
                    datafromApi={DataFromApi?.rg_emissor}
                  ></InputString>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputNumber
                    name="rg"
                    tipo="RG"
                    datafromApi={DataFromApi?.rg}
                  ></InputNumber>
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
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputString
                    name="email"
                    tipo="E-mail"
                    datafromApi={DataFromApi?.email}
                  ></InputString>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputString
                    name="email_sec"
                    tipo="E-mail secundario"
                    datafromApi={DataFromApi?.email_sec}
                  ></InputString>
                </Grid>
              </Grid>
            </Grid>

            <div className="titeAddress_person">
              Localização
              <MapPinLine size={32} color="white" weight="fill" />
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
        <div className="booton_container_person">
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

export default ModalC_Eperson;
