import axios from "axios";
import { useContext } from "react";
// import { CreateConviteType, EditConviteType } from "../utils/types";
// import { AppContext } from "./context";
// import useAuth from "./hooks/useAuth";

function useApi() {
  //   const { token, saveToken } = useAuth()

  //   const { state } = useContext(AppContext);

  const api = axios.create({
    baseURL: "http://localhost:3000",
  });

  const GetPessoas = async () => {
    try {
      const response = await api.get("pessoas");
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
      const response = await api.post("pessoas/cadastro", { data });
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
      const response = await api.put(`pessoas/${id}`, { data });
      //   const { accessToken } = response.data;
      //   saveToken({ token: accessToken, auth: true })

      return response;
    } catch (error) {
      throw "falha";
    }
  };
  const DeletPessoas = async (id?: any) => {
    try {
      const response = await api.delete(`pessoas/${id}`);
      //   const { accessToken } = response.data;
      //   saveToken({ token: accessToken, auth: true })

      return response;
    } catch (error) {
      throw "falha";
    }
  };

  const GetEmpresas = async () => {
    try {
      const response = await api.get("Empresas");
      //   const { accessToken } = response.data;
      //   saveToken({ token: accessToken, auth: true })

      return response;
    } catch (error) {
      throw "falha";
    }
  };

  const SetEmpresas = async (data?: any) => {
    try {
      const response = await api.post("empresas/cadastro", { data });
      //   const { accessToken } = response.data;
      //   saveToken({ token: accessToken, auth: true })

      return response;
    } catch (error) {
      throw "falha";
    }
  };

  const DeletEmpresas = async (id?: any) => {
    try {
      const response = await api.delete(`empresas/${id}`);
      

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
      const response = await api.put(`empresas/${id}`, {
        data,
      });
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
      const response = await api.get(`Empresas/${id}`);
      //   const { accessToken } = response.data;
      //   saveToken({ token: accessToken, auth: true })

      return response;
    } catch (error) {
      throw "falha";
    }
  };

  //   const signin = async (uid: string) => {

  //     try {
  //       const response = await api.post('auth/signin', { uid })
  //       const { accessToken } = response.data
  //     //   saveToken({ token: accessToken, auth: true })

  //       return response

  //     } catch (error) {

  //       throw 'falha'

  //     }

  //   }

  //   const signup = async (userId: string, phoneNumber: string) => {

  //     try {
  //       const response = await api.post('auth/signup', { userId, phoneNumber })
  //       const { accessToken } = response.data
  //       saveToken({ token: accessToken, auth: true })

  //       return response

  //     } catch (error) {

  //       throw 'falha'

  //     }

  //   }

  //   const getMe = async () => {
  //     try {
  //       const response = await api.get('user/me', { headers: { Authorization: `Bearer ${token}` } })
  //       return response.data

  //     } catch (error) {
  //       throw "error"
  //     }
  //   }

  //   const getTemes = async () => {
  //     try {
  //       const response = await api.get('temes', { headers: { Authorization: `Bearer ${token}` } })
  //       return response.data

  //     } catch (error) {
  //       throw "error"
  //     }
  //   }

  //   const getModels = async () => {
  //     try {
  //       const response = await api.get('models', { headers: { Authorization: `Bearer ${token}` } })
  //       return response.data

  //     } catch (error) {
  //       throw "error"
  //     }
  //   }

  //   const createConvite = async (data: CreateConviteType) => {

  //     try {
  //       const response = await api.post('convite', data, { headers: { Authorization: `Bearer ${token}` } })
  //       console.log(response)
  //       return response

  //     } catch (error) {
  //       throw "error"
  //     }

  //   }

  //   const editConvite = async (data: EditConviteType) => {

  //     try {
  //       const response = await api.patch(`convite/${state.convite?.id}`, data, { headers: { Authorization: `Bearer ${token}` } })
  //       console.log(response)
  //       return response

  //     } catch (error) {
  //       throw "error"
  //     }

  //   }

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
    // signup,
    // createConvite,
    // getTemes,
    // editConvite,
    // getModels
  };
}

export default useApi;
