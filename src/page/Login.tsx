import React, { MutableRefObject, useEffect, useRef } from "react";

import img from "../assets/logo_ams_branca.png";
import imgBack from "../assets/img-bg-02-min_to_login.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { schemaForLogin } from "../utils/schemas";
import { useMutation } from "react-query";
import { erros, SendLogin } from "../utils/types";
import { useDispatch, useSelector } from "react-redux";
import {
  sucess_altentication,
  userAltentication,
} from "../redux/sliceAltentication";
// import { Input } from "@mui/material";
import Input from "../../src/componestes/inputs/SinpouInput";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import InputString from "../componestes/inputs/InputString";

import useApi from "../services/api";

function Login() {
  const { signin } = useApi();
  const dispath = useDispatch();
  const formRef = useRef() as MutableRefObject<FormHandles>;
  const sizeScreen = useMediaQuery("(min-width:599px)");

  // console.log(sizeScreen);

  const dataAltentication = useSelector(userAltentication);

  // console.log(dataAltentication.isLogged);

  // const fakeFunctiontoLogin = async (data: SendLogin) => {
  //   try {
  //     const email = data.email;
  //     const password = data.password;

  //     const jwt = await `dsjknsdshb${email}kl452751${senha}`;

  //     return jwt;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const { mutate: mutateLogin } = useMutation(
    (data: SendLogin) => signin(data.email, data.password),
    {
      onSuccess: (sus) => {
        dispath(
          sucess_altentication({
            accessToken: sus as unknown as string,
          })
        );
      },
      onError: (err) => alert("emai ou senha incorreto"),
    }
  );

  const handleFormSubmit = async (data: SendLogin) => {
    console.log(data);
    const email = data.email;
    const password = data.password;

    try {
      await schemaForLogin.validate(data, {
        abortEarly: false,
      });

      mutateLogin({ email, password });
    } catch (err) {
      let validationErrors: erros = {};

      if (err instanceof yup.ValidationError) {
        console.log(err);
        err.inner.forEach((error) => {
          let path = error.path as string;
          validationErrors[path] = error.message;
          console.log(path);
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    dataAltentication.isLogged ? navigate("/") : null;

    console.log(dataAltentication.isLogged);
  }, [dataAltentication.isLogged]);

  return (
    <div
      className=" w-full h-[100vh]  flex items-center justify-center flex-col md:flex-row md:bg-[#FFF3F3] bg-[black]  "
      style={{
        backgroundImage: `${
          sizeScreen == false ? `url(${imgBack})` : `url(${imgBack})`
        }`,
      }}
    >
      {sizeScreen == false ? (
        <span className=" w-[90%] h-[100px] mb-[100px] mt-7  rounded-lg max-w-[300px]  flex justify-center items-center text-[50px] text-[#201e1e]">
          <div className="w-[90%] h-[400px]  rounded-lg max-w-[300px]  flex items-center justify-center  ml-4">
            <img src={img}></img>
          </div>
        </span>
      ) : null}

      <div
        className="  w-full max-w-[700px]  h-[500px] md:bg-[black] flex justify-center items-center flex-row rounded-lg"
        style={{
          backgroundImage: `${
            sizeScreen == false ? `url(${imgBack})` : `url(${imgBack})`
          }`,
        }}
      >
        <Form ref={formRef} onSubmit={handleFormSubmit}>
          <div className=" w-[90%] h-[400px]  rounded-lg max-w-[300px] bg-[#201e1e] flex flex-col items-center ">
            <span>
              <h1 className="text-[50px] text-[#FFF3F3]">Login</h1>
            </span>

            <div className=" w-full flex flex-col justify-center items-center h-[180px] p-2 ">
              <InputString name="email" tipo=" E-mail:"></InputString>

              <InputString name="password" tipo="password"></InputString>
            </div>

            <button
              className=" w-[90%] rounded-lg h-10 mt-5 bg-[#7ab440] flex justify-center items-center hover:cursor-pointer"
              type="submit"
            >
              Entrar
            </button>
          </div>
        </Form>

        {sizeScreen == false ? null : (
          <div className="w-[90%] h-[400px]  rounded-lg max-w-[300px]  flex items-center justify-center  ml-4">
            <img src={img}></img>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
