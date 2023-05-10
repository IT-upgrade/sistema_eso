import axios from "axios";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAltentication } from "../redux/sliceAltentication";
// import { CreateConviteType, EditConviteType } from "../utils/types";
// import { AppContext } from "./context";
// import useAuth from "./hooks/useAuth";

function useApi() {
  //   const { token, saveToken } = useAuth()

  //   const { state } = useContext(AppContext);

  const dadosuser = useSelector(userAltentication);
  const token = dadosuser.data.accessToken?.data.access_token;

  // console.log(dadosuser.data.accessToken?.data.access_token)

  const api = axios.create({
    baseURL: "http://localhost:3000",
  });

  const signin = async (email: string, password: string) => {
    try {
      const response = await api.post("login", { email, password });
      const { accessToken } = response.data;
      // saveToken({ token: accessToken, auth: true });

      return response;
    } catch (error) {
      throw "falha";
    }
  };

  // const signup = async (userId: string, phoneNumber: string) => {
  //   try {
  //     const response = await api.post("auth/signup", { userId, phoneNumber });
  //     const { accessToken } = response.data;
  //     saveToken({ token: accessToken, auth: true });

  //     return response;
  //   } catch (error) {
  //     throw "falha";
  //   }
  // };

  // crud pessoas---------------------------------------------------------------------------------------------------------------

  const GetPessoas = async () => {
    try {
      const response = await api.get("pessoas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      //   const { accessToken } = response.data;
      //   saveToken({ token: accessToken, auth: true })

      return response;
    } catch (error) {
      throw "falha";
    }
  };

  const SetPessoas = async (data?: any) => {
    console.log(data);
    try {
      const response = await api.post(
        "pessoas/cadastro",
        { data },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      //   const { accessToken } = response.data;
      //   saveToken({ token: accessToken, auth: true })

      return response;
    } catch (error) {
      throw "falha";
    }
  };
  const EditPessoas = async (data?: any, id?: any) => {
    console.log(data);
    console.log(id);
    try {
      const response = await api.put(
        `pessoas/${id}`,
        { data },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      //   const { accessToken } = response.data;
      //   saveToken({ token: accessToken, auth: true })

      return response;
    } catch (error) {
      throw "falha";
    }
  };
  const DeletPessoas = async (id?: any) => {
    try {
      const response = await api.delete(`pessoas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      //   const { accessToken } = response.data;
      //   saveToken({ token: accessToken, auth: true })

      return response;
    } catch (error) {
      throw "falha";
    }
  };

  // crud empresas---------------------------------------------------------------------------------------------------------------

  const GetEmpresas = async () => {
    try {
      const response = await api.get("empresas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      //   const { accessToken } = response.data;
      //   saveToken({ token: accessToken, auth: true })

      return response;
    } catch (error) {
      throw "falha";
    }
  };

  const SetEmpresas = async (data?: any) => {
    try {
      const response = await api.post(
        "empresas/cadastro",
        { data },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      //   const { accessToken } = response.data;
      //   saveToken({ token: accessToken, auth: true })

      return response;
    } catch (error) {
      throw "falha";
    }
  };

  const DeletEmpresas = async (id?: any) => {
    try {
      const response = await api.delete(`empresas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response;
    } catch (error) {
      throw "falha";
    }
  };

  interface EditEmpresasType {
    data?: any;
    id?: any;
  }

  const EditEmpresas = async (data?: any, id?: any) => {
    console.log(data);
    console.log(id);

    try {
      const response = await api.put(
        `empresas/${id}`,
        {
          data,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      //   const { accessToken } = response.data;
      //   saveToken({ token: accessToken, auth: true })

      return response;
    } catch (error) {
      throw "falha";
    }
  };

  const GetEmpresaById = async (id?: any) => {
    console.log(id);

    try {
      const response = await api.get(`empresas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      //   const { accessToken } = response.data;
      //   saveToken({ token: accessToken, auth: true })

      return response;
    } catch (error) {
      throw "falha";
    }
  };

  // cruds de cargos------------------------------------------------------------

  const SetCargo = async (data?: any) => {
    try {
      const response = await api.post(
        "cargos/cadastro",
        { data },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      //   const { accessToken } = response.data;
      //   saveToken({ token: accessToken, auth: true })

      return response;
    } catch (error) {
      throw "falha";
    }
  };

  return {
    GetPessoas,
    SetPessoas,
    GetEmpresas,
    SetEmpresas,
    DeletPessoas,
    DeletEmpresas,
    EditEmpresas,
    GetEmpresaById,
    EditPessoas,
    signin,
    SetCargo
    // signup,
    // createConvite,
    // getTemes,
    // editConvite,
    // getModels
  };
}

export default useApi;
