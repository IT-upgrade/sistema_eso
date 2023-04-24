// import Button from "@mui/material/Button";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import img from "../../assets/lounge-medical-text.png";

import "react-responsive-modal/styles.css";

import "./Pessoas.css";

import { useEffect, useRef, useState } from "react";

import { AddressBook, ListBullets, Option, User } from "@phosphor-icons/react";

import ModalC_Eperson from "../../componestes/ModalC_Eperson/ModalC_Eperson";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useApi from "../../services/api";

import { pessoas, pessoasLintResponsApi } from "../../utils/types";
import { Grid } from "react-loader-spinner";
import Edit_item from "../../componestes/Edit_item";
import Delete_item from "../../componestes/Delete_item";

function Pessoas() {
  const { GetPessoas, DeletPessoas } = useApi();
  const queryClient = useQueryClient();

  const [pessoas, setPessoas] = useState<pessoasLintResponsApi[]>();
  const [loader, setloader] = useState<boolean>(false);

  const { data, isLoading, refetch } = useQuery("pessoas", GetPessoas, {
    staleTime: 1000 * 60 * 60,
    onSuccess: (data) => {
      console.log(data);
      setPessoas(data.data);
    },
  });

  const [open, setOpen] = useState(false);
  const [openFromEdit, setopenFromEdit] = useState(false);
  const [openToEdit, setopenToEdit] = useState<pessoas>();

  function ativarModalparaeditar(data: any) {
    console.log(data);
    setopenToEdit(data);
    setOpen(true);
    setopenFromEdit(true);
  }

  const { mutate } = useMutation(DeletPessoas, {
    onSuccess: () => {
      queryClient.invalidateQueries("pessoas");
      queryClient.resetQueries();
      // setLouder(true);
      // setOpen(false);
    },
    onError: () => {
      prompt("Não foi possivel criar seu convite, tente mais tarde.", "danger");
    },
  });

  function Delet(id: string) {
    console.log("delet");

    console.log(id);
    setloader(true)

    try {
      mutate(id);
    } catch (err) {
      console.log(err);
      let validationErrors: any = {};

      // if (err instanceof yup.ValidationError) {
      //   err.inner.forEach((error) => {
      //     console.log(error);
      //     let path = error.path as string;
      //     validationErrors[path] = error.message;
      //   });

      //   formRef.current.setErrors(validationErrors);
      // }
    }
  }

  useEffect(() => {
    if (loader) {
      setloader(false);
    }
  }, [pessoas]);

  return (
    <div className=" w-full flex flex-col  min-h-full p-2 bg-white relative ">
      {/* header com botão de adicionar e campos de pesquisa*/}
      <div className=" w-full  h-10">
        <div className=" w-full  flex items-center ">
          <Button
            variant="contained"
            className=" w-full max-w-[400px]  bg-[#42493A] hover:bg-[#7c8b6b]"
            onClick={() => {
              setOpen(true);
              setopenToEdit(undefined);
            }}
          >
            Adicionar nova Pessoa
          </Button>
        </div>
        <div></div>
      </div>

      {loader ? (
        <div className=" w-full h-full bg-[#f4f7f6] absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center ">
          <Grid
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={loader}
          />
        </div>
      ) : null}

      {/* modal para adicionar pessoas */}
      <ModalC_Eperson
        open={open}
        setOpen={setOpen}
        setLouder={setloader}
        DataFromApi={openToEdit}
        openFromEdit={openFromEdit}
      ></ModalC_Eperson>

      {/* lista de pessoas adicionadas */}
      <div className=" w-full  h-full mt-5">
        <TableContainer component={Paper}>
          <Table>
            {/* cabeçario da lista de pessoas */}
            <TableHead>
              <TableRow>
                <TableCell>
                  <div className=" w-full flex items-center ">
                    <span className=" mr-2 text-base">Nome</span>
                    <User size={23} weight="bold" color="#1fc44b" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className=" w-full flex items-center ">
                    <span className=" mr-2 text-base">Contato</span>
                    <AddressBook size={25} weight="bold" color="#1fc44b" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className=" w-full flex items-center ">
                    <span className=" mr-2 text-base">Opções</span>
                    <Option size={25} weight="bold" color="#1fc44b" />
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data
                ? data?.data?.map((item: any, index: any) => (
                    <TableRow key={index} className=" hover:bg-[#1fc44b7e]">
                      <TableCell>{item.nome}</TableCell>
                      <TableCell>
                        <div>
                          <span className=" text-[15px] mr-2">Telefone:</span>
                          {item.TEL_PRINCIPAL}
                        </div>
                        <div>
                          <span className=" text-[15px] text-ellipsis mr-2">
                            Email:
                          </span>
                          {item.EMAIL_PRINCIPAL}
                        </div>
                      </TableCell>
                      <TableCell className="  flex items-center border-none">
                        <Edit_item
                          data={item}
                          functionActivateModal={ativarModalparaeditar}
                        ></Edit_item>
                        <Delete_item
                          ide={item.id as string}
                          functionDelet={Delet}
                        ></Delete_item>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>

        {(data?.data?.length as unknown as number) <= 0 || !data ? (
          <div className=" w-full flex flex-col items-center justify-center  h-[300px] mt-[100px]  rounded-sm ">
            <span>
              <img src={img} alt="" className=" min-h-full" />
            </span>
            <span className=" md:text-[20px] text-[10px] mt-5  text-[#42493A]">
              Adicione pessoas para conseguir ver a lista das mesmas!
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Pessoas;
