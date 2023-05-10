import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Agendamentos from "./page/Agendamentos";
import Atendimento from "./page/Atendimento";
import Pessoas from "./page/pessoas/Pessoas";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
// import { persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import Login from "./page/Login";
import PrivateRoute from "./router/PrivateRoute";
import Empresas from "./page/Empresas/Empresas";
import CompanyManagemen from "./page/CompanyManagemen";
import Riscos from "./page/Riscos/Riscos";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              {/* <Route path="/" element={<Apresentacao />} /> */}

              <Route path="/login" element={<Login />} />
              {/* <Route path="home" element={<PrivateRoute rout={<App />} />}> */}

              <Route path="/" element={<PrivateRoute route={<App />} />}>
                <Route index element={<Home></Home>} />
                <Route path="Agendamentos" element={<Agendamentos />} />
                <Route path="Atendimentos" element={<Atendimento />} />
                <Route path="Pessoas" element={<Pessoas />} />
                <Route path="Riscos" element={<Riscos />} />
                <Route path="Empresas" element={<Empresas />} />
                <Route
                  path="Empresas/empresa/:id"
                  element={<CompanyManagemen />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
