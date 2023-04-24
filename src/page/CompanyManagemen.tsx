import * as React from "react";

import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/system";
import { useParams } from "react-router-dom";
import DashboardEmpresa from "../componestes/DashboardEmpresa/DashboardEmpresa";
import CargosCompany from "../componestes/CargosCompany";
import { useQuery } from "react-query";
import useApi from "../services/api";
import { useEffect, useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: "common.green",
  bgcolor: green[500],
  "&:hover": {
    bgcolor: green[600],
  },
};

function CompanyManagemen() {
  const { id } = useParams();

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };
  const { GetPessoas, GetEmpresas, DeletEmpresas } = useApi();

  const { data, isLoading, refetch } = useQuery("findeEmpresas", GetEmpresas, {
    staleTime: 1000 * 60 * 60,
    onSuccess: (data) => {
      console.log(data.data?.indexOf(id));
    },
  });

  // console.log(data?.data)

  const [first, setfirst] = useState<any | null>();

  console.log(first);

  useEffect(() => {
    data?.data.forEach((item: any, index: any) => {
      // console.log(item.id);

      if (item.id == id) {
        setfirst(item);
      }
    });
  }, [data]);

  return (
    <div className=" w-full flex flex-col  min-h-full p-2 bg-white relative ">
      <div className=" w-full  h-11 text-[40px] p-3  bg-[#f5f5f5] flex justify-center items-center">
        {first?.data?.NomeFantasia}
      </div>
      <Box
        sx={{
          // bgcolor: "red",
          width: "100%",
          position: "relative",
          minHeight: 500,
        }}
      >
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab label="Dashboard" {...a11yProps(0)} />
            <Tab label="Funcionarios" {...a11yProps(1)} />
            <Tab label="Cargos" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <div className="  w-full min-h-[100%]">
          <TabPanel value={value} index={0} dir={theme.direction}>
            <DashboardEmpresa></DashboardEmpresa>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <CargosCompany></CargosCompany>
          </TabPanel>
        </div>
        {/* {fabs.map((fab, index) => (
          <Zoom
            key={fab.color}
            in={value === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${
                value === index ? transitionDuration.exit : 0
              }ms`,
            }}
            unmountOnExit
          >
            <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
              {fab.icon}
            </Fab>
          </Zoom>
        ))} */}
      </Box>
    </div>
  );
}

export default CompanyManagemen;
